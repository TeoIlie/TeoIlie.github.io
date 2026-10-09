// Prepares project videos for the web. Safe to re-run: nothing is re-encoded.
//  - strips audio (silent tracks are needed for reliable autoplay on iOS)
//  - moves the moov atom to the front (faststart) so playback starts sooner
//  - extracts the first frame as a poster in src/assets/images/posters/
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videoDir = './public/assets/videos';
const posterDir = './src/assets/images/posters';

// Check if ffmpeg is installed
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: ffmpeg is not installed. Please install it first:');
  console.error('- For macOS: brew install ffmpeg');
  process.exit(1);
}

// Strip audio and apply faststart (video stream is copied, not re-encoded)
function optimize(filePath) {
  const tmpPath = filePath.replace(/\.mp4$/, '_tmp.mp4');
  try {
    execSync(`ffmpeg -y -i "${filePath}" -an -c:v copy -movflags +faststart "${tmpPath}"`, {
      stdio: 'ignore',
    });
    fs.renameSync(tmpPath, filePath);
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Failed to optimize ${filePath}: ${error.message}`);
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

// Save the first frame as a poster, unless one already exists
function extractPoster(filePath) {
  const posterPath = path.join(posterDir, `${path.basename(filePath, '.mp4')}.jpg`);
  if (fs.existsSync(posterPath)) return;
  try {
    execSync(`ffmpeg -y -i "${filePath}" -frames:v 1 -q:v 2 "${posterPath}"`, { stdio: 'ignore' });
    console.log(`Poster:    ${posterPath}`);
  } catch (error) {
    console.error(`Failed to extract poster from ${filePath}: ${error.message}`);
  }
}

fs.mkdirSync(posterDir, { recursive: true });

const files = fs.readdirSync(videoDir).filter((file) => file.endsWith('.mp4'));
for (const file of files) {
  const fullPath = path.join(videoDir, file);
  optimize(fullPath);
  extractPoster(fullPath);
}

console.log(`Done. Prepared ${files.length} video(s).`);
