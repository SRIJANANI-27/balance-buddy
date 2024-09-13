import express from "express";
import { adddata, deletedata, getalldata, getFilteredData, getuser, login, register, updatedata } from "../controller/controller.js";


const router = express.Router();

router.get('/',getFilteredData)
router.post('/',adddata)
router.delete('/:id',deletedata)
router.put('/:id',updatedata)


router.post('/login',login);
router.post('/register',register);
router.get('/users',getuser)

export default router;
