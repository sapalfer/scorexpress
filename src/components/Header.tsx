import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Menu, X } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const Header: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 no-print">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulse className="text-blue-500" size={24} />
          <h1 className="text-xl font-bold text-blue-600">ScoreXpress</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">
            À propos
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">
            Contact
          </Link>
        </div>
        
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div 
        id="mobile-menu"
        className={`md:hidden bg-white py-2 px-4 shadow-inner transition-all duration-300 ease-in-out transform overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}
      >
        {isMenuOpen && (
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;