import express from 'express';
import { createInvoice, getInvoices, getInvoice } from '../controllers/postController.js';

const router = express.Router();

router.post('/', createInvoice);   
router.get('/', getInvoices);      
router.get('/:id', getInvoice);   

export default router;