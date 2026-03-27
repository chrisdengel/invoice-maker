const output = document.querySelector('#output');
const button = document.querySelector('#get-invoices-btn');
const form = document.querySelector('#add-invoice-form')

// Get and show posts
    async function showInvoices() {

    try {
        const res = await fetch('http://localhost:8000/api/invoices');
        if (!res.ok) {
            throw new Error('Failed to fetch invoices');
        }

        const invoices = await res.json();
        output.innerHTML = '';
    
        invoices.forEach((invoice) => {
            const invoiceEl = document.createElement('div');
            invoiceEl.textContent = invoice.description;
            output.appendChild(invoiceEl);
        })
    } catch (error) {
        console.log('Error fetching invoices: ', error);
    }
}

// Submit new post
    async function addInvoice(e) {
        e.preventDefault();
    
    const formData = new FormData(this);
    const description = formData.get('description');
    
    e.target.reset()

    try {
        const res = await fetch('http://localhost:8000/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description})
        });

        if (!res.ok) {
            throw new Error('Failed to add post');
        }

        const newInvoice = await res.json();

        const invoiceEl = document.createElement('div');
        invoiceEl.textContent = newInvoice.description;
        output.appendChild(invoiceEl);
        showInvoices();
    } catch (error) {
        console.error('Error adding invoice');
    }
}
// Event listener
button.addEventListener('click', showInvoices);
form.addEventListener('submit', addInvoice);