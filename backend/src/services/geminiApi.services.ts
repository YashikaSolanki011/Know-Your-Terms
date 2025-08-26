import axios from 'axios';
import { ApiError } from '../utility/ApiError';
import { Translate } from '@google-cloud/translate/build/src/v2';

const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const geminiAPIKey = process.env.GEMINI_API_KEY;
const generativelanguageApiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;

if (!geminiAPIKey) {
  throw new ApiError(500, 'Missing Gemini API key');
}

export async function summarizeAgreementWithGemini(prompt: string): Promise<any> {
    const requestBody = {
        contents: [{ parts: [{ text: prompt }]}]
    };

    try {   
        const response = await axios.post(
            `${geminiApiUrl}?key=${geminiAPIKey}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let modelText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!modelText) {
            throw new ApiError(500, 'No response from Gemini model');
        }
        // If the modelText is wrapped in a markdown code block, strip it
        const codeBlockMatch = modelText.match(/```(?:json)?\n([\s\S]*?)\n```/i);
        if (codeBlockMatch) modelText = codeBlockMatch[1];

        // 2. Extract JSON substring if mixed with text
        const jsonMatch = modelText.match(/\{[\s\S]*\}/);
        if (jsonMatch) modelText = jsonMatch[0];
        
        // Try to parse JSON if model returns JSON, else return raw text
        try {
            return JSON.parse(modelText);
        } catch {
            return modelText;
        }
    } catch (error: any) {
        throw new ApiError(500, error.response?.data?.error?.message || error.message);
    }
}

// gemani api for process for agreement/ term and condition summary, review, analysis, etc.

// Optimized: user provides only the process/task name (e.g., 'rental agreement'), not a full prompt
export async function processWithGemini(task: string): Promise<any> {
    const prompt = `Given the following task, answer these questions in JSON format with keys: processSteps, requiredDocuments, creationLinks, priceInfo, needExpert.\n\n1. What is the process for this task?\n2. What are the documents required for this task?\n3. From where can we create documents (websites/links)?\n4. What are the prices of the document?\n5. When do we need a lawyer or CA?\n\nTask: ${task}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(
            `${geminiApiUrl}?key=${geminiAPIKey}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let modelText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!modelText) {
            throw new ApiError(500, 'No response from Gemini model');
        }
        // If the modelText is wrapped in a markdown code block, strip it
        const codeBlockMatch = modelText.match(/```(?:json)?\n([\s\S]*?)\n```/i);
        if (codeBlockMatch) {
            modelText = codeBlockMatch[1];
        }
        try {
            return JSON.parse(modelText);
        } catch {
            return { raw: modelText };
        }
    } catch (error: any) {
        throw new ApiError(500, error.response?.data?.error?.message || error.message);
    }
}

// Instantiates a client
const translate = new Translate();

/**
 * Translates text to the target language using Google Cloud Translate API.
 * @param text The text to translate
 * @param targetLanguage The target language code (e.g., 'hi' for Hindi, 'fr' for French)
 * @returns The translated text
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error: any) {
    throw new ApiError(500, error.message || 'Translation failed');
  }
}

