# Deepseek Harness EAC - macOS 构建指南

## 系统要求

- macOS 10.15 (Catalina) 或更高版本
- Node.js 18+ (推荐使用 nvm 管理)
- Xcode Command Line Tools (`xcode-select --install`)

## 快速开始

### 1. 安装依赖

```bash
cd dsh-desktop
npm install
```

### 2. 获取运行时

```bash
# 获取 Node.js 运行时（macOS 版本）
npm run fetch-runtime-mac

# 或分别执行
npm run fetch-node-mac
npm run fetch-npm
```

### 3. 生成 macOS 图标

```bash
# 需要在 macOS 上运行
npm run build-icon-mac
# 或
node scripts/build-icon-mac.js
```

### 4. 构建应用

```bash
# 构建 DMG 和 ZIP（通用版本，支持 Intel 和 Apple Silicon）
npm run dist:mac:universal

# 或仅构建 ARM64 版本（Apple Silicon）
npm run dist:mac:arm64

# 或仅构建 x64 版本（Intel）
npm run dist:mac
```

### 5. 测试运行

```bash
# 开发模式测试
npm start
```

## 构建产物

构建完成后，在 `dist/` 目录下会生成：

- `Deepseek-Harness-EAC-v{version}-universal.dmg` - DMG 安装包
- `Deepseek-Harness-EAC-v{version}-universal.zip` - ZIP 压缩包

## macOS 特性

### 应用权限

应用需要以下权限才能正常运行：

- **网络访问**: dsh web 服务需要本地网络访问
- **文件读写**: 会话数据和配置存储
- **JIT 编译**: Electron V8 引擎需要

### 签名与公证

默认配置已启用 Hardened Runtime，但未配置代码签名。如需分发，需要：

1. 获取 Apple Developer 证书
2. 在 `electron-builder.yml` 中配置签名信息
3. 进行 Apple 公证（Notarization）

### 应用结构

```
Deepseek Harness EAC.app/
├── Contents/
│   ├── Info.plist
│   ├── MacOS/
│   │   └── Deepseek Harness EAC
│   ├── Resources/
│   │   ├── app/              # Electron 应用代码
│   │   ├── node/             # 内置 Node.js 运行时
│   │   ├── npm/              # 内置 npm CLI
│   │   └── icon.icns         # 应用图标
│   └── Frameworks/           # Electron 框架
```

## 故障排除

### Node 可执行文件权限问题

如果遇到 "Permission denied" 错误：

```bash
chmod +x node_modules/.cache/*/node
# 或
chmod +x vendor/node/node
```

### 无法启动 dsh web

检查 Node 运行时是否正确获取：

```bash
ls -la vendor/node/node
./vendor/node/node --version
```

### 构建失败：缺少 icon.icns

运行图标生成脚本：

```bash
npm run build-icon-mac
```

## 与 CLI 版本共存

macOS 版本与命令行 dsh CLI 完全兼容：

- 共享 `~/.dsh` 配置目录
- 会话和 API Key 自动同步
- 插件隔离运行在 `web-desktop` profile

## 开发调试

### 启用调试模式

```bash
DSH_DESKTOP_DEBUG=1 npm start
```

### 查看日志

应用日志位于：
- `~/Library/Application Support/Deepseek Harness EAC/logs/`
- 或便携版：`{app}/data/logs/`

## 参考链接

- [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness)
- [EAC 原始仓库](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)
- [Electron 文档](https://www.electronjs.org/)
- [electron-builder 文档](https://www.electron.build/)
