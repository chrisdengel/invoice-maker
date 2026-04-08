
const form = document.getElementById('invoice-form');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        // validate user input

        if (!data.client || !data.rate || !data.timeIn || !data.timeOut) {
            alert("Please fill out required fields");
            return;
        }
        
        if (new Date(data.timeOut) <= new Date(data.timeIn)) {
            alert("Something doesn't look right. Time Out is usually after Time In. Press the back button to edit.");
            return;
        }

        try {
            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error('Failed to create invoice');

            const newInvoice = await res.json();

            window.location.href = `/invoice.html?id=${newInvoice.id}`;

        } catch (err) {
            console.error(err);
        }


    });
    
}