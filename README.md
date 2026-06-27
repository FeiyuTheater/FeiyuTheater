# FeiyuTheater
非鱼剧社官方网站

# 资源
- 🎨 最终设计文件去这里找: [设计文件网盘地址](https://drive.google.com/file/d/13Palsyuoxjm9LEBVaG8Hfr_geA9Atpet/view?usp=sharing)
- 📝 计划与分工：[Notion页面](https://www.notion.so/bodong/21637fe020f38061ab33dfb9d4840dea?v=21637fe020f380b9ba8b000cf01fe1c6&source=copy_link)

# 维护建议与标准
- Branch命名规格：`update/<author-name>/<show-name>-<content-type>`，其中`content-type`视情况使用`banner`、`news-<number>`、`prev-work`等。
- 每个PR尽量小，比如现在我要implement主页，可能一个change只改layout，一个change改CSS。或者一个PR中包含几个commits，每个commit对应一种change（比如layout，css）
- 在一开始不太熟悉Jekyll，HTML和CSS的时候，可以尽量多做小的change，然后开PR，收集反馈
- 逻辑相同的change需要在一个commit里，所以如果你反复做了不同的修改，则需要squash （`git rebase -i HEAD~4`）这个操作就会让你选择在最新的4个commits里哪个要squash
- 没有素材文件的话，比如一些图片（稍后会更新），就用纯色背景代替。
- implement的时候尽量多想各元素之间的层级关系，比如我现在看到了左右两边margin比较大，需要考虑是这个元素（DOM）的问题，还是它Parent DOM的问题
- 多多利用浏览器的开发模式调试，可以可视化每个元素的位置，CSS等

# 内容更新教程
内容更新主要分三类：页首横幅、近期活动、往期作品。开始前建议先基于`main` branch创建一个git branch，命名规则为`update/<author-name>/<show-name>-<content-type>`。

Branch命名示例：
- `update/boning/god-of-carnage-banner`
- `update/boning/god-of-carnage-news-1`
- `update/boning/god-of-carnage-news-2`
- `update/boning/god-of-carnage-prev-work`

## 页首横幅
页首横幅对应网站首页第一屏的主推内容，配置在`index.markdown`的`hero:`字段下。这里的信息以页首横幅为准，不依赖其他页面自动反推。页首横幅一般用于显示每部戏的开票信息；只要填写一次，后续状态会自动变化，比如早鸟结束后倒计时自动消失，演出结束后购票链接自动消失，并根据配置显示落幕或回顾入口。

需要更新的常用字段：

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
    - status: "active"
      text: "周日场购票"
      link: "https://..."
  location: "Starbright Theater, Campbell"
  background_image: "/assets/imgs/goc-hero-banner.png"
```

字段说明：
- `title`、`date`、`location`、`background_image`控制横幅的主要展示内容。
- `countdown_title`和`countdown_datetime`同时存在时会显示倒计时；超过`countdown_datetime`后倒计时会自动消失。不需要倒计时时可以注释掉这两个字段。
- `buttons`控制购票或其他行动按钮。需要一个按钮时也可以使用旧格式`button_status`、`button_text`、`button_link`。
- `performance_end_datetime`控制何时从购票状态切换到落幕状态，请填写最后一场演出结束时间，格式为ISO 8601并带时区。
- 如果有`review_link`，超过`performance_end_datetime`后按钮显示`已落幕 | 点此回顾`并链接到对应往期作品；如果没有`review_link`，按钮显示不可点击的`演出已落幕`。
- 横幅图片等素材建议放在`/assets/imgs/`或更具体的子目录中，再用绝对路径引用。

## 近期活动
近期活动显示在首页“近期活动”区域，数据来自`collections/_activities/`。这些内容一般和公众号推文同步发布，由制作人决定是否放到网站上；建议选择比较重要的动态放上来，让网站看起来活动更丰富、更可信。首页默认只显示最新3条，用户点击“查看更多”后每次再展开3条。

1. 在`collections/_activities/`中建立一个新的`.md`文件，用日期、季节、活动主题命名，比如：`2026-spring-god-of-carnage-ticketing.md`。
2. 将活动封面图放到`/assets/imgs/news/`或更具体的子目录中。
3. 在新的`.md`文件中填写以下信息。

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

字段说明：
- `title`是活动标题。
- `date_str`用于排序和展示，建议使用`YYYY-MM-DD`格式。
- `location`是活动地点；如果是线上推文，也可以填写相关地点或活动名称。
- `image`是首页活动卡片封面图。
- `description`是活动摘要，首页会截断显示。
- `link`是点击“点击查看”后的目标链接，通常是公众号文章、票务页面或站内页面。

## 往期作品
往期作品对应剧目回顾页。只需要为新的演出建立一个新的文件，网站就会自动把它加入“往期作品”页面和首页的往期作品预览。

1. 在`collections/_works/`中建立一个新的`.md`文件，用年份、季节、剧名命名，比如：`2026-spring-god-of-carnage.md`。
2. 将剧照、banner、海报放到`/assets/imgs/works/<project-name>/`。
3. 将场刊等非图片文件放到`/assets/files/works/<project-name>/`。
4. 在新的`.md`文件中填写以下信息。注意文件前后的`---`不能省略。

```yaml
---
hidden: true
layout: work-detail
title: "玩偶之家2:娜拉归来"
sort_by_date: "2025-07-25"
work_details:
  title: "玩偶之家2:娜拉归来"
  location: "地球的某个地方"
  dates:
    - "2025-07-25"
    - "2025-07-26"
  date: "某个时间"
  banner_image: "/assets/imgs/works/<project-name>/banner.jpg"
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
        - name: "制作人"
          person: "制作人姓名"
        - name: "导演"
          person: "导演姓名"
    - page_title: "后台"
      members:
        - name: "灯光"
          person: "灯光负责人"
  youtube_video: "mee4gJM3kls"
  photos:
    - image: "/assets/imgs/works/<project-name>/photo_1.jpg"
      size: "large"
      caption: "演出"
    - image: "/assets/imgs/works/<project-name>/photo_2.jpg"
      size: "medium"
      caption: "谢幕"
---
```

字段说明：
- `hidden`是可选项。如果想先提交内容但暂时不展示，可以设为`true`。
- `layout`必须是`work-detail`。
- `title`和`work_details.title`是剧目名称，通常保持一致。
- `sort_by_date`用于排序，请填写演出首日，格式为`YYYY-MM-DD`。
- `dates`推荐使用日期列表，格式为`YYYY-MM-DD`；如果有`dates`，页面会优先显示`dates`。
- `banner_image`是详情页顶部横版图片，建议必须提供。
- `poster_image`是往期作品卡片和详情页海报，建议使用接近3:4比例的竖版海报。
- `brochure`是可选场刊链接，可以是PDF，也可以是图片链接列表。
- `photos`建议至少6张，`size`可以是`large`、`medium`、`small`。
- `youtube_video`是可选项。填写YouTube embed链接中`/embed/`之后、`?`之前的ID。

一切就绪后，开一个新的PR，请求审核。PR被approve并merge后，内容更新就完成了。

# 维护教程
## 🧑🏻‍💻 环境配置
可以参考[Notion文档](https://www.notion.so/bodong/Skeleton-Bringup-21637fe020f38047a325dcd759ae7829?source=copy_link)。

### 在MacOS下配置Ruby环境
MacOS系统自带Ruby环境，但版本较低。推荐通过以下步骤安装`ruby-3.1`：
1. 下载并安装`rvm`：在Bash shell里运行
   ```bash
   \curl -sSL https://get.rvm.io | bash
   ```
   安装完成后将`rvm`加入`$PATH`：
   ```bash
   export PATH="${PATH}:/Users/YOUR_USER_NAME/.rvm/bin"
   ```
2. 安装`ruby-3.1`：
   ```bash
   rvm install ruby-3.1

   # The following command has to be run in a login shell.
   # Use `/bin/bash --login` to start a login shell.
   # Add `source ~/.rvm/scripts/rvm` to your .bashrc to ensure that
   # the updated ruby is used upon shell startup.
   rvm --default ruby-3.1

   # after install, check if the local install is used
   # it should show ~/.rvm/rubies/<version>/
   which ruby
   command which gem
   ```
3. 安装`bundler`和`jekyll`：
   ```bash
   gem install bundler jekyll
   bundle update
   ```
4. 确认安装完成：在本代码库中运行
   ```bash
   bundle exec jekyll serve --livereload
   ```
   将会启动本地服务器`http://127.0.0.1:4000/`。在浏览器中打开这个地址即可看到当前网页部署。

## 📚 基础知识
### 关于Jekyll
- 一般下划线开头的文件夹是Jekyll这个框架预留使用的。
- 运行Jekyll后，会生成一个`_site`文件夹，里边主要是Jekyll最终生成的网站。注意别编辑这个文件夹。也别上传到github上。

### 其它知识
大家可以用AI自行学习一下以下知识，宏观上了解下做什么用的，咱们这个网站都会用到：
- JQuery
- Boostrap
  - 务必了解一下Layout Grid
- SCSS
- Jekyll ([step-by-step guide](https://jekyllrb.com/docs/step-by-step/01-setup/))
  - Includes
  - Collections

## 📋 网站框架与内容
### 网站元素
- 可以重复使用的元素放在`_includes`文件夹下。
这里展示了一个比较好的文件夹结构
```
your-jekyll-site/
├── _includes/
│   ├── components/
│   │   ├── button.html
│   │   ├── card.html
│   │   ├── modal.html
│   │   └── navigation/
│   │       ├── navbar.html
│   │       └── breadcrumb.html
│   ├── layout-parts/
│   │   ├── head.html
│   │   ├── nav.html
│   │   ├── footer.html
│   │   └── projects/
│   │       └── project-specific-part.html
│   └── utilities/
│       ├── date-formatter.html
│       └── social-share.html
├── _layouts/
├── _sass/
│   └── components/
│       ├── _button.scss
│       ├── _card.scss
│       └── _modal.scss
└── assets/
```

### 网站布局
- 网站的布局是通过`_layouts`文件夹下的文件来实现的。相比于`_includes`文件夹，`_layouts`下的布局文件更宏观。一般对应到网页的具体页面。

### 内容更新
- 所有网站实时更新的内容（比如往期活动、最新动态等）都在`collections`文件夹下。
- `collections`文件夹下的子文件夹对应是网站的板块, 比如`_projects`对应“往期作品”，`_news`对应主页的banner和最新动态等。
- `collections`子文件夹里的内容一般是Markdown文件，这个文件往往包含了metadata（比如标题、作者、日期等）和正文（比如正文内容、图片等）。

### 网站素材
- 网站素材放在`assets`文件夹下。
- 不同于`collections`，这里主要放素材，比如图片、CSS、JS等。

## 🎨 代码风格
## 基本风格
- 用4个space作为tab
- 所有的folder structure尽量有逻辑性，反应hierarchy关系。

## 关于如何使用Bootstrap
- 如果可以用Bootstrap，尽量别用自带的CSS （比如CSS可以用margin来控制边框空白的大小，但是可以直接用Bootstrap的m-1，m-2之类的话就直接用）
- 不要在特定的元素上直接堆叠Bootstrap的类，而是利用SCSS的`@extend`来把Bootstrap类加到特定的类上。下面的例子对比了两种代码风格：
```html

<!-- ❌ Bad Example
Assume we have a SCSS class:
.banner {
    background-color: #f8f9fa;
}
-->
<div id="banner" class="d-flex align-items-center justify-content-center">
    <h1 class="title mb-4">Title</h1>
</div>

<!-- ✅ Good Example
Assume we have a SCSS class:
.banner {
    background-color: #f8f9fa;
    @extend .d-flex;
    @extend .align-items-center;
    @extend .justify-content-center;
}
-->
<div id="banner" class="banner">
    <h1 class="title mb-4">Title</h1>
</div>
```
