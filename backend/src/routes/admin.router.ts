import { Router } from 'express';

import { 
    getAllAuditLogs,
} from '../controllers/admin.controller';

const router = Router();

router.get("/audit-logs", getAllAuditLogs)


export default router;