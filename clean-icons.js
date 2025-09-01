const fs = require('fs');

// 임시 파일 정리
fs.unlinkSync('./generate-icons.js');

console.log('✅ 임시 파일들이 정리되었습니다.');
