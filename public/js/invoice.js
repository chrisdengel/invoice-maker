const senderEl = document.getElementById('sender');
const senderEmailEl = document.getElementById('senderEmail');
const senderAddressEl = document.getElementById('senderAddress');
const clientEl = document.getElementById('client');
const clientEmailEl = document.getElementById('clientEmail');
const clientAddressEl = document.getElementById('clientAddress');
const dateEl = document.getElementById('header-date');
const descEl = document.getElementById('description');
const totalsEl = document.getElementById('totals');

const id = new URLSearchParams(window.location.search).get('id');

const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const invoice = invoices.find(inv => inv.id == id);

if (invoice) {
    clientEl.textContent = invoice.client;
    clientEmailEl.textContent = invoice.clientEmail;
    clientAddressEl.textContent = invoice.clientAddress;
    senderEl.textContent = invoice.sender;
    senderEmailEl.textContent = invoice.senderEmail;
    senderAddressEl.textContent = invoice.senderAddress;
    dateEl.textContent = `Date: ${invoice.date}`;

    descEl.textContent = invoice.descriptions.join(', ');

    const labor = invoice.hours * invoice.rate;

    totalsEl.innerHTML = `
        <p>Hours: ${invoice.hours}</p>
        <p>Rate: $${invoice.rate}</p>
        <h2>Total: $${labor.toFixed(2)}</h2>
    `;
} else {
    console.error("Invoice not found");
}