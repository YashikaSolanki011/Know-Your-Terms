import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { agreementService } from '../services/agreementService';
import type { AgreementProcess, AgreementSummary } from '../types';

interface AgreementState {
  agreementSummery: AgreementSummary | null;
  agreementProcess: AgreementProcess | null;
  loading: boolean;
  error: string | null;
}

const initialState: AgreementState = {
  agreementSummery: null,
  agreementProcess: null,
  loading: false,
  error: null,
};

export const agreementSummaryAsync = createAsyncThunk(
  'agreement/agreementSummary',
  async ({ file, uid, targetGroup, language }: { file: File; uid: string; targetGroup: string; language: string }, { rejectWithValue }) => {
    try {
      const response = await agreementService.agreementSummary(file, uid, targetGroup, language);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Summary failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const agreementProcessAsync = createAsyncThunk(
  'agreement/agreementProcess',
  async (data: {uid:string, processType:string}, { rejectWithValue }) => {
    try {
      const response = await agreementService.agreementProcess(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Process failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const agreementSlice = createSlice({
  name: 'agreement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get agreement Summary
      .addCase(agreementSummaryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(agreementSummaryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agreementSummery = action.payload;
        state.error = null;
      })
      .addCase(agreementSummaryAsync.rejected, (state, action) => {
        state.loading = false;
        state.agreementSummery = null;
        state.error = action.payload as string;
      })

      // get agreement Process
      .addCase(agreementProcessAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(agreementProcessAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agreementProcess = action.payload;
        state.error = null;
      })
      .addCase(agreementProcessAsync.rejected, (state, action) => {
        state.loading = false;
        state.agreementProcess = null;
        state.error = action.payload as string;
      });
  },
});

export default agreementSlice.reducer;
