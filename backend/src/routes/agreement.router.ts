// agreement router.ts
import { Router } from 'express';
import { 
    agreementSummary,
    processAgreement,
    uploadFile,
} from '../controllers/agreement.controller';
import { upload } from '../middlewares/multer';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route("/agreement-summary").post(upload.fields([{ name: "file", maxCount: 1 }]), agreementSummary)

router.route("/agreement-process").post(processAgreement)

// upload file
router.route("/upload").post(upload.fields([{ name: "file", maxCount: 1 }]), uploadFile);

export default router;