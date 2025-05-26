import React, { useState, useEffect } from 'react'; // Added useState & useEffect
import { BrowserRouter, Routes, Route, useParams, Navigate, Link, useLocation } from 'react-router-dom'; // Added useLocation
import ReactGA from 'react-ga4'; // Added ReactGA
import CookieConsent from "react-cookie-consent"; // Added CookieConsent
import { getAllScores, Score } from './data/scores_by_category'; // Updated import

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

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let gaInitializedGlobally = false; // To track if GA has been initialized

function initializeAnalytics() {
  if (GA_MEASUREMENT_ID && !gaInitializedGlobally) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    gaInitializedGlobally = true;
    console.log(`GA Initialized with ID: ${GA_MEASUREMENT_ID} after cookie consent.`);
    // Send initial pageview now that GA is ready
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: document.title });
    console.log(`GA Initial Pageview (after consent): ${window.location.pathname + window.location.search}`);
  } else if (!GA_MEASUREMENT_ID) {
    console.warn("GA Measurement ID not found. Analytics will not be initialized.");
  } else if (gaInitializedGlobally) {
    console.log("GA already initialized.");
  }
}

const ScoreDetailWrapper: React.FC<{ scores: Score[], isLoading: boolean }> = ({ scores, isLoading }) => { // Pass scores and loading state as props
  const { scoreId } = useParams<{ scoreId: string }>();
    // Loading state handling for ScoreDetailWrapper
  if (isLoading) {
    return <div className="py-6 text-center"><p className="text-xl text-gray-700">Chargement des scores...</p></div>;
  }
  const score = scoreId ? scores.find((s: Score) => s.id === scoreId) : null;

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

// Component to handle page view tracking
const TrackPageViews: React.FC<{ gaInitialized: boolean }> = ({ gaInitialized }) => {
  const location = useLocation();

  useEffect(() => {
    if (gaInitialized && gaInitializedGlobally && GA_MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search, title: document.title });
      console.log(`GA Pageview: ${location.pathname + location.search}`); // Optional: for debugging
    }
  }, [location]);

  return null; // This component does not render anything
};


const AppContent: React.FC<{ gaInitialized: boolean }> = ({ gaInitialized }) => {
  const [appScores, setAppScores] = useState<Score[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setIsLoadingScores(true);
        const loadedScores = await getAllScores();
        setAppScores(loadedScores);
      } catch (error) {
        console.error("Failed to load scores in AppContent:", error);
      } finally {
        setIsLoadingScores(false);
      }
    };
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <TrackPageViews gaInitialized={gaInitialized} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/score/:scoreId" element={<ScoreDetailWrapper scores={appScores} isLoading={isLoadingScores} />} />
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
  const [gaConsentGiven, setGaConsentGiven] = useState(false);

  useEffect(() => {
    const consentCookie = document.cookie.split(';').some((item) => item.trim().startsWith('myAppCookieConsent=true'));
    if (consentCookie && !gaInitializedGlobally) {
      console.log("Cookie consent previously given, initializing GA.");
      initializeAnalytics();
      setGaConsentGiven(true);
    }
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent gaInitialized={gaConsentGiven} />
        <CookieConsent
          location="bottom"
          buttonText="J'accepte"
          cookieName="myAppCookieConsent"
          style={{ background: "#2B373B", zIndex: 1000 }}
          buttonStyle={{ color: "#FFFFFF", background: "#1E90FF", fontSize: "14px", padding: "10px 15px", borderRadius: "5px" }}
          expires={150}
          enableDeclineButton
          declineButtonText="Je refuse"
          declineButtonStyle={{ background: "#708090", fontSize: "14px", padding: "10px 15px", borderRadius: "5px" }}
          onAccept={() => {
            console.log("Cookies acceptés !");
            initializeAnalytics();
            setGaConsentGiven(true);
          }}
          onDecline={() => {
            console.log("Cookies refusés.");
            setGaConsentGiven(false); // Ensure GA is not considered initialized for tracking
          }}
        >
          Ce site utilise des cookies pour améliorer l'expérience utilisateur.{" "}
          <span style={{ fontSize: "12px" }}>
            Consultez notre <Link to="/privacy" style={{color: 'yellow', textDecoration: 'underline'}}>politique de confidentialité</Link> et nos <Link to="/terms" style={{color: 'yellow', textDecoration: 'underline'}}>conditions d'utilisation</Link>.
          </span>
        </CookieConsent>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;