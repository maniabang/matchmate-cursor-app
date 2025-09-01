const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 원본 로고 이미지 경로 (없다면 임시 색상 배경 생성)
const sourcePath = path.join(__dirname, 'public', 'icons', 'source.png');
const outDir = path.join(__dirname, 'public', 'icons');

const sizes = [192, 512];
const maskableSizes = [192, 512];

async function ensureSource() {
  if (fs.existsSync(sourcePath)) return;
  // 간단한 단색 PNG 생성 (1024x1024)
  const buffer = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 235, g: 168, b: 166, alpha: 1 },
    },
  })
    .png()
    .toBuffer();
  fs.writeFileSync(sourcePath, buffer);
}

async function makeIcon(size, name) {
  const target = path.join(outDir, name);
  await sharp(sourcePath).resize(size, size, { fit: 'cover' }).png().toFile(target);
  console.log('created', target);
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  await ensureSource();

  for (const s of sizes) {
    await makeIcon(s, `icon-${s}.png`);
  }
  for (const s of maskableSizes) {
    await makeIcon(s, `maskable-${s}.png`);
  }

  console.log('✅ real PWA icons generated.');
})();
