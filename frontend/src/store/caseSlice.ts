import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { AgreementSummary } from '../types';
import { caseService } from '../services/caseService';

interface CaseState {
  caseSummary: AgreementSummary | null;
  caseTid: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CaseState = {
  caseSummary: null,
  caseTid: null,
  loading: false,
  error: null,
};

export const searchCaseAsync = createAsyncThunk(
  'case/searchCase',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await caseService.searchCase(query);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Summary failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const caseSummaryAsync = createAsyncThunk(
  'case/caseSummary',
  async (tid: string, { rejectWithValue }) => {
    try {
      const response = await caseService.caseSummary(tid);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Case Summary failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get case Summary
      .addCase(caseSummaryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(caseSummaryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.caseSummary = action.payload;
        state.error = null;
      })
      .addCase(caseSummaryAsync.rejected, (state, action) => {
        state.loading = false;
        state.caseSummary = null;
        state.error = action.payload as string;
      })

      // get case Process
      .addCase(searchCaseAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCaseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.caseTid = action.payload;
        state.error = null;
      })
      .addCase(searchCaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.caseTid = null;
        state.error = action.payload as string;
      });
  },
});

export default caseSlice.reducer;
