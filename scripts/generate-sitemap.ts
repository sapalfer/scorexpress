import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllScores } from '../src/data/scores_by_category/index.ts'; // Adjust path if necessary
// We assume getAllScores returns Promise<Score[]> where Score has an 'id' property.

interface SitemapUrl {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  // lastmod?: string; // Optional: YYYY-MM-DD format
}

async function generateSitemap() {
  const baseUrl = 'https://scorexp.netlify.app';
  
  // Create a stream to write to
  const sitemap = new SitemapStream({ hostname: baseUrl });

  const staticRoutes: SitemapUrl[] = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/terms', changefreq: 'yearly', priority: 0.5 },
    { url: '/privacy', changefreq: 'yearly', priority: 0.5 },
  ];

  console.log('Generating sitemap...');

  // Sitemap stream conversion logic is now handled correctly within the try block.

  // Add static routes to the sitemap
  staticRoutes.forEach(route => {
    sitemap.write(route);
  });

  try {
    // Add dynamic score routes
    console.log('Fetching scores...');
    const scores = await getAllScores(); // This is async
    console.log(`Found ${scores.length} scores.`);
    
    scores.forEach(score => {
      if (score && score.id) {
        sitemap.write({
          url: `/score/${score.id}`,
          changefreq: 'weekly',
          priority: 0.9,
          // lastmod: score.lastUpdated // If you have such a field
        });
      } else {
        console.warn('Found a score without an ID, skipping:', score);
      }
    });

    sitemap.end(); // End the stream after all dynamic routes are added

    // Convert the sitemap stream to a string
    const sitemapData = await streamToPromise(sitemap);
    const xml = sitemapData.toString();
    
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    console.log(`Resolved sitemap path: ${sitemapPath}`);

    // Ensure public directory exists
    const publicDir = path.dirname(sitemapPath);
    if (!fs.existsSync(publicDir)) {
      console.log(`Creating directory: ${publicDir}`);
      fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log('Attempting to write sitemap XML to disk...');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Ensure sitemap stream is destroyed on error if not already ended
    if (!sitemap.writableEnded) {
        sitemap.destroy(error instanceof Error ? error : new Error(String(error)));
    }
  }
}

generateSitemap();
