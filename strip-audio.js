const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videoDirs = ['./src/assets/videos', './src/assets/videos/webm'];
const formats = ['.mp4', '.webm'];

// Check if ffmpeg is installed
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: ffmpeg is not installed. Please install it first:');
  console.error('- For macOS: brew install ffmpeg');
  process.exit(1);
}

// Check if a video file has an audio stream
function hasAudio(filePath) {
  try {
    const result = execSync(
      `ffprobe -v quiet -show_entries stream=codec_type -of csv=p=0 "${filePath}"`,
      { encoding: 'utf-8' }
    );
    return result.includes('audio');
  } catch {
    return false;
  }
}

// Strip audio from a video file (video stream is copied, not re-encoded)
function stripAudio(filePath) {
  const ext = path.extname(filePath);
  const tmpPath = filePath.replace(ext, `_noaudio${ext}`);
  try {
    execSync(`ffmpeg -y -i "${filePath}" -an -c:v copy "${tmpPath}"`, { stdio: 'ignore' });
    fs.renameSync(tmpPath, filePath);
    console.log(`Stripped audio: ${filePath}`);
  } catch (error) {
    console.error(`Failed to strip audio from ${filePath}: ${error.message}`);
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

console.log('Checking video files for audio tracks...');

let stripped = 0;

for (const videoDir of videoDirs) {
  if (!fs.existsSync(videoDir)) continue;
  const files = fs.readdirSync(videoDir);

  for (const file of files) {
    if (formats.includes(path.extname(file).toLowerCase())) {
      const fullPath = path.join(videoDir, file);
      if (hasAudio(fullPath)) {
        stripAudio(fullPath);
        stripped++;
      } else {
        console.log(`No audio:  ${fullPath}`);
      }
    }
  }
}

console.log(`Done. Stripped audio from ${stripped} file(s).`);
