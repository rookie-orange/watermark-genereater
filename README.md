# 照片水印生成器

一个简单易用的在线照片水印生成工具，可以为您的照片添加自定义水印。

## 功能特点

- 上传照片：支持拖拽上传或点击选择图片
- 自定义水印：可以自由设置水印文本、位置、透明度、颜色、大小和旋转角度
- 实时预览：实时查看水印效果
- 一键下载：生成水印后，一键下载处理后的图片
- 本地处理：所有处理在本地完成，不会上传您的照片到服务器

## 技术栈

- React 19
- TypeScript
- Tailwind CSS 4
- Redux Toolkit
- React Router
- Vite

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
src/
├── assets/         # 静态资源
├── components/     # 通用组件
├── hooks/          # 自定义 hooks
├── pages/          # 页面组件
├── router/         # 路由配置
├── store/          # Redux store
├── utils/          # 工具函数
├── App.tsx         # 应用入口组件
├── main.tsx        # 应用入口文件
└── index.css       # 全局样式
```

## 使用说明

1. 在首页点击"选择图片"按钮或拖拽图片到上传区域
2. 在编辑页面自定义水印设置
3. 点击"生成水印"按钮生成带水印的图片
4. 点击"下载图片"按钮下载处理后的图片

## 许可证

MIT
