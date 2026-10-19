# 全站动漫背景

制作方式：内置 image_gen 生成原创插画。WebP 编码和移动端裁切使用 Sharp；不更改插画内容。

## 使用文件

- public/images/anime-sky.webp：桌面与平板背景。
- public/images/anime-sky-mobile.webp：移动端背景。
- src/styles/anime-theme.css：全站景观、浅色阅读底板与云层缓慢飘动。
- 原始 PNG 另保存于交付 outputs/anime-background-original.png。

背景在所有页面共享，不影响正文 HTML。插画天空与海岸分层，天空中的原有云朵缓慢移动，海岸和远山保持稳定；另有三层形态清晰的云朵以不同速度持续飘过。导航栏云朵按钮可以暂停或播放。系统开启减少动态效果时默认暂停，读者可主动点击播放。

## 最终生成提示词（原文）

Use case: stylized-concept. Asset type: a single original full-viewport background illustration for a Chinese editorial blog, not a mockup or screenshot. Primary request: beautiful hand-painted anime animation background, tranquil sky and distant landscape, no characters. Scene: a luminous blue summer sky with large painterly cumulus clouds, gentle warm peach light near the horizon, distant blue-green mountains and a small serene seaside town with a few warm terracotta rooftops along the very bottom and outer corners. Composition: wide landscape, approximately 16:9, high resolution, upper 70 percent mostly open sky with generous quiet negative space; details concentrated along bottom and outer edges because readable website content will overlay the center. Style: polished Japanese animation background painting, delicate gouache-like brush texture, soft atmospheric perspective, crisp but gentle cloud shapes, inviting and calm. Palette: airy azure and pastel periwinkle, creamy white clouds, subtle peach and muted mint, suited to navy text and blue buttons on translucent white panels. Constraints: no people, no anime girls, no aircraft, no mascots, no text, no letters, no logos, no watermarks, no user interface, no border, no collage, not photorealistic. Produce the background art only.
