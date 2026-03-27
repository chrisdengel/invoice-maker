import express from 'express';
import { getInvoices, getInvoice, createInvoice, deleteInvoice, updateInvoice } from '../controllers/postController.js';
const router = express.Router();

// Get all invoices
router.get('/', getInvoices);

// Get single invoice
router.get('/:id', getInvoice);

//Create new invoice
router.post('/', createInvoice);

//Update inovice
router.put('/:id', updateInvoice);

//Delete invoice
router.delete('/:id', deleteInvoice);

export default router;