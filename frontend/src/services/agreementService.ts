import type { AgreementProcess, AgreementSummary } from "../types";
import api from "../utils/baseApi";

export const agreementService = {
    async agreementProcess(data: AgreementProcess): Promise<AgreementProcess> {
        const response = await api.post('/agreements/agreement-process', data);
        return response.data;
    },

    async agreementSummary(file: File, uid: string, targetGroup: string, language: string): Promise<AgreementSummary> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', uid);
        formData.append('targetGroup', targetGroup);
        formData.append('language', language);

        const response = await api.post('/agreements/agreement-summary', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    }
}

