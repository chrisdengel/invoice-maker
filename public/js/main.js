const form = document.getElementById('invoice-form');

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

function saveInvoices() {
    localStorage.setItem("invoices", JSON.stringify(invoices));
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const newInvoice = {
            id: Date.now(),
            ...data,
            descriptions: (data.description || "")
                .split(',')
                .map(d => d.trim())
                .filter(Boolean),
            hours: Number(data.hours || 0),
            rate: Number(data.rate || 0)
        };

        invoices.push(newInvoice);
        saveInvoices();

        window.location.href = `/invoice.html?id=${newInvoice.id}`;
    });
}