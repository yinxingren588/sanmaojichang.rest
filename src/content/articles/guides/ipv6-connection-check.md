---
title: IPv4 与 IPv6 对照检查：分别查询与观察连接
description: 在不关闭系统双栈功能的前提下，分开记录地址类型和应用表现，避免把单次超时当作 IPv6 故障。
section: guides
slug: ipv6-connection-check
published: '2026-10-19'
updated: '2026-10-19'
tags: ["IPv6", "Windows", "排查"]
sources:
  - https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping
  - https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup
---

怀疑 IPv4 与 IPv6 路径不同，应先做只读对照，不直接关闭整台设备的 IPv6。目标是知道问题是否与地址族有关，而不是用一个永久开关掩盖尚未定位的差异。

## 先确认目标提供哪些地址

按照[DNS 查询教程](/guides/dns-query-baseline/)分别查看 A 与 AAAA 记录。没有 AAAA 记录与有记录但连接失败是不同现象。保持网络、设备与目标一致，并记录客户端状态；浏览器或代理内部解析可能与系统工具不同，结果不能直接互相替代。

## 按地址族观察网络响应

Windows 的 ping 可以指定地址族，下面只作演示：

```text
ping -4 example.com
ping -6 example.com
```

测试目标需要具备相应记录和连通条件。如果目标或路径不响应 ICMP，超时并不能证明网页访问一定失败。不要把这两条命令的结果写成 HTTP、TLS 或所有应用的完整诊断。

## 对照实际应用

接着使用相同网页或任务，查看客户端记录是否包含实际使用的地址类型。如果系统查询有 AAAA，而应用走了另一条解析或代理路径，就不应只用系统命令解释应用表现。一次只换网络或候选节点中的一项，保留原始记录。

## 怎样解释一个差异案例

假设家中网络的 IPv6 查询成功，但相应连接观察失败，而移动热点下结果不同，这提供了继续检查接入环境的线索，并不直接证明服务商全部 IPv6 节点有故障。还需区分本地接入、代理节点和目标服务各自支持的条件。

## 收尾与后续反馈

测试结束不需要清空系统网络设置。若按官方文档临时调整了应用配置，应恢复无效改动。反馈时提供地址族、网络类型、命令结果与应用观察的区别，不公开完整私人地址。需要定位其他阶段时按[连接故障排查](/guides/troubleshooting/)继续，而不是用关闭双栈作为默认结论。
