import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animation-fade-in">
      <Helmet>
        <title>Politique de Confidentialité - ScoreXpress</title>
        <meta name="description" content="Consultez la politique de confidentialité de ScoreXpress. Nous expliquons quelles données nous collectons, comment nous les utilisons, et comment nous protégeons votre vie privée." />
        <link rel="canonical" href="https://scorexp.netlify.app/privacy" />
      </Helmet>
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
        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Cookies et Technologies Similaires</h2>
        <p>
          Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile par votre navigateur web lorsque vous visitez certains sites web. ScoreXpress utilise des cookies pour plusieurs raisons :
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>
            <strong>Cookies Essentiels/Fonctionnels :</strong> Certains cookies sont nécessaires au bon fonctionnement du site. Par exemple, nous utilisons un cookie (<code>myAppCookieConsent</code>) pour mémoriser vos préférences en matière de consentement aux cookies. D'autres cookies peuvent être utilisés pour des fonctionnalités telles que le maintien de l'état du menu de navigation.
          </li>
          <li>
            <strong>Cookies d'Analyse (Google Analytics) :</strong> Avec votre consentement explicite, nous utilisons Google Analytics pour collecter des informations sur la manière dont les visiteurs utilisent notre site. Ces informations nous aident à comprendre les interactions des utilisateurs (par exemple, quelles pages sont les plus visitées, combien de temps les utilisateurs passent sur le site, quels scores sont les plus consultés) afin d'améliorer le contenu et la fonctionnalité de ScoreXpress. Google Analytics dépose des cookies pour collecter ces données. Les informations collectées sont généralement agrégées et anonymisées dans la mesure du possible par Google. Ces cookies d'analyse ne sont activés qu'après que vous ayez donné votre consentement via notre bannière de cookies.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Gestion des Cookies</h3>
        <p>
          Lors de votre première visite sur ScoreXpress, une bannière de consentement aux cookies apparaît, vous permettant d'accepter ou de refuser l'utilisation des cookies non essentiels (comme ceux de Google Analytics). Vous pouvez modifier vos préférences à tout moment (bien que la modification après le choix initial puisse nécessiter la suppression manuelle des cookies via les paramètres de votre navigateur pour que la bannière réapparaisse). La plupart des navigateurs web vous permettent également de contrôler les cookies via leurs paramètres.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Services d'Analyse Tiers</h2>
        <p>
          Nous utilisons Google Analytics, un service d'analyse web fourni par Google Ireland Limited ("Google"). Google Analytics utilise des cookies pour nous aider à analyser l'utilisation du site par ses utilisateurs. Les données générées par les cookies concernant votre utilisation du site (y compris potentiellement votre adresse IP tronquée) seront transmises et stockées par Google sur des serveurs pouvant être situés aux États-Unis.
        </p>
        <p>
          Google utilisera ces informations dans le but d'évaluer votre utilisation du site, de compiler des rapports sur l'activité du site à notre intention et de fournir d'autres services relatifs à l'activité du site et à l'utilisation d'Internet. Google est susceptible de communiquer ces données à des tiers en cas d'obligation légale ou lorsque ces tiers traitent ces données pour le compte de Google.
        </p>
        <p>
          Pour plus d'informations sur la manière dont Google utilise les données lorsque vous utilisez les sites ou applications de ses partenaires, veuillez consulter : <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/technologies/partner-sites</a>.
          Vous pouvez également consulter la politique de confidentialité de Google : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/privacy</a>.
        </p>
        <p>
          Nous n'activons Google Analytics et ses cookies qu'après avoir obtenu votre consentement explicite.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Sécurité</h2>
        <p>
          Nous prenons des mesures raisonnables pour protéger les informations. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sécurisée à 100 %.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Modifications de cette Politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous notifierons de tout changement en publiant la nouvelle politique sur cette page.
        </p>
        <p className="mt-8">
          <em>Dernière mise à jour : 26 mai 2025</em>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
