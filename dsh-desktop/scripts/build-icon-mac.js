'use strict';

// macOS 图标转换脚本：将 icon.png 转换为 icon.icns
//
// 使用方法：
//   npm run build-icon-mac
//   或
//   node scripts/build-icon-mac.js

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const buildDir = path.resolve(__dirname, '..', 'build');
const iconsetDir = path.join(buildDir, 'icon.iconset');
const iconPng = path.join(buildDir, 'icon.png');
const iconIcns = path.join(buildDir, 'icon.icns');

// macOS 图标尺寸
const ICON_SIZES = [
  { size: 16, scale: 1 },
  { size: 16, scale: 2 },
  { size: 32, scale: 1 },
  { size: 32, scale: 2 },
  { size: 128, scale: 1 },
  { size: 128, scale: 2 },
  { size: 256, scale: 1 },
  { size: 256, scale: 2 },
  { size: 512, scale: 1 },
  { size: 512, scale: 2 },
];

// 检查源文件是否存在
if (!fs.existsSync(iconPng)) {
  console.error('错误: build/icon.png 不存在');
  console.error('请先准备一个 icon.png 文件（建议 1024x1024 像素）');
  process.exit(1);
}

// 检查是否在 macOS 上运行
if (process.platform !== 'darwin') {
  console.error('错误: 此脚本只能在 macOS 上运行');
  console.error('在其他平台上，请使用在线工具将 PNG 转换为 ICNS');
  process.exit(1);
}

console.log('开始生成 macOS 图标...');

// 创建 iconset 目录
fs.mkdirSync(iconsetDir, { recursive: true });

// 生成各尺寸的图标
for (const { size, scale } of ICON_SIZES) {
  const pixelSize = size * scale;
  const filename = `icon_${size}x${size}${scale === 2 ? '@2x' : ''}.png`;
  const outputPath = path.join(iconsetDir, filename);

  try {
    // 使用 sips (macOS 内置工具) 调整图片大小
    execSync(`sips -z ${pixelSize} ${pixelSize} "${iconPng}" --out "${outputPath}"`, {
      stdio: 'pipe',
    });
    console.log(`  生成: ${filename} (${pixelSize}x${pixelSize})`);
  } catch (err) {
    console.error(`  失败: ${filename} - ${err.message}`);
    // 清理
    fs.rmSync(iconsetDir, { recursive: true, force: true });
    process.exit(1);
  }
}

// 使用 iconutil 生成 icns
try {
  execSync(`iconutil -c icns "${iconsetDir}" -o "${iconIcns}"`, {
    stdio: 'pipe',
  });
  console.log(`\n成功生成: ${iconIcns}`);

  // 清理临时目录
  fs.rmSync(iconsetDir, { recursive: true, force: true });
  console.log('临时文件已清理');

} catch (err) {
  console.error(`生成 icns 失败: ${err.message}`);
  fs.rmSync(iconsetDir, { recursive: true, force: true });
  process.exit(1);
}
