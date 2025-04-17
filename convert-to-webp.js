const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  sourceDir: './src/assets/images',  // Where your original images are stored
  targetDir: './src/assets/images/webp', // Where to save WebP versions
  quality: 80,  // WebP quality (0-100)
  formats: ['.jpg', '.jpeg', '.png'],  // Extensions to convert
  skipExisting: true  // Skip conversion if WebP version already exists
};

// Create target directory if it doesn't exist
if (!fs.existsSync(config.targetDir)) {
  fs.mkdirSync(config.targetDir, { recursive: true });
  console.log(`Created directory: ${config.targetDir}`);
}

// Check if cwebp is installed
try {
  execSync('cwebp -version', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: cwebp is not installed. Please install it first:');
  console.error('- For Ubuntu/Debian: sudo apt-get install webp');
  console.error('- For macOS: brew install webp');
  console.error('- For Windows: Download from https://developers.google.com/speed/webp/download');
  process.exit(1);
}

// Function to process a single file
function convertToWebP(filePath) {
  const extname = path.extname(filePath);
  const filename = path.basename(filePath, extname);
  const targetPath = path.join(config.targetDir, `${filename}.webp`);

  // Skip if target already exists and skipExisting is true
  if (config.skipExisting && fs.existsSync(targetPath)) {
    console.log(`Skipping ${filePath} (WebP version already exists)`);
    return;
  }

  // Convert the image
  try {
    execSync(`cwebp -q ${config.quality} "${filePath}" -o "${targetPath}"`);
    console.log(`Converted: ${filePath} → ${targetPath}`);
  } catch (error) {
    console.error(`Failed to convert ${filePath}: ${error.message}`);
  }
}

// Find and process all images recursively
function processDirectory(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.isFile()) {
      const extname = path.extname(file.name).toLowerCase();
      if (config.formats.includes(extname)) {
        convertToWebP(fullPath);
      }
    }
  }
}

// Start processing
console.log('Starting image conversion to WebP...');
processDirectory(config.sourceDir);
console.log('Conversion complete!');
