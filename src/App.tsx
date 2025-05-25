import React from 'react';
import { BrowserRouter, Routes, Route, useParams, Navigate, Link } from 'react-router-dom';
import { scores } from './data/scores';

import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ScoreDetail from './components/ScoreDetail';
import AboutPage from './components/AboutPage'; 
import ContactPage from './components/ContactPage'; 
import TermsPage from './components/TermsPage'; 
import PrivacyPolicyPage from './components/PrivacyPolicyPage'; 
import NotFoundPage from './components/NotFoundPage';
import './index.css';

const ScoreDetailWrapper: React.FC = () => {
  const { scoreId } = useParams<{ scoreId: string }>();
  const score = scoreId ? scores.find(s => s.id === scoreId) : null;

  if (!scoreId) { 
    return <Navigate to="/" replace />;
  }
  if (!score) {
    return (
      <div className="py-6 text-center">
        <p className="text-xl text-red-600">Score non trouvé.</p>
        <p className="mt-2 text-gray-600">L'identifiant '{scoreId}' ne correspond à aucun score connu.</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  return (
    <div className="py-6">
      <ScoreDetail score={score} />
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/score/:scoreId" element={<ScoreDetailWrapper />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 py-8 text-sm text-gray-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} ScoreXpress. Tous droits réservés.</p>
            <p className="text-xs text-gray-500 mt-1">Outil d'aide à la décision médicale.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <Link to="/about" className="hover:text-blue-600 transition-colors">À propos</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link> 
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Conditions d'utilisation</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Politique de confidentialité</Link> 
          </nav>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;