import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesToDownload = [
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_customer_aarav.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_supplier_ramesh.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_worker_sunita.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_admin_kavitha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_artisan_govind.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_artisan_farooq.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_artisan_malini.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    filename: 'avatar_artisan_siddharth.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    filename: 'product_organic_cotton_spools.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?auto=format&fit=crop&w=800&q=80',
    filename: 'product_brass_crafting_wire.jpg',
  },
];

const publicDir = path.resolve('public/images');
const assetsDir = path.resolve('src/assets/images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const targetPublic = path.join(publicDir, filename);
    const targetAsset = path.join(assetsDir, filename);

    function get(currentUrl) {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
          return;
        }
        const fileStream = fs.createWriteStream(targetPublic);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          fs.copyFileSync(targetPublic, targetAsset);
          console.log(`Downloaded ${filename} successfully`);
          resolve();
        });
      }).on('error', (err) => {
        reject(err);
      });
    }

    get(url);
  });
}

async function run() {
  for (const item of imagesToDownload) {
    try {
      await downloadImage(item.url, item.filename);
    } catch (err) {
      console.error(`Error downloading ${item.filename}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

run();
