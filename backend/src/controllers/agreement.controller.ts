import { Request, Response } from "express";
import { ApiError } from "../utility/ApiError";
import { asyncHandler } from "../utility/asyncHandler";
import ApiResponse from "../utility/ApiResponse";
import { processWithGemini, summarizeAgreementWithGemini, translateText } from "../services/geminiApi.services";
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

    // local testing
    const modelResponse = await axios.post(`${process.env.AI_MODEL_URL}/uploads`, formData, {
        headers: {
            ...formData.getHeaders(),
        },
    });

    // const modelResponse = await axios.post(`${process.env.AI_MODEL_URL}/uploads`, formData, {
    //     headers: {
    //         ...formData.getHeaders(),
    //     },
    // });

    let agreementText = modelResponse.data.extracted_text.replace(/\\n/g, '\n');

    // console.log("Agreement text extracted ", agreementText);

    if (!agreementText) {
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
                    "title": {
                        "type": "string",
                        "minLength": 5
                    },
                    "about": {
                        "type": "string",
                        "minLength": 30
                    },
                    "benefits": {
                        "type": "array",
                        "items": { "type": "string", "minLength": 5 },
                        "minItems": 0
                    },
                    "risks": {
                        "type": "array",
                        "items": { "type": "string", "minLength": 5 },
                        "minItems": 0
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
                        "minItems": 0
                    },
                    "analogy": {
                        "type": "string",
                        "minLength": 5
                    }
                },
                "required": [
                    "title",
                    "about",
                    "benefits",
                    "risks",
                    "clarity",
                    "fairness",
                    "analogy"
                ],
                "additionalProperties": false
                }

                Guidelines:
                - "title" should be a short headline (e.g., "Employment Agreement Summary").
                - "about" must be a longer explanation in simple language.
                - If there are NO genuine benefits or risks, return an empty array [] for that field.
                - If repayment details are not relevant, return an object with all fields set to "N/A".
                - Include "suggestions" ONLY if there are meaningful improvements. If not, return an empty array [] for that field.
                - Never invent legal points: base all analysis only on the agreement text provided.
                - Fairness score must include a 1-sentence justification.
                - Do not include any text outside of JSON.
                - Prices must be given in Indian Rupees (₹), with approximate ranges.

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
                "title": "string (short, professional document title e.g., 'Vendor Service Agreement – IT Support')",
                "about": "string (short summary of what this document/contract is about)",
                "clauses": [
                    {
                    "title": "string (clause heading or generated short title)",
                    "explanation": "string (business-friendly explanation of what this clause means in practice)",
                    "risk": "string (compliance, legal, or operational risk — if none, return 'N/A')",
                    "improvement": "string (actionable recommendation or negotiation tip — if none, return 'N/A')"
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
                    "overallScore": "integer (1–10 scale, 1 = very high risk, 10 = very safe)",
                    "comment": "string (2–3 sentences summary highlighting critical risks and protections)",
                    "recommendations": ["array of practical, prioritized recommendations for the business owner"]
                }
                }

                Guidelines:
                - Only include as many clauses as actually exist; do not invent extras.
                - If a clause has no specific risk, set "risk": "N/A".
                - If no improvement is needed, set "improvement": "N/A".
                - Keep explanations concise but clear for a business founder.
                - Use Indian legal and business context (Companies Act, LLP Act, GST, IT Act, DPDP Act, Arbitration & Conciliation Act, FSSAI, RTE, etc.).
                - If no financial terms exist, set all financial fields to "N/A".
                - In "finalAssessment", provide both a numeric score (1–10) and recommendations.
                - Do not include any text outside the JSON structure.
                - Prices must be given in Indian Rupees (₹), with approximate ranges.

                Business Type: General
                Agreement Text:
                ${agreementText}
            `;
            break

        case 'student':
            prompt = `
                You are a professional legal compliance assistant for students and young professionals. 
                The user is sharing an internship, freelance, employment, or educational agreement. Optionally, the user may specify the type of agreement or role for tailored guidance (e.g., 'internship in software', 'freelance design', 'campus placement').

                Always return ONLY valid JSON strictly following this schema:

                {
                "title": "string (short, professional title e.g., 'Internship Agreement – Software Development')",
                "about": "string (short summary of the document in student-friendly terms)",
                "clauses": [
                    {
                    "title": "string (clause title)",
                    "explanation": "string (2–3 sentence clear explanation of what this clause means in practice for the student)"
                    }
                ],
                "keyLegalNotes": ["array of references to Indian law, if relevant (otherwise 'N/A')"],
                "finalTips": ["array of 3–5 actionable, supportive tips for students or young professionals"]
                }

                Guidelines:
                - Include 8–10 clauses, summarizing or combining if necessary. Each explanation should be 2–3 sentences long and student-friendly.
                - Keep tone professional but supportive, like a mentor explaining key points.
                - Focus on financial terms, intellectual property, confidentiality, termination/exit, stipend, certificate/experience letter, and working hours.
                - Do not generate unrealistic 'examples' or unnecessary suggestions.
                - Use Indian legal context wherever relevant (Shops & Establishments Act, IT Act, Copyright Act, Industrial Disputes Act, labor laws).
                - If no financial terms exist, mention 'N/A'.
                - Output only valid JSON with no extra text.
                - Prices must be given in Indian Rupees (₹), with approximate ranges.
                
                Agreement Text:
                ${agreementText}
            `;
            break;

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