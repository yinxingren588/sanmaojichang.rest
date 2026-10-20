---
title: 用 nslookup 建立 DNS 检查记录：只读查询与结果解释
description: 在 Windows 上查询同一域名的 A 与 AAAA 记录，记录响应阶段，避免把系统查询当作代理应用的完整解析路径。
section: guides
slug: dns-query-baseline
published: '2026-10-19'
updated: '2026-10-19'
tags: ["DNS", "Windows", "排查"]
sources:
  - https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup
---

DNS 排查先保留可复查的查询结果，再决定是否修改设置。下面使用 Windows 的 `nslookup` 做只读检查；它能提供系统查询线索，但不能代表所有浏览器或代理客户端内部使用的解析路径。

## 记录当前网络和目标

写明设备、接入方式、客户端状态与时间。选择自己有权查询的目标域名，避免在公共反馈中公开单位内部名称。本文使用 `example.com` 作为演示域名，实际结果会随服务和时间变化，不预设必须返回某个固定地址。

## 分别查询记录类型

在命令提示符或 PowerShell 中运行：

```text
nslookup -type=A example.com
nslookup -type=AAAA example.com
```

保存所用服务器、是否得到响应、返回记录或错误提示。一次查询失败时先记录原文，不立即连续更换 DNS、节点和网络。查询没有对应类型记录与查询超时，也应分开描述。

## 将观察写成分阶段记录

可以建立“时间、网络、查询类型、结果、客户端状态”五列。比如 A 有响应而 AAAA 没有记录，只说明这次查询的观察，不应直接写成 IPv6 网络故障。若需要比较另一个网络，保持目标与命令一致，再记录第二组结果。

## 与应用访问分开验证

DNS 有响应之后，应用仍可能在连接、证书或目标服务阶段失败。浏览器使用独立解析或客户端内置 DNS 时，`nslookup` 也未必经过相同路径。因此要同时保留应用错误与客户端记录，不能仅凭本命令成功就排除全部解析问题。

## 何时继续，何时停止修改

如果普通网络也无法完成查询，先排查接入；若只有一个应用失败，按[浏览器连接设置](/guides/browser-connection-check/)继续。需要完整故障顺序时阅读[分层排查](/guides/troubleshooting/)。没有明确证据之前，不反复覆盖系统 DNS，也不通过清空所有网络配置代替定位。
