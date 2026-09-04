---
title: "使用 Next.js 搭建个人博客"
slug: "nextjs-blog"
date: "2026-09-01T14:12:27.329Z"
category: "技术笔记"
tags:
  - "Next.js"
  - "Tailwind CSS"
  - "TypeScript"
excerpt: "技术笔记：从零搭建个人博客的技术选型与实现。"
cover_image: "/uploads/1788376875964-10w0mq.webp"
---

# 使用 Next.js 搭建个人博客

我决定为自己造一间可以安静写字的小屋。它不必华丽，但要有风、有光，也要有可以翻动的书页。

从零开始，我选择了这些工具，一步一步搭起这座博客。

## 筑基

Next.js App Router 是整座小屋的骨架，React 与 TypeScript 为它注入血脉，Tailwind CSS 则调和出温柔的颜色。

## 文字与排版

TipTap 是我落笔的砚台，Markdown 是文字的肌理，react-markdown 与 rehype-highlight 让每一段代码都清晰可读。

## 数据与记忆

SQLite 与 better-sqlite3 安放着我的日记；若有一天走向云端，Postgres 与 Vercel Postgres 也能接续这份记忆。

图片由 sharp 压缩后存放在本地 uploads，或交给 Vercel Blob 保管。

## 身份与门锁

jose 与 bcryptjs 守护着只属于我的那扇门。

## 展示与长存

写完的文字，会通过导出脚本静静走向 GitHub Pages，让静态的小站长期开放；PM2 则在本地守护着写作的后台。

> 愿这一路写下的字，
> 都能像潮水一般，
> 找到属于它的岸。

这就是我的技术栈，也是我为自己搭建的，一座会呼吸的博客。

