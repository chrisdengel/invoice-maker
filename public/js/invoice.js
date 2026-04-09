

const senderEl = document.getElementById('sender');
const senderEmailEl = document.getElementById('senderEmail');
const senderPhoneNumberEl = document.getElementById('senderPhoneNumber');
const senderAddressEl = document.getElementById('senderAddress');
const senderCityEl = document.getElementById('senderCity');
const senderStateEl = document.getElementById('senderState');
const senderZipEl = document.getElementById('senderZip');
const clientEl = document.getElementById('client');
const clientEmailEl = document.getElementById('clientEmail');
const clientPhoneNumberEl = document.getElementById('clientPhoneNumber');
const clientAddressEl = document.getElementById('clientAddress');
const clientCityEl = document.getElementById('clientCity');
const clientStateEl = document.getElementById('clientState');
const clientZipEl = document.getElementById('clientZip');
const dateEl = document.getElementById('header-date');
const descEl = document.getElementById('description');
const totalsEl = document.getElementById('totals');


function renderInvoice(invoice) {
    if (!invoice) return;

    clientEl.textContent = invoice.client ?? '';
    clientEmailEl.textContent = invoice.clientEmail ?? '';
    clientPhoneNumberEl.textContent = invoice.clientPhoneNumber ?? '';
    clientAddressEl.textContent = invoice.clientAddress ?? '';
    clientCityEl.textContent = invoice.clientCity ?? '';
    clientStateEl.textContent = invoice.clientState ?? '';
    clientZipEl.textContent = invoice.clientZip ?? '';

    senderEl.textContent = invoice.sender ?? '';
    senderEmailEl.textContent = invoice.senderEmail ?? '';
    senderPhoneNumberEl.textContent = invoice.senderPhoneNumber ?? '';
    senderAddressEl.textContent = invoice.senderAddress ?? '';
    senderCityEl.textContent = invoice.senderCity ?? '';
    senderStateEl.textContent = invoice.senderState ?? '';
    senderZipEl.textContent = invoice.senderZip ?? '';

    dateEl.textContent = `Date: ${invoice.date ?? ''}`;

    descEl.textContent = Array.isArray(invoice.descriptions)
        ? invoice.descriptions.join(', ')
        : invoice.description ?? '';

    const hours = Number(invoice.hours) ?? 0;
    const rate = Number(invoice.rate) ?? 0;
    const labor = invoice.labor ?? (hours * rate);

    totalsEl.innerHTML = `
        <p>Hours: ${hours}</p>
        <p>Rate: $${rate}</p>
        <h2>Total: $${labor.toFixed(2)}</h2>
    `;
}


if (clientEl && dateEl && descEl && totalsEl) {
    const id = new URLSearchParams(window.location.search).get('id');

    if (id) {
        fetch(`/api/invoices/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('API failed');
                return res.json();
            })
            .then(invoice => {
                renderInvoice(invoice);

                localStorage.setItem(`invoice-${id}`, JSON.stringify(invoice));
            })
            .catch(err => {
                console.warn('API failed, trying localStorage...', err);

                const saved = localStorage.getItem(`invoice-${id}`);
                if (saved) {
                    renderInvoice(JSON.parse(saved));
                } else {
                    descEl.textContent = 'Invoice could not be loaded.';
                }
            });
    }
}

