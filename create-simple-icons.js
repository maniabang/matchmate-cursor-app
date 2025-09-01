const fs = require('fs');
const path = require('path');

// 간단한 PNG placeholder 생성 (1x1 transparent PNG)
const createTransparentPNG = (size) => {
  // 1x1 투명 PNG 데이터 (Base64)
  const data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=';
  return Buffer.from(data, 'base64');
};

// 아이콘 크기 배열
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];

// 아이콘 폴더 생성
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 임시 투명 PNG 아이콘 생성
iconSizes.forEach((size) => {
  const pngData = createTransparentPNG(size);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.png`), pngData);
});

// 마스크 가능한 아이콘도 동일하게 생성
maskableSizes.forEach((size) => {
  const pngData = createTransparentPNG(size);
  fs.writeFileSync(path.join(iconsDir, `maskable-${size}.png`), pngData);
});

// favicon.ico 용 아이콘
const favicon16 = createTransparentPNG(16);
const favicon32 = createTransparentPNG(32);
fs.writeFileSync(path.join(iconsDir, 'icon-16.png'), favicon16);
fs.writeFileSync(path.join(iconsDir, 'icon-32.png'), favicon32);

// 기본 favicon.ico 복사 (이미 있다면)
const faviconPath = path.join(__dirname, 'src', 'app', 'favicon.ico');
const publicFaviconPath = path.join(__dirname, 'public', 'favicon.ico');

if (fs.existsSync(faviconPath) && !fs.existsSync(publicFaviconPath)) {
  fs.copyFileSync(faviconPath, publicFaviconPath);
}

// 스크린샷 placeholder 생성
const screenshotDir = path.join(iconsDir, 'screenshot-mobile.png');
fs.writeFileSync(screenshotDir, createTransparentPNG(390));

console.log('✅ 임시 PWA 아이콘들이 생성되었습니다!');
console.log('📝 이제 PWA가 정상 작동합니다. 나중에 실제 디자인된 아이콘으로 교체하세요.');
console.log('');
console.log('🎯 생성된 파일들:');
iconSizes.forEach((size) => console.log(`   /public/icons/icon-${size}.png`));
maskableSizes.forEach((size) => console.log(`   /public/icons/maskable-${size}.png`));
console.log('   /public/icons/screenshot-mobile.png');

// SVG 파일들 삭제 (정리)
try {
  const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'));
  svgFiles.forEach((file) => {
    fs.unlinkSync(path.join(iconsDir, file));
  });
  console.log('🧹 SVG 파일들이 정리되었습니다.');
} catch (error) {
  // SVG 파일이 없어도 괜찮음
}
