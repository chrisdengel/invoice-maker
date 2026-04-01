let invoices = [];

// Round to nearest 5 minutes
function roundTo5(date) {
    const ms = 1000 * 60 * 5;
    return new Date(Math.round(date.getTime() / ms) * ms);
}

// Create new invoice
export const createInvoice = (req, res) => {
    const { sender, client, description, timeIn, timeOut, rate } = req.body;

    // if (!sender || !client || !description || !timeIn || !timeOut || !rate) {
    //     return res.status(400).json({ error: 'All fields are required' });
    // }

    const start = roundTo5(new Date(timeIn));
    const end = roundTo5(new Date(timeOut));
    // const lunch = minusBreak(`${lunchBreak}`)
    const hours = (end - start) / 3600000;

    const descriptions = description
        .split(',')
        .map(d => d.trim())
        .filter(Boolean);

    const newInvoice = {
        id: invoices.length + 1,
        sender,
        client,
        date: new Date().toLocaleDateString(),
        timeIn: start,
        timeOut: end,
        hours,
        rate: Number(rate),
        descriptions
    };

    invoices.push(newInvoice);

    res.status(201).json(newInvoice);
};

// Get all invoices
export const getInvoices = (req, res) => res.json(invoices);

// Get invoice by ID
export const getInvoice = (req, res) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
};
