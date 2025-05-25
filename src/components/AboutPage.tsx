import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animation-fade-in">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          ScoreXpress: Votre Partenaire Décisionnel en Santé
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Simplifiez votre pratique clinique avec des scores médicaux rapides, fiables et accessibles en un instant.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Pourquoi ScoreXpress ?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Rapidité Maximale</h3>
            <p className="text-gray-600">
              Obtenez des résultats instantanément. Plus de calculs manuels fastidieux, plus de temps perdu.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Fiabilité Garantie</h3>
            <p className="text-gray-600">
              Accédez à des scores validés et reconnus, pour des décisions éclairées et sécurisées.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Interface Intuitive</h3>
            <p className="text-gray-600">
              Une expérience utilisateur soignée, conçue par et pour les professionnels de santé.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Notre Engagement</h2>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Chez ScoreXpress, nous sommes dédiés à fournir aux professionnels de santé les outils les plus performants pour optimiser les soins aux patients. Nous croyons en la puissance de la technologie pour transformer la médecine, la rendre plus efficiente et plus humaine.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Notre plateforme est en constante évolution, avec l'ajout régulier de nouveaux scores et fonctionnalités, pensés pour répondre aux défis quotidiens de votre pratique. Préparez-vous à découvrir une suite d'outils encore plus complète à l'avenir.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Prêt à optimiser votre pratique ?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Explorez nos scores dès maintenant et découvrez comment ScoreXpress peut vous faire gagner du temps et améliorer la prise en charge de vos patients.
        </p>
        {/* Future: Link to pricing or a more direct CTA */}
        {/* For now, users will navigate back or use existing navigation */}
      </section>
    </div>
  );
};

export default AboutPage;
