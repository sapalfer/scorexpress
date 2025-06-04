import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface FormData {
  name: string;
  email: string;
  feedbackType: 'bug' | 'feature' | 'general' | 'question';
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    feedbackType: 'general',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!formData.name.trim() && !formData.email.trim() && !formData.message.trim()) {
      setError('Veuillez remplir au moins le message ou fournir votre nom/email.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Le message ne peut pas être vide.');
      return;
    }

    // IMPORTANT: Replace with your actual Formspree endpoint URL
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      console.error('Formspree endpoint URL is not defined. Please set VITE_FORMSPREE_ENDPOINT in your .env file.');
      setError('Configuration error: Unable to submit form. Please contact support.');
      return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Formspree needs this to reply with JSON
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form data after successful submission
        setFormData({ name: '', email: '', feedbackType: 'general', message: '' }); 
      } else {
        const responseData = await response.json();
        if (responseData.errors && responseData.errors.length > 0) {
          setError(responseData.errors.map((err: { field: string; message: string }) => `${err.field}: ${err.message}`).join(', '));
        } else {
          setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center animation-fade-in">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Merci !</h1>
        <p className="text-lg text-gray-700">
          Votre message a été envoyé avec succès. Nous apprécions vos retours.
        </p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setError(null); // Also reset error state
            setFormData({ name: '', email: '', feedbackType: 'general', message: '' });
          }}
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animation-fade-in">
      <Helmet>
        <title>Contactez ScoreXpress - Retours et Questions</title>
        <meta name="description" content="Contactez l'équipe ScoreXpress pour toute question, suggestion de fonctionnalité, ou pour signaler un bug. Vos retours nous aident à améliorer notre calculateur de scores médicaux." />
        <link rel="canonical" href="https://scorexp.netlify.app/contact" />
      </Helmet>
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Contactez-nous
        </h1>
        <p className="text-lg text-gray-600">
          Vos retours sont importants pour nous. Signalez un bug, suggérez une fonctionnalité ou posez une question.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom (Optionnel)</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optionnel)</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="pour que nous puissions vous répondre"
          />
        </div>

        <div>
          <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">Type de message</label>
          <select 
            name="feedbackType" 
            id="feedbackType" 
            value={formData.feedbackType} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="general">Feedback Général</option>
            <option value="bug">Signaler un Bug</option>
            <option value="feature">Suggestion de Fonctionnalité</option>
            <option value="question">Question</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre Message</label>
          <textarea 
            name="message" 
            id="message" 
            rows={5} 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Décrivez votre demande en détail..."
          ></textarea>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Envoyer le Message
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Nous lirons votre message attentivement. Pour une assistance technique urgente, veuillez utiliser d'autres canaux si disponibles.
        </p>
      </form>
    </div>
  );
};

export default ContactPage;
