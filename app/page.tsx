'use client';

import Generator from './components/generator';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!exportRef.current) return;

    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('comunicado.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative">
        {/* ÁREA A4 FIJA */}
        <div
          ref={exportRef}
          className="bg-white text-black p-10 shadow-md"
          style={{
            width: '794px',
            height: '1123px', // A4 @ 96dpi
            overflow: 'hidden'
          }}
        >
          <Generator />
          <div
            className="footer text-center text-xl mt-12"
            contentEditable="true"
          >
            <hr className="my-6" />
            <p>Oficina del Presidente de la República Argentina</p>
          </div>
        </div>
      </div>

      {/* BOTÓN FLOTANTE */}
      <button
        onClick={handleExportPDF}
        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        Exportar PDF
      </button>
    </div>
  );
}
