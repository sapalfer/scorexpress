import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { X, Mail, Loader } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  scoreId: string;
  scoreName: string;
  scoreValue: number;
  interpretation: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  scoreId,
  scoreName,
  scoreValue,
  interpretation
}) => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the modal
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  
  const generatePDF = async () => {
    const printableArea = document.querySelector('.printable-content-area');
    
    if (!printableArea) {
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
      
      return pdf.output('datauristring');
    } catch (err) {
      console.error('Error generating PDF:', err);
      return null;
    }
  };
  
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Adresse email invalide');
      return;
    }
    
    setSending(true);
    setError('');
    
    try {
      const pdfData = await generatePDF();
      
      if (!pdfData) {
        throw new Error('Impossible de générer le PDF');
      }
      
      const templateParams = {
        to_email: email,
        score_name: scoreName,
        score_value: scoreValue,
        interpretation: interpretation,
        pdf_data: pdfData,
        score_id: scoreId
      };
      
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const userID = import.meta.env.VITE_EMAILJS_USER_ID || '';
      
      if (!serviceID || !templateID || !userID) {
        throw new Error('Configuration EmailJS manquante');
      }
      
      await emailjs.send(serviceID, templateID, templateParams, userID);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Échec de l\'envoi de l\'email. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
            <Mail size={24} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Envoyer le résultat par email</h3>
          <p className="text-gray-600 mt-1">
            Recevez le résultat de {scoreName} au format PDF
          </p>
        </div>
        
        {success ? (
          <div className="text-center text-green-600 p-4">
            <p className="font-medium">Email envoyé avec succès!</p>
            <p className="text-sm mt-1">Vérifiez votre boîte de réception</p>
          </div>
        ) : (
          <form onSubmit={sendEmail}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre.email@exemple.com"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {sending ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer le PDF'
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Nous utilisons votre email uniquement pour vous envoyer ce résultat.
              Aucune donnée n'est conservée.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailModal;
