import { Request, Response } from "express";
import { ApiError } from "../utility/ApiError";
import { asyncHandler } from "../utility/asyncHandler";
import ApiResponse from "../utility/ApiResponse";
import { processWithGemini, summarizeAgreementWithGemini, translateText } from "../services/geminiApi.services";
import admin, { db } from "../db/firebase";
import { AgreementHistory, ProcessHistory } from "../models/history.models";
import { createAuditLog } from "./admin.controller";
import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';

const agreementSummary = asyncHandler(async (req: Request, res: Response) => {
    const { uid, language, targetGroup } = req.body;

    if (!uid || !targetGroup) {
        await createAuditLog({
            uid: uid || 'unknown',
            action: 'AGREEMENT_SUMMARY',
            status: 'failure',
            entityType: 'Agreement',
            details: 'Missing uid, file, or targetGroup',
        });
        throw new ApiError(400, 'uid, file, and targetGroup are required');
    }

    const file = (req.files && (req.files as any)['file'] && (req.files as any)['file'][0]) || null;

    if (!file) {
        throw new ApiError(400, 'File is required');
    }

    // file.path is the path to the file saved by multer
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path), file.originalname);

    const agreementText = await axios.post('http://127.0.0.1:5000/uploads', formData, {
        headers: {
            ...formData.getHeaders(),
        },
    });

    if (!agreementText || !agreementText.data) {
        await createAuditLog({
            uid: uid || 'unknown',
            action: 'AGREEMENT_SUMMARY',
            status: 'failure',
            entityType: 'Agreement',
            details: 'Failed to retrieve agreement text',
        });
        throw new ApiError(500, 'Failed to retrieve agreement text from ai model');
    }

    // Optimized prompt templates for each target group
    let prompt = '';
    switch (targetGroup) {
        case 'citizen':
            prompt = `
                You are a legal simplifier for everyday citizens.
                Always return ONLY valid JSON that strictly matches this schema:

                {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "AgreementAnalysis",
                "type": "object",
                "properties": {
                    "about": {
                    "type": "string",
                    "minLength": 10
                    },
                    "benefits": {
                    "type": "array",
                    "items": { "type": "string", "minLength": 5 },
                    "minItems": 3
                    },
                    "risks": {
                    "type": "array",
                    "items": { "type": "string", "minLength": 5 },
                    "minItems": 3
                    },
                    "clarity": {
                    "type": "object",
                    "properties": {
                        "score": { "type": "integer", "minimum": 1, "maximum": 10 },
                        "comment": { "type": "string", "minLength": 5 }
                    },
                    "required": ["score", "comment"]
                    },
                    "fairness": {
                    "type": "object",
                    "properties": {
                        "score": { "type": "integer", "minimum": 1, "maximum": 10 },
                        "comment": { "type": "string", "minLength": 5 }
                    },
                    "required": ["score", "comment"]
                    },
                    "repaymentDetails": {
                    "type": "object",
                    "properties": {
                        "emiAmount": { "type": "string", "pattern": "^[₹]?[0-9,]+(\\.[0-9]{1,2})?$" },
                        "totalRepayment": { "type": "string", "pattern": "^[₹]?[0-9,]+(\\.[0-9]{1,2})?$" },
                        "interestExtra": { "type": "string", "pattern": "^[₹]?[0-9,]+(\\.[0-9]{1,2})?$" },
                        "note": { "type": "string" }
                    },
                    "required": ["emiAmount", "totalRepayment", "interestExtra"]
                    },
                    "suggestions": {
                    "type": "array",
                    "items": { "type": "string", "minLength": 5 },
                    "minItems": 1
                    },
                    "analogy": {
                    "type": "string",
                    "minLength": 5
                    }
                },
                "required": [
                    "about",
                    "benefits",
                    "risks",
                    "clarity",
                    "fairness",
                    "suggestions",
                    "analogy"
                ],
                "additionalProperties": false
                }

                Guidelines:
                - Use clear, simple language.
                - If repayment details are not relevant, return an object with all fields set to "N/A".
                - Always provide at least 3 benefits and 3 risks.
                - Do not include any text outside of JSON.
                - If repayment details can be calculated, always provide all three fields (emiAmount, totalRepayment, interestExtra).
                - Keep numeric fields clean (no words like 'approx') and move explanations into 'note'.
                - Fairness score must include a 1-sentence justification.

                Agreement Text:
                ${agreementText}
            `;
            break;
        case 'business_owner':
            prompt = `
                You are a professional legal compliance assistant for small business owners. 
                The user will provide a Memorandum of Association (MoA), vendor contract, or compliance document.

                Always return ONLY valid JSON strictly following this schema:

                {
                "about": "string (short summary of what this document/contract is about)",
                "clauses": [
                    {
                    "title": "string (clause heading or generated short title)",
                    "explanation": "string (business-friendly explanation of what this clause means in practice)",
                    "risk": "string (compliance, legal, or operational risk, e.g., conflicts with Companies Act, unclear payment terms)",
                    "improvement": "string (actionable recommendation, additional clause, or negotiation tip)"
                    }
                ],
                "financials": {
                    "totalFee": "string (if applicable, otherwise 'N/A')",
                    "paymentMilestones": ["string (if applicable, otherwise 'N/A')"],
                    "lateFee": "string (if applicable, otherwise 'N/A')"
                },
                "keyComplianceNotes": [
                    "array of strings — references to Indian laws, regulations, or compliance frameworks relevant to the document"
                ],
                "finalAssessment": {
                    "overallRisk": "Low | Medium | High",
                    "comment": "string (1-2 sentence summary highlighting critical risks and suggested focus areas for a business founder)"
                }
                }

                Guidelines:
                - Include at least 10 clauses; combine or summarize clauses if needed.
                - Provide actionable improvements for each clause, including risk mitigation, scope definition, deliverables, and security if relevant.
                - Use Indian legal and business context (Companies Act, LLP Act, GST, IT Act, DPDP Act, Arbitration & Conciliation Act, FSSAI, RTE, etc.).
                - Keep explanations professional, concise, and business-friendly.
                - If no financial terms exist, set all financial fields to 'N/A'.
                - Do not include any text outside the JSON structure.

                Business Type: General
                Agreement Text:
                ${agreementText}
            `;
            break;
        case 'student':
            prompt = `
                You are a professional legal compliance assistant for students and young professionals. 
                The user is sharing an internship, freelance, employment, or educational agreement. Optionally, the user may specify the type of agreement or role for tailored guidance (e.g., 'internship in software', 'freelance design', 'campus placement').

                Always return ONLY valid JSON that strictly follows this schema:

                {
                "about": "Short summary of the document in student-friendly terms",
                "clauses": [
                    {
                    "title": "Clause title",
                    "explanation": "Simple explanation of what it means",
                    "example": "Relatable analogy or scenario",
                    "questionsToAsk": ["Question 1", "Question 2"]
                    }
                ],
                "keyLegalNotes": ["References to Indian law if relevant"],
                "finalTips": ["Actionable tips for students or young professionals"]
                }

                Guidelines:
                - Include at least 8–10 clauses, summarizing or combining if necessary.
                - Focus on actionable guidance around stipend/compensation, intellectual property rights, scope of work, confidentiality, and exit/termination clauses.
                - Use Indian legal context wherever possible (e.g., Shops & Establishments Act, IT Act, Copyright Act, Industrial Disputes Act, labor laws).
                - Keep explanations clear, supportive, and professional—like a mentor explaining rights and responsibilities.
                - Include relatable examples or analogies to help understanding.
                - Suggest relevant questions students or professionals should ask before signing.
                - Do not include any text outside of JSON.
                - If no financial terms exist, indicate 'N/A'.

                Agreement Text:
                ${agreementText}
            `;
            break;
        default:
            throw new ApiError(400, 'Invalid targetGroup');
    }

    try {
        // Pass the custom prompt to Gemini
        const geminiResponse = await summarizeAgreementWithGemini(prompt);

        if (!geminiResponse) {
            await createAuditLog({
                uid,
                action: 'AGREEMENT_SUMMARY',
                status: 'failure',
                entityType: 'Agreement',
                details: 'Failed to summarize agreement with Gemini',
            });
            throw new ApiError(500, 'Failed to summarize agreement with Gemini');
        }

        // console.log("AI-generated summary response:", geminiResponse);

        // Treat Gemini output as unstructured text (summary)
        let summary = typeof geminiResponse === 'string' ? geminiResponse : JSON.stringify(geminiResponse, null, 2);

        // Translate the summary if needed
        if (language && language !== 'en') {
            try {
                summary = await translateText(summary, language);
            } catch (translationError: any) {
                await createAuditLog({
                    uid,
                    action: 'AGREEMENT_SUMMARY',
                    status: 'failure',
                    entityType: 'Agreement',
                    details: `Translation failed: ${translationError.message}`,
                });
            }
        }
        
        await createAuditLog({
            uid,
            action: 'AGREEMENT_SUMMARY',
            status: 'success',
            entityType: 'Agreement',
            details: `Agreement summarized for targetGroup: ${targetGroup}, language: ${language || 'en'}`,
        });

        return res.status(200).json(
            new ApiResponse(200, geminiResponse, 'Agreement summarized successfully')
        );

    } catch (error: any) {
        await createAuditLog({
            uid,
            action: 'AGREEMENT_SUMMARY',
            status: 'failure',
            entityType: 'Agreement',
            details: error.message || 'Unknown error',
        });
        throw error;
    }
});

