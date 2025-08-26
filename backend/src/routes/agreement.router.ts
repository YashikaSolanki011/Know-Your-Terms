// agreement router.ts
import { Router } from 'express';
import { 
    agreementSummary,
    processAgreement,
} from '../controllers/agreement.controller';

const router = Router();

router.post("/agreement-summary", agreementSummary)

router.post("/agreement-process", processAgreement)

export default router;