import express from 'express';
import { createInvoice, getInvoices, getInvoice } from '../controllers/postController.js';

const router = express.Router();

router.post('/', createInvoice);   // POST /api/invoices
router.get('/', getInvoices);      // GET /api/invoices
router.get('/:id', getInvoice);    // GET /api/invoices/:id



export default router;