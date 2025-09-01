const fs = require('fs');
const path = require('path');

// 기본 MatchMate 로고 SVG
const logoSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="80" fill="url(#gradient)"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  
  <!-- Heart Icon -->
  <path d="M256 416c-7.3 0-14.3-2.7-19.8-7.6l-88.9-78.9C102.2 289.1 80 242.6 80 192c0-70.7 57.3-128 128-128 32.4 0 62.1 12.1 84.5 32 22.4-19.9 52.1-32 84.5-32 70.7 0 128 57.3 128 128 0 50.6-22.2 97.1-67.3 137.5l-88.9 78.9c-5.5 4.9-12.5 7.6-19.8 7.6z" fill="white"/>
  
  <!-- M letter overlay -->
  <text x="256" y="280" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#6366f1" text-anchor="middle">M</text>
</svg>
`.trim();

// 마스크 가능한 아이콘 (배경이 전체를 덮음)
const maskableSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="url(#gradient)"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  
  <!-- Heart Icon -->
  <path d="M256 416c-7.3 0-14.3-2.7-19.8-7.6l-88.9-78.9C102.2 289.1 80 242.6 80 192c0-70.7 57.3-128 128-128 32.4 0 62.1 12.1 84.5 32 22.4-19.9 52.1-32 84.5-32 70.7 0 128 57.3 128 128 0 50.6-22.2 97.1-67.3 137.5l-88.9 78.9c-5.5 4.9-12.5 7.6-19.8 7.6z" fill="white"/>
  
  <!-- M letter overlay -->
  <text x="256" y="280" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#6366f1" text-anchor="middle">M</text>
</svg>
`.trim();

// 아이콘 크기 배열
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];

// 아이콘 폴더 생성
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 일반 아이콘 생성
iconSizes.forEach((size) => {
  const filename = `icon-${size}.png`;
  const svgContent = logoSVG.replace(/width="512" height="512"/, `width="${size}" height="${size}"`);

  // SVG 파일로 임시 저장 (실제로는 SVG to PNG 변환 도구 필요)
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.svg`), svgContent);
});

// 마스크 가능한 아이콘 생성
maskableSizes.forEach((size) => {
  const filename = `maskable-${size}.png`;
  const svgContent = maskableSVG.replace(/width="512" height="512"/, `width="${size}" height="${size}"`);

  fs.writeFileSync(path.join(iconsDir, `maskable-${size}.svg`), svgContent);
});

// favicon.ico용 16x16 및 32x32 생성
fs.writeFileSync(
  path.join(iconsDir, 'favicon-16.svg'),
  logoSVG.replace(/width="512" height="512"/, 'width="16" height="16"')
);
fs.writeFileSync(
  path.join(iconsDir, 'favicon-32.svg'),
  logoSVG.replace(/width="512" height="512"/, 'width="32" height="32"')
);

console.log('✅ PWA 아이콘 SVG 파일들이 생성되었습니다!');
console.log('📝 실제 PNG 파일 변환을 위해서는 다음 중 하나를 사용하세요:');
console.log('   - 온라인 SVG to PNG 변환기');
console.log('   - npm install -g svg2png (Node.js 도구)');
console.log('   - Adobe Illustrator, Figma 등의 디자인 도구');
console.log('');
console.log('🎯 생성된 파일들:');
iconSizes.forEach((size) => console.log(`   /public/icons/icon-${size}.svg`));
maskableSizes.forEach((size) => console.log(`   /public/icons/maskable-${size}.svg`));
console.log('   /public/icons/favicon-16.svg');
console.log('   /public/icons/favicon-32.svg');
