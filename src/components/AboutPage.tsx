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
          </div>
          {/* Assuming there are two more similar divs for the grid here based on md:grid-cols-3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Fiabilité Garantie</h3>
            {/* Placeholder content - adjust as needed */}
            <p className="text-gray-600">Des scores validés et reconnus par la communauté médicale.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Accessibilité Universelle</h3>
            {/* Placeholder content - adjust as needed */}
            <p className="text-gray-600">Disponible sur tous vos appareils, à tout moment.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Accès Rapide sur Votre Mobile</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg text-gray-700">
          <p className="mb-4 text-lg">
            Pour un accès encore plus rapide à ScoreXpress, vous pouvez ajouter l'application directement à l'écran d'accueil de votre téléphone. Elle fonctionnera comme une application native !
          </p>
          
          <img 
            src="/assets/images/add-to-homescreen-guide.png" 
            alt="Guide pour ajouter ScoreXpress à l'écran d'accueil" 
            className="mx-auto my-6 rounded-md shadow-md border" 
            style={{ maxWidth: '500px', width: '100%' }} 
          />

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Sur iOS (iPhone/iPad) :</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Ouvrez ScoreXpress dans <strong>Safari</strong>.</li>
                <li>Appuyez sur l'icône de <strong>Partage</strong> (un carré avec une flèche vers le haut en bas de l'écran).</li>
                <li>Faites défiler vers le bas et sélectionnez "<strong>Sur l'écran d'accueil</strong>".</li>
                <li>Confirmez le nom (par défaut "ScoreXpress") et appuyez sur "<strong>Ajouter</strong>".</li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Sur Android :</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Ouvrez ScoreXpress dans <strong>Chrome</strong> (ou votre navigateur Android principal).</li>
                <li>Appuyez sur l'icône du <strong>menu</strong> (souvent trois points verticaux en haut à droite).</li>
                <li>Sélectionnez "<strong>Installer l'application</strong>" ou "<strong>Ajouter à l'écran d'accueil</strong>".</li>
                <li>Suivez les instructions pour confirmer.</li>
              </ol>
            </div>
          </div>
          <p className="mt-8 text-sm text-center text-gray-500">
            Et voilà ! ScoreXpress sera accessible comme n'importe quelle autre application sur votre téléphone, directement depuis votre écran d'accueil.
          </p>
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
