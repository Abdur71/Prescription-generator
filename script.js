function generatePrescription() {
    const data = {
        pname: pname.value,
        age: age.value,
        sex: sex.value,
        date: date.value,
        cc: cc.value,
        oe: oe.value,
        mh: mh.value,
        plan: plan.value,
        inv: inv.value,
        rx: rx.value
    };

    // Helper function to preserve line breaks in HTML
    function formatText(text) {
        return text.replace(/\n/g, "<br>");
    }

    const html = `
        <div class="a4-prescription" style="border:none;">

            <!-- Patient Info -->
            <div class="pres-info-row">
                <p><b>Name:</b> ${formatText(data.pname)}</p>
                <p><b>Age:</b> ${formatText(data.age)}</p>
                <p><b>Sex:</b> ${formatText(data.sex)}</p>
                <p><b>Date:</b> ${formatText(data.date)}</p>
            </div>

            <!-- Main Body -->
            <div class="pres-body">

                <!-- LEFT COLUMN (7.5 cm) -->
                <div class="left-column">
                    <div class="pres-row"><b>C/C:</b> <p>${formatText(data.cc)}</p></div>
                    <div class="pres-row"><b>O/E:</b> <p>${formatText(data.oe)}</p></div>
                    <div class="pres-row"><b>M/H:</b> <p>${formatText(data.mh)}</p></div>
                    <div class="pres-row"><b>Plan:</b> <p>${formatText(data.plan)}</p></div>
                    <div class="pres-row"><b>Investigation:</b> <p>${formatText(data.inv)}</p></div>
                </div>

                <!-- RIGHT COLUMN (RX area full height) -->
                <div class="right-column">
                    <h2>Rx</h2>
                    <div class="rx-box">${formatText(data.rx)}</div>
                </div>

            </div>

            <!-- Doctor Signature -->
            <div class="doctor-signature" style="bottom:3.5cm;">Doctor's Signature __________________</div>

        </div>
    `;

    // Update preview and hidden print area
    document.getElementById("preview").innerHTML = html;
    document.getElementById("print-area").innerHTML = html;
}

function printPrescription() {
    const printContent = document.getElementById("print-area").innerHTML;

    // Open a new window for clean printing
    const printWindow = window.open('', '', 'width=800,height=1200');
    printWindow.document.write(`
        <html>
        <head>
            <title>Prescription</title>
            <style>
                @page { margin: 0; }
                body { margin: 0; font-family: "Segoe UI", sans-serif; }
                .a4-prescription { width: 21cm; height: 29.7cm; padding: 0; margin: auto; background: white; position: relative; border:none; }
                .pres-info-row { position: absolute; top: 5cm; left: 2cm; right: 2cm; display: flex; justify-content: space-between; font-size: 16px; }
                .pres-body { position: absolute; top: 7cm; left: 2cm; right: 2cm; bottom: 2cm; display: flex; gap: 20px; }
                .left-column { width: 7.5cm; font-size: 15px; line-height: 22px; }
                .left-column .pres-row { margin-bottom: 12px; }
                .left-column p { margin-left: 5px; white-space: pre-line; }
                .right-column { flex: 1; padding-left: 10px; }
                .right-column h2 { color: #0d3c8c; margin-bottom: 10px; }
                .rx-box { font-size: 16px; line-height: 26px; white-space: pre-line; }
                .doctor-signature { position: absolute; bottom: 3.5cm; right: 2cm; font-size: 16px; font-weight: bold; text-align: right; }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}
