import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animation-fade-in">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Conditions d'utilisation
        </h1>
      </header>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Bienvenue sur ScoreXpress. En utilisant ce site, vous acceptez de vous conformer aux présentes conditions d'utilisation.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Utilisation du Service</h2>
        <p>
          ScoreXpress fournit des outils de calcul de scores médicaux à des fins d'information et d'aide à la décision clinique. Ces outils ne remplacent pas un avis médical professionnel.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Exactitude des Informations</h2>
        <p>
          Nous nous efforçons de maintenir les informations et les calculs à jour et exacts. Cependant, nous ne garantissons pas l'exactitude, l'exhaustivité ou la pertinence des informations fournies.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Responsabilité</h2>
        <p>
          L'utilisation des scores et des informations de ce site se fait sous votre seule responsabilité. ScoreXpress ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur le site.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Vie Privée et Données Personnelles</h2>
        <p>
          Votre vie privée est importante pour nous. L'utilisation de ScoreXpress est également régie par notre <a href="/privacy" className="text-blue-600 hover:underline">Politique de Confidentialité</a>, qui décrit comment nous collectons, utilisons et protégeons vos informations. En utilisant ce site, vous consentez aux pratiques de données décrites dans la Politique de Confidentialité.
        </p>
        <p className="mt-8">
          <em>Dernière mise à jour : 26 mai 2025</em>
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
