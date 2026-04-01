const senderEl = document.getElementById('sender');
//const senderEmailEl = document.getElementById('senderEmail');
//const senderAddressEl = document.getElementById('senderAddress');
const clientEl = document.getElementById('client');
// const clientEmailEl = document.getElementById('clientEmail');
// const clientAddressEl = document.getElementById('clientAddress');
const dateEl = document.getElementById('header-date');
const descEl = document.getElementById('description');
const totalsEl = document.getElementById('totals');
// const nonBillEl = document.getElementById('nonBillable');
// const flatRateEl = document.getElementById('flatRate');

if (clientEl && dateEl && descEl && totalsEl) {
    const id = new URLSearchParams(window.location.search).get('id');

    if (id) {
        fetch(`/api/invoices/${id}`)
            .then(res => res.json())
            .then(invoice => {
                clientEl.textContent = `${invoice.client}`;
                senderEl.textContent = `${invoice.sender}`;
                dateEl.textContent = `Date: ${invoice.date}`;
                descEl.textContent = invoice.descriptions.join(', ');

                const labor = (invoice.hours || 0) * (invoice.rate || 0);

                totalsEl.innerHTML = `
                    <p>Hours: ${invoice.hours || 0}</p>
                    <p>Rate: $${invoice.rate || 0}</p>
                    <h2>Total: $${labor.toFixed(2)}</h2>
                `;
            })
            .catch(err => console.error('Error loading invoice:', err));
    }
}