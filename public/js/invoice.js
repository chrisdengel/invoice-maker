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

if (clientEl && dateEl && descEl && totalsEl) {
    const id = new URLSearchParams(window.location.search).get('id');

    if (id) {
        fetch(`/api/invoices/${id}`)
            .then(res => res.json())
            .then(invoice => {
                clientEl.textContent = `${invoice.client}`;
                clientEmailEl.textContent = `${invoice.clientEmail}`;
                clientPhoneNumberEl.textContent = `${invoice.clientPhoneNumber}`;
                clientAddressEl.textContent = `${invoice.clientAddress}`;
                clientCityEl.textContent = `${invoice.clientCity}`;
                clientStateEl.textContent = `${invoice.clientState}`;
                clientZipEl.textContent = `${invoice.clientZip}`;
                senderEl.textContent = `${invoice.sender}`;
                senderEmailEl.textContent = `${invoice.senderEmail}`;
                senderPhoneNumberEl.textContent = `${invoice.senderPhoneNumber}`;
                senderAddressEl.textContent = `${invoice.senderAddress}`;
                senderCityEl.textContent = `${invoice.senderCity}`;
                senderStateEl.textContent = `${invoice.senderState}`;
                senderZipEl.textContent = `${invoice.senderZip}`;
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