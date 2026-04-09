let invoices = [];

function roundTo5(date) {
    const ms = 1000 * 60 * 5;
    return new Date(Math.round(date.getTime() / ms) * ms);
}

export const createInvoice = (req, res) => {
    const { sender, senderBusinessName, senderAddress, senderCity, senderState, senderZip, senderEmail, senderPhoneNumber, client, clientBusinessName, clientAddress, clientCity, clientState, clientZip, clientEmail, clientPhoneNumber, description, timeIn, timeOut, rate, taxExempt } = req.body;

     if (!sender || !client || !description || !rate) {
         return res.status(400).json({ error: 'Names, description and rate are required' });
    }

    const start = roundTo5(new Date(timeIn));
    const end = roundTo5(new Date(timeOut));
    const hours = (end - start) / 3600000;

    const labor = hours * Number(rate || 0);

    const TAX_RATE = 0.06;
    
    const isTaxExempt = taxExempt === 'true';
    
    const tax = isTaxExempt ? 0 : labor * TAX_RATE;
    const total = labor + tax;

    const descriptions = description
        .split(',')
        .map(d => d.trim())
        .filter(Boolean);

    const newInvoice = {
        id: invoices.length + 1,
        sender,
        senderBusinessName,
        senderEmail,
        senderPhoneNumber,
        senderAddress,
        senderCity,
        senderState,
        senderZip,
        client,
        clientBusinessName,
        clientEmail,
        clientPhoneNumber,
        clientAddress,
        clientCity,
        clientState,
        clientZip,
        date: new Date().toLocaleDateString(),
        timeIn: start,
        timeOut: end,
        hours,
        rate: Number(rate),
        descriptions,
        tax,
        total,
        taxExempt: isTaxExempt,
    };

    invoices.push(newInvoice);

    res.status(201).json(newInvoice);
};

export const getInvoices = (req, res) => res.json(invoices);

export const getInvoice = (req, res) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
};