let invoices = [
    {id: 1, 
        description: '',
        // timeIn: ,
        // timeOut: 8,
    }
   
];

// @desc Get all invoices
// @route GET /api/invoices

export const getInvoices = (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
       return res.status(200).json(invoices.slice(0, limit));
    }

       return res.status(200).json(invoices);
};

//@desc Get single invoice
// @route GET /api/invoices/:id 

export const getInvoice = (req, res, next) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find((invoice) => invoice.id === id);

    if (!invoice) {
        const error = new Error(`An invoice with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    } 

        res.status(200).json(invoice);
}

//@desc  Create new invoice
// @route invoice /api/invoices 

export const createInvoice = (req, res, next) => {
    const newInvoice = {
        id: invoices.length + 1,
        description: req.body.description,
    };

if (!newInvoice.description) {
    const error = new Error(`Please include a description`);
    error.status = 400;
    return next(error);
}

    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
}


// @desc Update invoice
//@route PUT /api/invoice/:id
export const updateInvoice = (req, res, next) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find((invoice) => invoice.id === id);

    if (!invoice) {
            const error = new Error(`An invoice with the id of ${id} was not found`);
            error.status = 404;
            return next(error);
        } 
        if (!req.body.description) {
            const error = new Error('Please include a description');
            error.status = 400;
            return next(error);
        }
        
        invoice.description = req.body.description;
    invoice.description = req.body.description;
    res.status(200).json(invoices);
}

// @desc  Delete invoice
//@route DELETE /api/invoice/:id
export const deleteInvoice = (req, res, next) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find((invoice) => invoice.id === id);
    
    if (!invoice) {
        const error = new Error(`An invoice with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    } 
    
    invoices = invoices.filter((invoice) => invoice.id !== id);
     res.status(200).json(invoices);

}