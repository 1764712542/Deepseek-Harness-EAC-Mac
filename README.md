<div align="center">

<h1>Deepseek Harness EAC — macOS 版</h1>

<p><strong>基于 <a href="https://github.com/zouyuxuan122/Deepseek-Harness-EAC">Deepseek-Harness-EAC</a> 的 macOS 桌面客户端</strong></p>

<p>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac"><img src="https://img.shields.io/github/stars/1764712542/Deepseek-Harness-EAC-Mac?style=flat&label=%E2%AD%90&color=08C" alt="GitHub stars"></a>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac/releases"><img src="https://img.shields.io/badge/macOS-10.15+-000000?style=flat" alt="macOS"></a>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac/releases"><img src="https://img.shields.io/badge/Apple%20Silicon-ARM64-A2AAAD?style=flat" alt="Apple Silicon"></a>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-2EA44F?style=flat" alt="MIT License"></a>
</p>

<p>把官方 <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a>（<code>@deepseek-ai/dsh</code>，一切皆插件的 agent harness）
封装为<strong>开箱即用的 macOS 桌面客户端</strong>，支持 Intel 和 Apple Silicon，双击即用。</p>

</div>

---

## 🙏 致谢与声明

> **本项目基于以下开源项目二次开发：**
>
> - **[Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)** by [@zouyuxuan122](https://github.com/zouyuxuan122) — Windows/Linux 桌面客户端
> - **[deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)** by [DeepSeek AI](https://github.com/deepseek-ai) — 官方 agent harness
>
> 本项目在 EAC 的基础上增加了 **macOS 平台支持**，核心功能和大部分代码均来自原项目。
> 特别感谢 [@zouyuxuan122](https://github.com/zouyuxuan122) 的出色工作！

**原创项目功能：**
- ✅ 免装 Node.js，内置独立运行时
- ✅ 10 款 Web UI 皮肤
- ✅ 插件保护中心
- ✅ 自动压缩、人设卡、MCP 导入
- ✅ 会话文件追踪、终端标签页
- ✅ 社区插件市场
- ✅ 等等...（详见 [原项目 README](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)）

**本项目新增（macOS 版）：**
- 🍎 **macOS 原生支持**：Universal Binary，同时支持 Intel (x64) 和 Apple Silicon (arm64)
- 📦 **DMG 安装包**：标准 macOS 安装体验
- 🔐 **权限配置**：正确的应用权限和 Hardened Runtime
- 🛠️ **构建工具**：完整的 macOS 构建脚本和文档

---

## 📥 下载安装

### 预编译版本

> ⚠️ 当前版本需要自行构建，预编译版本将在后续版本发布。

### 从源码构建

#### 系统要求

- macOS 10.15 (Catalina) 或更高版本
- Node.js 18+（推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理）
- Xcode Command Line Tools（运行 `xcode-select --install` 安装）

#### 构建步骤

```bash
# 1. 克隆仓库
git clone https://github.com/1764712542/Deepseek-Harness-EAC-Mac.git
cd Deepseek-Harness-EAC-Mac/dsh-desktop

# 2. 安装依赖
npm install --force

# 3. 获取 macOS 运行时
npm run fetch-runtime-mac

# 4. 生成应用图标（可选）
node scripts/build-icon-mac.js

# 5. 构建 Universal Binary（支持 Intel + Apple Silicon）
npm run dist:mac:universal
```

构建完成后，`dist/` 目录下会生成：
- `Deepseek-Harness-EAC-v4.6.0-universal.dmg` — DMG 安装包
- `Deepseek-Harness-EAC-v4.6.0-universal.zip` — ZIP 压缩包

#### 其他构建选项

```bash
# 仅构建 ARM64 版本（Apple Silicon）
npm run dist:mac:arm64

# 仅构建 x64 版本（Intel）
npm run dist:mac
```

---

## 🚀 使用方法

### 首次启动

1. 双击 DMG 文件，将应用拖入 Applications 文件夹
2. 启动应用，首次运行会自动初始化配置
3. 在设置中配置 DeepSeek API Key
4. 开始使用！

### 配置目录

- **配置文件**：`~/.dsh/`
- **会话数据**：`~/.dsh/sessions/`
- **插件目录**：`~/.dsh/profiles/web-desktop/`

> 与命令行 dsh CLI 完全兼容，共享配置和会话数据。

### 环境变量

```bash
# 自定义配置目录
export DSH_HOME=~/.my-dsh

# 调试模式
export DSH_DESKTOP_DEBUG=1
```

---

## 🏗️ 项目结构

```
Deepseek-Harness-EAC-Mac/
├── README.md                    # 本文件
└── dsh-desktop/                 # Electron 桌面端
    ├── main.js                  # Electron 主进程（已适配 macOS）
    ├── electron-builder.yml     # 打包配置（已添加 macOS 支持）
    ├── package.json             # 项目配置
    ├── scripts/
    │   ├── fetch-node-mac.js    # macOS Node 运行时获取脚本（新增）
    │   ├── build-icon-mac.js    # PNG 转 ICNS 图标生成（新增）
    │   ├── after-pack.js        # 构建后处理（已适配 macOS）
    │   └── ...                  # 其他脚本
    ├── build/
    │   ├── entitlements.mac.plist  # macOS 应用权限（新增）
    │   ├── icon.png             # 应用图标
    │   └── ...
    ├── assets/                  # 插件、皮肤、资源文件
    └── BUILD-MACOS.md           # macOS 构建指南（新增）
```

---

## 🔧 macOS 适配详情

本项目对原版 EAC 进行了以下 macOS 适配：

### 1. Node 运行时路径

```javascript
// 适配前（Windows）
function nodeExe() {
  return path.join(process.resourcesPath, 'node', 'node.exe');
}

// 适配后（跨平台）
function nodeExe() {
  const isMacOrLinux = process.platform === 'darwin' || process.platform === 'linux';
  const nodeBin = isMacOrLinux ? 'node' : 'node.exe';
  if (app.isPackaged) return path.join(process.resourcesPath, 'node', nodeBin);
  return path.resolve(__dirname, 'vendor', 'node', nodeBin);
}
```

### 2. 符号链接类型

```javascript
// 适配前（Windows 专用）
fs.symlinkSync(source, link, 'junction');

// 适配后（跨平台）
const linkType = process.platform === 'win32' ? 'junction' : 'dir';
fs.symlinkSync(source, link, linkType);
```

### 3. 构建配置

```yaml
# 新增 macOS 构建目标
mac:
  icon: build/icon.icns
  category: public.app-category.developer-tools
  target:
    - target: dmg
      arch:
        - universal
    - target: zip
      arch:
        - universal
  entitlements: build/entitlements.mac.plist
  hardenedRuntime: true
```

### 4. 应用权限

```xml
<!-- entitlements.mac.plist -->
<key>com.apple.security.cs.allow-jit</key>
<key>com.apple.security.network.client</key>
<key>com.apple.security.files.user-selected.read-write</key>
```

---

## 📚 相关资源

### 原始项目

- **[Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)** — Windows/Linux 桌面客户端
- **[deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)** — 官方 agent harness
- **[EAC 交流群](https://github.com/zouyuxuan122/Deepseek-Harness-EAC#交流群)** — QQ: 523412163

### macOS 开发资源

- **[Electron 文档](https://www.electronjs.org/)** — Electron 框架
- **[electron-builder](https://www.electron.build/)** — 打包工具
- **[Apple Developer](https://developer.apple.com/)** — macOS 开发指南

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

**特别说明：**
- 本项目基于 [Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)（MIT 许可证）
- 原始项目基于 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)（MIT 许可证）
- 内置皮肤版权归原作者所有（详见原项目 README）

---

## 💬 反馈

- **Bug 报告**：[GitHub Issues](https://github.com/1764712542/Deepseek-Harness-EAC-Mac/issues)
- **功能建议**：[GitHub Discussions](https://github.com/1764712542/Deepseek-Harness-EAC-Mac/discussions)
- **原项目反馈**：[EAC 反馈平台](https://eac.dtyg123.dpdns.org/)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

**也请给原始项目一个 Star：[Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)**

</div>
