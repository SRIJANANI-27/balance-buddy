import express from "express";
import { adddata, deletedata, getalldata, getFilteredData, updatedata } from "../controller/controller.js";


const router = express.Router();

router.get('/',getFilteredData)
router.post('/',adddata)
router.delete('/:id',deletedata)
router.put('/:id',updatedata)
export default router;
