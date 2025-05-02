import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

function Invoice({ totalAmount }) {
  const invoiceRef = useRef();

  const handleDownload = () => {
    const element = invoiceRef.current;
    const opt = {
      margin:       0.5,
      filename:     'donation-invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <div ref={invoiceRef} className="mt-8 p-6 border border-gray-300 rounded-lg shadow bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Donation Invoice Summary</h2>
        <p className="text-lg font-semibold">
          Total Amount Received: <span className="text-green-600">Rs. {totalAmount.toFixed(2)}</span>
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Invoice as PDF
      </button>
    </div>
  );
}

export default Invoice;
