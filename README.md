<div align="center">

<h1>Deepseek Harness EAC — macOS 版</h1>

<p><strong>基于 <a href="https://github.com/zouyuxuan122/Deepseek-Harness-EAC">Deepseek-Harness-EAC</a> 的 macOS 桌面客户端</strong></p>

<p>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac/releases"><img src="https://img.shields.io/badge/macOS-13.0+-000000?style=flat" alt="macOS 13+"></a>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac/releases"><img src="https://img.shields.io/badge/Apple%20Silicon-ARM64-A2AAAD?style=flat" alt="Apple Silicon"></a>
<a href="https://github.com/1764712542/Deepseek-Harness-EAC-Mac/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-2EA44F?style=flat" alt="MIT License"></a>
</p>

<p>把官方 <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a>（<code>@deepseek-ai/dsh</code>，一切皆插件的 agent harness）
封装为<strong>开箱即用的 macOS 桌面客户端</strong>，支持 Apple Silicon (arm64)，双击即用。</p>

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

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🐳 **鲸鱼娘宠物** | 悬浮在 Web UI 上的动画宠物，空闲呼吸、随机动作 |
| 🎨 **10 款主题皮肤** | Blue Fantasy / Dragon Heir / Maid Atelier / Miku / Minecraft 等 |
| 🛒 **双插件市场** | Zat 市场（GitHub 检索）+ WebUI Market（精选目录） |
| 📝 **会话管理** | 对话归档、回退编辑、搜索 |
| 🎭 **第三方推理** | OpenRouter / Ollama 等多模型适配 |
| 🐟 **大肥鱼** | 桌面悬浮动画 |
| 🔧 **25+ 内置插件** | 侧边栏增强、消息回溯、导航栏、字体自定义等 |
| 🖥️ **macOS 原生** | 原生标题栏、Cmd+Q/Cmd+R 快捷键、Dock 集成 |

---

## 📦 安装

### 下载

从 [Releases](https://github.com/1764712542/Deepseek-Harness-EAC-Mac/releases) 页面下载最新版本。

### 安装步骤

1. 下载 `Deepseek-Harness-EAC-Mac-v1.0.0-mac-arm64.zip`
2. 解压 zip 文件
3. 将 `Deepseek Harness EAC.app` 拖入 `/Applications` 文件夹
4. **首次打开**：右键点击应用 → 选择「打开」→ 在弹窗中点击「打开」

> ⚠️ 首次运行可能需要在「系统设置 → 隐私与安全性」中允许运行

---

## 🚀 使用

1. 启动应用后会自动打开内置浏览器窗口
2. 在设置中配置你的 API Key
3. 开始对话！

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `⌘ + Q` | 退出应用 |
| `⌘ + R` | 重新加载 |
| `⌥ + ⌘ + I` | 开发者工具 |
| `⌃ + ⌘ + F` | 全屏 |

---

## 🔧 开发

### 环境要求

- Node.js 22+
- pnpm
- macOS 13.0+

### 构建

```bash
# 安装依赖
cd dsh-desktop
pnpm install

# 构建 macOS 版本
pnpm dist:mac:arm64
```

### 项目结构

```
Deepseek-Harness-EAC-Mac/
├── dsh-desktop/
│   ├── main.js              # Electron 主进程（macOS 适配）
│   ├── preload.js           # 预加载脚本（原生标题栏 + IPC 桥接）
│   ├── assets/
│   │   ├── plugins/         # 内置 EAC 插件
│   │   └── skins/           # 10 款主题皮肤
│   ├── electron-builder.yml # macOS 打包配置
│   └── package.json
├── README.md
└── LICENSE
```

---

## 🐛 已知问题

- **终端插件**：`dsh-better-sidebar` 的终端 chunk 在首次加载时可能需要重试
- **koffi 预检**：macOS 上 koffi FFI 预检会失败（预期行为，不影响功能）
- **客户端自动更新**：macOS 版暂不支持自动更新，请通过 Releases 手动更新

---

## 📝 更新日志

### v1.0.1 (2026-08-21)

- 🐛 **修复** `ensureDesktopProfileInit()` 中 `home` 变量未声明导致的 ReferenceError（每次启动必现）
- 🐛 **修复** `.credentials.yaml` 权限安全检查：644 → 600（导致 dsh web 进程反复崩溃进入救援模式）
- 🐛 **修复** `dsh-better-sidebar` 终端 chunk 加载失败（"client module system unavailable" 无限重试）— 新增模块系统 polling 等待机制，解决 auto-terminal 时序竞争
- 🐛 **修复** `dsh-better-sidebar` `moduleSystem()` 增加结果缓存，避免重复探测开销

### v1.0.0 (2026-08-21)

- 🎉 首次发布 macOS 版本
- ✅ 移植全部 25+ 内置插件
- ✅ 移植 10 款主题皮肤
- ✅ macOS 原生标题栏集成
- ✅ Cmd+Q / Cmd+R 等 macOS 标准快捷键
- ✅ Dock 集成（关闭窗口保持后台运行）
- ✅ 修复模块解析（schemastery symlink 补建）
- ✅ 修复客户端模块表兼容（dsh-client-web-react shim）

---

## 📄 License

MIT — 基于 [Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) 二次开发。
