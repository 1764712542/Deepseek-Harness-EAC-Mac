'use strict';

// macOS 版本：复制系统 Node 可执行文件到 vendor/node/node
//
// 为什么需要这样做：
//   打包后的应用使用独立的 Node 运行时来启动 dsh CLI，
//   这样可以确保预编译的原生模块（sharp, node-pty, koffi 等）
//   与安装时的 Node ABI 版本完全匹配。
//
// 使用方法（必须在系统 Node 下运行，不能在 Electron 内运行）：
//   npm run fetch-node

const fs = require('node:fs');
const path = require('node:path');

const src = process.execPath;
const dest = path.resolve(__dirname, '..', 'vendor', 'node', 'node');

if (!/node(\.exe)?$/i.test(path.basename(src))) {
  console.error('fetch-node 必须在系统 Node 下运行（npm run fetch-node），不能在 Electron 内运行。');
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);

// macOS/Linux 需要可执行权限
if (process.platform !== 'win32') {
  fs.chmodSync(dest, 0o755);
}

console.log(`已复制 ${src}`);
console.log(`    -> ${dest}`);
console.log(`Node ${process.version} / ${process.platform}-${process.arch} / ${fs.statSync(dest).size} bytes`);