// agreemental process
const processAgreement = asyncHandler(async (req: Request, res: Response) => {
    const { uid, processType, language } = req.body;

    if (!uid || !processType) {
        await createAuditLog({
            uid,
            action: 'PROCESS_AGREEMENT',
            status: 'failure',
            entityType: 'Agreement',
            details: 'Missing uid or processType',
        });
        throw new ApiError(400, 'uid and processType are required');
    }

    try {
        const geminiResponse = await processWithGemini(processType);

        if (!geminiResponse) {
            await createAuditLog({
                uid,
                action: 'PROCESS_AGREEMENT',
                status: 'failure',
                entityType: 'Agreement',
                details: 'Failed to process agreement with Gemini',
            });
            throw new ApiError(500, 'Failed to process agreement with Gemini');
        }

        // // Prepare process history object
        // const docRef = db.collection('processHistory').doc();
        // const processHistory: ProcessHistory = {
        //     id: docRef.id,
        //     uid,
        //     processType,
        //     processedAt: admin.firestore.Timestamp.now(),
        //     processSteps: geminiResponse.processSteps,
        //     requiredDocuments: geminiResponse.requiredDocuments,
        //     creationLinks: geminiResponse.creationLinks,
        //     priceInfo: geminiResponse.priceInfo,
        //     needExpert: geminiResponse.needExpert,
        //     aiRawOutput: geminiResponse,
        //     language: language || 'en',
        // };
        // await docRef.set(processHistory);

        // Audit log (success)
        await createAuditLog({
            uid,
            action: 'PROCESS_AGREEMENT',
            status: 'success',
            entityType: 'Agreement',
            details: `Process run for type: ${processType}`,
        });

        return res.status(200).json(
            new ApiResponse(200, geminiResponse, 'Agreement processed successfully')
        );
    } catch (error: any) {
        await createAuditLog({
            uid,
            action: 'PROCESS_AGREEMENT',
            status: 'failure',
            entityType: 'Agreement',
            details: error.message || 'Unknown error',
        });
        throw error;
    }
});

// Translate any text to a target language using Google Translate API
const translateTextController = asyncHandler(async (req: Request, res: Response) => {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) {
        throw new ApiError(400, 'text and targetLanguage are required');
    }
    try {
        const translated = await translateText(text, targetLanguage);
        return res.status(200).json(
            new ApiResponse(200, { translated }, 'Text translated successfully')
        );
    } catch (error: any) {
        throw new ApiError(500, error.message || 'Translation failed');
    }
});

const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    // Multer's req.files is { [fieldname: string]: File[] }
    const file = (req.files && (req.files as any)['file'] && (req.files as any)['file'][0]) || null;

    if (!file) {
        throw new ApiError(400, 'File is required');
    }

    // file.path is the path to the file saved by multer
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path), file.originalname);

    try {
        const response = await axios.post('http://127.0.0.1:5000/uploads', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        return res.status(200).json(new ApiResponse(200, response.data, 'File uploaded successfully'));
    } catch (error) {
        throw new ApiError(500, 'File upload failed');
    }
});


export { agreementSummary, processAgreement, translateTextController, uploadFile };