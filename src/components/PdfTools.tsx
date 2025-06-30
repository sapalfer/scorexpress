import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Download, Loader } from 'lucide-react';
import { Score, ScoreResult, ScoreCriterion, CriterionOption } from '../types';

interface PdfToolsProps {
  score: Score;
  scoreResult: ScoreResult;
}

const PdfTools: React.FC<PdfToolsProps> = ({ score, scoreResult }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = (): jsPDF => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    const lineHeight = 7;
    let y = 0; // Set by addHeader

    const addHeader = () => {
      y = margin;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(score.name, pageWidth / 2, y, { align: 'center' });
      y += lineHeight * 1.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(new Date().toLocaleDateString('fr-FR'), pageWidth / 2, y, { align: 'center' });
      y += lineHeight * 2;
      
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += lineHeight * 1.5;
    };

    const addFooter = () => {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        const footerText = `ScoreXpress | Page ${i} sur ${pageCount}`;
        doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }
    };

    const checkPageBreak = (spaceNeeded: number) => {
      if (y + spaceNeeded > pageHeight - margin) {
        doc.addPage();
        addHeader();
      }
    };

    addHeader();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Critères sélectionnés', margin, y);
    y += lineHeight * 1.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const criterionNameX = margin + 5;
    const valueX = margin + 80;

    score.criteria.forEach((criterion: ScoreCriterion) => {
      const rawVal = scoreResult.criteriaValues[criterion.id];
      if (rawVal === undefined) return;

      let displayVal: string = String(rawVal);
      if (criterion.type === 'select' && criterion.options) {
        const found = (criterion.options as CriterionOption[]).find(opt => opt.value === Number(rawVal));
        if (found) {
          displayVal = found.label.replace(/\s*\(\d+\s*pts?\)$/, '').trim();
        }
      } else if (criterion.type === 'boolean') {
        displayVal = rawVal ? 'Oui' : 'Non';
      }
      
      const criterionTextLines = doc.splitTextToSize(`${criterion.name}:`, valueX - criterionNameX - 5);
      const valueTextLines = doc.splitTextToSize(displayVal, contentWidth - (valueX - margin));
      const linesNeeded = Math.max(criterionTextLines.length, valueTextLines.length);
      const spaceNeeded = (linesNeeded * lineHeight) + (lineHeight * 0.5);

      checkPageBreak(spaceNeeded);
      
      const startY = y;
      doc.text(criterionTextLines, criterionNameX, y);
      doc.setTextColor(80, 80, 80);
      doc.text(valueTextLines, valueX, y);
      doc.setTextColor(0, 0, 0);
      
      y = startY + spaceNeeded;
    });

    const resultSpaceNeeded = (lineHeight * 1.5) * 2 + (lineHeight * 1.2) + (lineHeight * 3);
    checkPageBreak(resultSpaceNeeded);
    
    y += lineHeight;
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += lineHeight * 1.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Résultat', margin, y);
    y += lineHeight * 1.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(String(scoreResult.value), margin + 5, y);
    y += lineHeight * 1.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const interpretationText = doc.splitTextToSize(`Interprétation : ${scoreResult.interpretation.text}`, contentWidth - 5);
    doc.text(interpretationText, margin + 5, y);

    addFooter();

    return doc;
  };

  const handleDownload = () => {
    setIsGenerating(true);
    try {
      const pdf = generatePDF();
      const safeScoreName = score.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `scorexpress_${safeScoreName}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(filename);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      aria-label="Télécharger PDF"
      className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
    >
      {isGenerating ? <Loader size={18} className="animate-spin" /> : <Download size={18} />}
    </button>
  );
};

export default PdfTools;
