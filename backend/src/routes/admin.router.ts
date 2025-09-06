import { Router } from 'express';

import { 
    getAllAuditLogs,
} from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get("/audit-logs", authenticate, getAllAuditLogs)


export default router;