import { Router } from "express";
import { 
    getCaseSummary,
    searchCases,
} from "../controllers/case.controller";
import { authenticate } from "../middlewares/auth";


const router = Router();


router.route("/search-cases").post(authenticate, searchCases);
router.route("/case-summary").post(authenticate, getCaseSummary);

export default router;