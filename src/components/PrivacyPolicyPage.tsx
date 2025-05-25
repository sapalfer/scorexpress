import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animation-fade-in">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Politique de Confidentialité
        </h1>
      </header>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles données personnelles nous collectons et comment nous les utilisons.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Collecte de Données</h2>
        <p>
          ScoreXpress ne collecte pas d'informations personnelles identifiables (PII) lorsque vous utilisez les calculateurs de score. Les données que vous saisissez pour les calculs ne sont pas stockées ni transmises à nos serveurs.
        </p>
        <p>
          Si vous utilisez le formulaire de contact, nous collecterons les informations que vous fournissez (nom, email, message) afin de répondre à votre demande. Ces informations sont transmises via le service Formspree et sont soumises à leur politique de confidentialité.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Utilisation des Données</h2>
        <p>
          Les données du formulaire de contact sont utilisées uniquement pour répondre à vos demandes ou améliorer nos services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Cookies</h2>
        <p>
          ScoreXpress peut utiliser des cookies de session ou des technologies similaires pour améliorer l'expérience utilisateur (par exemple, pour maintenir l'état du menu mobile). Nous n'utilisons pas de cookies de suivi à des fins publicitaires.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Sécurité</h2>
        <p>
          Nous prenons des mesures raisonnables pour protéger les informations. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sécurisée à 100 %.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Modifications de cette Politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous notifierons de tout changement en publiant la nouvelle politique sur cette page.
        </p>
        <p className="mt-8">
          <em>Dernière mise à jour : [Date de la dernière mise à jour]</em>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
