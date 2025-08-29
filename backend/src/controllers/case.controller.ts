import axios from "axios";
import { ApiError } from "../utility/ApiError";
import ApiResponse from "../utility/ApiResponse";
import { asyncHandler } from "../utility/asyncHandler";
import { summarizeAgreementWithGemini } from "../services/geminiApi.services";

const Kanoon_Api_Key = process.env.KANOON_API_KEY;

// Step 1: Search API
export const searchCases = asyncHandler(async (req, res) => {
  let { query, page = 0 } = req.body;
  
  if (!query) throw new ApiError(400, 'query is required');

  // Ensure query is a string
  if (Array.isArray(query)) query = query[0];
  if (typeof query !== 'string') throw new ApiError(400, 'query must be a string');

const kanoonRes = await axios.post(
  "https://api.indiankanoon.org/search/",
  new URLSearchParams({
    formInput: query,
    pagenum: page.toString(),
  }),
  {
    headers: {
      Authorization: `Token ${Kanoon_Api_Key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
  }
);

  if (!kanoonRes.data || (!kanoonRes.data.results && !kanoonRes.data.docs)) {
    throw new ApiError(404, "No results found");
  }

  res.json(new ApiResponse(200, kanoonRes.data.docs, "Search results fetched"));
});

// Step 2: Fetch case by tid
export const getCaseSummary = asyncHandler(async (req, res) => {
    const { tid } = req.body;
    if (!tid) throw new ApiError(400, 'tid is required');

    // Use POST with form data, as with search endpoint
    const kanoonRes = await axios.post(
        `https://api.indiankanoon.org/doc/${tid}/`,
        new URLSearchParams({
        maxcites: '10',
        maxcitedby: '10',
        }),
        {
        headers: {
            Authorization: `Token ${Kanoon_Api_Key}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
        }
    );

    const caseText = kanoonRes.data.doc;

    const prompt = `
        You are a legal assistant. Summarize the following Indian court judgment into a clear, structured summary.

        Input:
        ${caseText}

        Instructions:
        1. Extract and summarize the key points in plain English.
        2. Include these sections in the output:
        - Case Title & Date
        - Court & Citation
        - Parties Involved
        - Background / Facts of the Case
        - Key Legal Issues
        - Arguments (Petitioner vs Respondent, if available)
        - Court’s Reasoning
        - Final Decision / Outcome
        3. Keep the summary concise but legally accurate.
        4. Avoid copying raw text; instead, rewrite in simple, professional language.
        5. Where possible, highlight the legal principles established.

        Output the summary in JSON with this format:
        {
        "caseTitle": "...",
        "court": "...",
        "citation": "...",
        "parties": "...",
        "facts": "...",
        "issues": "...",
        "arguments": {
            "petitioner": "...",
            "respondent": "..."
        },
        "reasoning": "...",
        "decision": "...",
        "principles": "..."
        }
    `;

    const geminiResponse = await summarizeAgreementWithGemini(prompt);

    res.json(new ApiResponse(200, geminiResponse, "Case details fetched"));

});