// build.js - Build script for production
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the template
let html = fs.readFileSync('src/index.html', 'utf8');

// Inject environment variables
html = html.replace(
    'window.env = {',
    `window.env = {
        NODE_ENV: '${process.env.NODE_ENV || 'production'}',
        SUPABASE_URL: '${process.env.SUPABASE_URL || ''}',
        SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY || ''}',
        ANALYTICS_ID: '${process.env.ANALYTICS_ID || ''}'
    };`
);

// Minify HTML (basic minification)
html = html
    .replace(/\s+/g, ' ')
    .replace(/<!--.*?-->/g, '')
    .trim();

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Write to dist
fs.writeFileSync('dist/index.html', html);
console.log('Build completed successfully!');