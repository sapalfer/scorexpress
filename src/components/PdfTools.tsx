import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader } from 'lucide-react';

interface PdfToolsProps {
  scoreName: string;
}

const PdfTools: React.FC<PdfToolsProps> = ({ scoreName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async (): Promise<jsPDF | null> => {
    const printableArea = document.querySelector('.printable-content-area');
    
    if (!printableArea) {
      console.error('Printable content area not found');
      return null;
    }
    
    try {
      const canvas = await html2canvas(printableArea as HTMLElement, { 
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      return pdf;
    } catch (err) {
      console.error('Error generating PDF:', err);
      return null;
    }
  };
  
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = await generatePDF();
      
      if (!pdf) {
        throw new Error('Failed to generate PDF');
      }
      
      // Create a sanitized filename from the score name
      const safeScoreName = scoreName
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
      
      // For tracking purposes
      console.log('Generating PDF for score:', scoreName);
      
      const filename = `scorexpress_${safeScoreName}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(filename);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="no-print">
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
      >
        {isGenerating ? (
          <>
            <Loader size={16} className="animate-spin mr-2" />
            Génération...
          </>
        ) : (
          <>
            <Download size={16} className="mr-2" />
            Télécharger PDF
          </>
        )}
      </button>
    </div>
  );
};

export default PdfTools;
