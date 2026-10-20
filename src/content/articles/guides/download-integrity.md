---
title: 客户端下载与校验教程：从发布页到 SHA256 核对
description: 从项目维护者、版本标签与安装包类型确认下载来源，再用本地哈希检查文件一致性，区分校验通过与软件可信。
section: guides
slug: download-integrity
published: '2026-10-19'
updated: '2026-10-19'
tags: ["客户端", "安装", "校验"]
sources:
  - https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
  - https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.6
---

下载客户端时，先确认自己进入的是项目官方发布页，再选择设备对应的安装资产。文件能打开、名字像官网或哈希一致，都不能单独完成身份核验。本教程以 Windows 的只读文件校验为例，不要求关闭安全防护。

## 第一步：建立可追溯的下载路径

从项目文档中的仓库链接进入 Releases，记录仓库所有者、版本标签和发布时间。避免从搜索广告直接下载同名安装器。发布页的源代码压缩包与面向用户的安装包可能同时存在，不能只选择列表第一项。已有订阅也不会自动决定该装哪款软件，先确认配置格式兼容。

## 第二步：确认设备与文件类型

核对系统名称、CPU 架构与安装方式。Windows、macOS、Linux 的资产不能混用；x64 与 arm64 也应按设备和项目说明选择。把完整文件名与大小记下来，例如 `client-x64-installer.exe` 只是本文演示名称，并不是某项目的真实下载链接。进一步的系统使用流程见[Windows 指南](/guides/windows/)。

## 第三步：计算本地文件摘要

在存放安装包的目录打开 PowerShell，使用下面的只读命令，替换成实际文件名：

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath '.\client-installer.exe'
```

把结果中的 Hash 与同一版本、同一资产对应的官方摘要逐字符比较。不要把本地结果与论坛转载的另一个版本比较，也不要只看开头几个字符。若发布方没有提供摘要，不应自己生成一个数字后声称已验证官方一致性。

## 怎样解释校验结果

一致说明本地文件与所对照摘要对应的数据一致；可信度仍依赖摘要来源。若不一致，停止安装，先确认是否选错版本、下载不完整或对照了另一个系统的资产。不要通过修改文件或跳过校验来消除差异，也不要把安全软件提示简单归因于误报。

## 完成后的记录与退出条件

保存不含私人信息的版本标签、资产名称、下载来源和校验结果。只有来源、设备类型与校验条件都对应时，才继续项目提供的安装流程。若身份链仍不清楚，可以保留已知可用版本，按[地址来源核对方法](/blog/verify-address/)继续查证，而不急于运行安装器。
