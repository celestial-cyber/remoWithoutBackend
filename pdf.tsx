'use client';

import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const PdfDownloadComponent: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (contentRef.current) {
      html2pdf()
        .from(contentRef.current)
        .set({
          margin: 0.5,
          filename: 'AI_Generated_Report.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .save();
    }
  };

  return (
    <div className="p-6">
      {/* Content to convert to PDF */}
      <div ref={contentRef} className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Generated Content</h2>
        <p>This is sample content. You can replace it with dynamic AI output.</p>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default PdfDownloadComponent;
