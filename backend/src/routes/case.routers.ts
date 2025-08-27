import { Router } from "express";
import { 
    getCaseSummary,
    searchCases,
} from "../controllers/case.controller";


const router = Router();


router.route("/search-cases").get(searchCases);
router.route("/case-summary").get(getCaseSummary);

export default router;