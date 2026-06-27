# AGENTS.md

This file is for AI coding agents working in this repository. Its main purpose is to help future producers update site content with AI assistance.

Focus on content updates unless the user explicitly asks for feature work. The three main content areas are:

1. 页首横幅
2. 近期活动
3. 往期作品

Before editing, read the "内容更新教程" section in `README.md`.

## General Workflow

When a user asks to update content, first identify which content area they mean:

- 页首横幅: homepage hero/banner in `index.markdown`
- 近期活动: homepage activity cards from `collections/_activities/`
- 往期作品: production archive pages from `collections/_works/`

If the user provides files, inspect them and use them directly. Do not ask the user to manually copy files into the repo if you can do it.

Use existing repo patterns. Prefer copying a similar existing `.md` file structure and adapting it.

Do not edit `_site/`. It is generated output.

After content edits, run a local build if possible:

```bash
bundle exec jekyll build
```

If the default Ruby/Bundler environment is broken, use the local working command pattern already used in this repo history if available. Report any environment issue clearly.

## Ask For Needed Materials

If the user has not provided enough information, guide them with a short checklist.

For 往期作品, ask for:

- 剧名
- 演出日期 and venue
- 横版 banner
- 竖版 poster
- 场刊 PDF or images, if available
- 演出照片, ideally 6 or more
- 剧目简介, if not extractable from the program
- 演员和制作团队名单, if not extractable from the program
- YouTube video ID, if available

For 页首横幅, ask for:

- 剧名
- 展示日期文本
- 演出地点
- 横幅背景图
- 购票链接 and button labels
- 早鸟倒计时结束时间, if any
- 最后一场演出结束时间 for `performance_end_datetime`
- 往期作品链接 for `review_link`, if already available

For 近期活动, ask for:

- 活动标题
- 日期
- 地点 or related context
- 封面图
- 简介
- 目标链接, usually WeChat article, ticketing page, or internal page

## Validate Materials

Before using uploaded files, verify that they are suitable.

Images:

- Banner images should be horizontal. Use tools such as `sips -g pixelWidth -g pixelHeight <file>` on macOS.
- Poster images should be vertical, ideally close to 3:4.
- Activity/news images should be visually usable as card thumbnails, preferably square or easy to crop.
- Performance photos should include a good mix: stage photos, curtain call, group photo, audience/site photos if available.
- Keep file extensions honest. Do not copy JPEG content into a `.png` filename.

Files:

- Programs/brochures usually go in `assets/files/works/<project-name>/`.
- Try extracting text from program PDFs to avoid guessing production details.
- If text extraction fails, use the available title/poster/activity copy and clearly state what could not be verified.

Content:

- Avoid inventing cast/crew names, roles, dates, or venues.
- If something is ambiguous, use only confirmed information or ask the user.
- Preserve Chinese punctuation and names as provided.

## 页首横幅

Edit `index.markdown`, under `hero:`.

Common fields:

```yaml
hero:
  title: "杀戮之神"
  date: "2026年5月30日 | 5月31日"
  performance_end_datetime: "2026-05-31T15:30:00-07:00"
  review_link: "/prev-work/2026-spring-god-of-carnage/"
  countdown_title: "距离早鸟票结束还有："
  countdown_datetime: "2026-05-03T22:00:00-07:00"
  buttons:
    - status: "active"
      text: "周六场购票"
      link: "https://..."
  location: "Starbright Theater, Campbell"
  background_image: "/assets/imgs/goc-hero-banner.png"
```

Behavior:

- If `countdown_title` and `countdown_datetime` exist, the countdown shows until `countdown_datetime`, then disappears automatically.
- Before `performance_end_datetime`, configured buttons show.
- After `performance_end_datetime`, ticket buttons disappear.
- If `review_link` exists after the performance ends, the button becomes `已落幕 | 点此回顾`.
- If `review_link` is missing after the performance ends, the button becomes inactive `演出已落幕`.

## 近期活动

Create or edit files in `collections/_activities/`.

Use this structure:

```yaml
---
  title: "非鱼春季又一力作 | 《杀戮之神》开票！"
  date_str: "2026-04-24"
  location: "Starbright Theater, Campbell, CA"
  image: "/assets/imgs/news/god-of-carnage.jpg"
  description: "活动简介，会显示在首页活动卡片中。"
  link: "https://mp.weixin.qq.com/..."
---
```

Notes:

- These often sync with WeChat posts.
- The producer decides which posts matter enough to show.
- Prefer important updates so the site feels active and credible.
- Homepage initially shows the latest 3 activities; users can expand 3 more at a time.

## 往期作品

Create a file in `collections/_works/`, usually named like:

```text
2026-spring-god-of-carnage.md
```

Put assets here:

```text
assets/imgs/works/<project-name>/
assets/files/works/<project-name>/
```

Use this structure:

```yaml
---
layout: work-detail
title: "杀戮之神"
sort_by_date: "2026-05-30"
work_details:
  title: "杀戮之神"
  location: "Starbright Theater, Campbell, CA"
  dates:
    - "2026-05-30"
    - "2026-05-31"
  banner_image: "/assets/imgs/works/<project-name>/banner.jpeg"
  poster_image: "/assets/imgs/works/<project-name>/poster.png"
  brochure: "/assets/files/works/<project-name>/brochure.pdf"
  introduction: "剧目详细介绍"
  production_team:
    - page_title: "演员"
      members:
        - name: "演员"
          person: "演员姓名"
          role: "角色名称"
    - page_title: "制作团队"
      members:
        - name: "导演"
          person: "导演姓名"
    - page_title: "后台"
      members:
        - name: "灯光"
          person: "灯光负责人"
  photos:
    - image: "/assets/imgs/works/<project-name>/photo_1.jpeg"
      size: "large"
      caption: "演出"
---
```

Guidelines:

- `sort_by_date` should be the first performance date and must be `YYYY-MM-DD`.
- Use `dates` for multiple performance dates.
- `banner_image` should be horizontal.
- `poster_image` should be vertical.
- `photos` should ideally include at least 6 images.
- Use `hidden: true` only when the page should not be visible yet.
- If a new archive page is created for the current homepage show, update `index.markdown` `hero.review_link` to point to it.

## Final Checks

Before finishing:

- Confirm all referenced files exist.
- Confirm generated links are correct.
- If a local development environment is available, run `bundle exec jekyll build`.
- Search generated HTML if local build succeeds and it is helpful, for example `_site/index.html` or `_site/prev-work/<slug>/index.html`.
- If no local development environment is available, briefly tell the user you can help guide deployment or local setup if needed.
- Whether or not local build is available, remind the user that after opening a PR, the CI pipeline should provide status and preview information.
- Summarize changed files and any assumptions or missing materials.
