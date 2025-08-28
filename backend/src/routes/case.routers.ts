import { Router } from "express";
import { 
    getCaseSummary,
    searchCases,
} from "../controllers/case.controller";


const router = Router();


router.route("/search-cases").post(searchCases);
router.route("/case-summary").post(getCaseSummary);

export default router;