# FeiyuTheater
非鱼剧社官方网站

# 资源
- 🎨 最终设计文件去这里找: [设计文件网盘地址](https://drive.google.com/file/d/13Palsyuoxjm9LEBVaG8Hfr_geA9Atpet/view?usp=sharing)
- 📝 计划与分工：[Notion页面](https://www.notion.so/bodong/21637fe020f38061ab33dfb9d4840dea?v=21637fe020f380b9ba8b000cf01fe1c6&source=copy_link)

# 维护建议与标准
- Branch命名规格：`dev/<name>/<feature-name>`
- 每个PR尽量小，比如现在我要implement主页，可能一个change只改layout，一个change改CSS。或者一个PR中包含几个commits，每个commit对应一种change（比如layout，css）
- 在一开始不太熟悉Jekyll，HTML和CSS的时候，可以尽量多做小的change，然后开PR，收集反馈
- 逻辑相同的change需要在一个commit里，所以如果你反复做了不同的修改，则需要squash （`git rebase -i HEAD~4`）这个操作就会让你选择在最新的4个commits里哪个要squash
- 没有素材文件的话，比如一些图片（稍后会更新），就用纯色背景代替。
- implement的时候尽量多想各元素之间的层级关系，比如我现在看到了左右两边margin比较大，需要考虑是这个元素（DOM）的问题，还是它Parent DOM的问题
- 多多利用浏览器的开发模式调试，可以可视化每个元素的位置，CSS等

# 内容更新教程
在话剧演出后，由制作人或宣传团队更新演出内容。只需要为新的演出建立一个新的文件，网站就会随之更新，详细步骤如下：
1. 先基于`main` branch创建一个git branch，命名规则为`update/<author-name>/<project-name>`。比如：`update/boning/the-man-from-earth`。
2. 在`collections/_works/`中建立一个新的`.md`文件，用年份+季节+剧的名字命名，e.g. `2025-spring-dolls-house.md`（可以参考其他文件）。
3. 文件中需要更新的内容是一些key value pairs，建议复制一份其他文件基于现有的内容修改。注意文件中前后两个`---`是必须的，不能省略。这里解释其中一些key的使用方法：
  ```
  ---
  hidden: true                          <=== "(optional) 如果因为一些原因需要隐藏得加上这个"
  layout: work-detail                   <=== "这里必须是work-detail"
  title: "玩偶之家2:娜拉归来"              <=== "话剧名称，显示在网页中"
  sort_by_date: "2025-07-25"            <=== "演出首日，用于给往期作品排序，请使用YYYY-MM-DD格式，必须要有"
  work_details:                         <=== "影响'作品详情'页的内容"
    title: "玩偶之家2:娜拉归来"            <=== "话剧名称，显示在'作品详情'页中，一般与上边的title相同"
    location: "地球的某个地方"            <=== "(optional) 演出地点"
    dates:                              <=== "(recommended) 演出日期列表，请使用YYYY-MM-DD格式"
      - "2025-07-25"
      - "2025-07-26"
    date: "某个时间"                     <=== "(optional) 旧格式，单场演出可用；如果有dates会优先显示dates"
    banner_image:                       <=== "横版图片链接，为了网站效果专业统一，必须要有"
    poster_image:                       <=== "竖版海报图片链接，建议接近3:4比例，为了网站效果专业统一，必须要有"
    brochure:                           <=== "(optional) 场刊文件链接，可以是PDF，也可以是图片链接列表"
    introduction: "了不起的玩偶之家故事"    <=== "剧目详细介绍"
    production_team:                     <=== "演职员团队信息"
      - page_title: "主要演员"            <=== "为了分类显示，每类演职员需要写好类"
        members:
          - name: "主演1"
            person: "演员姓名"
            role: "角色名称"
          - name: "主演2"
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
            person: "了不起的灯光"
            role: "灯光负责人"
    youtube_video: "mee4gJM3kls"         <=== "(optional) Youtube视频，click share，选embed， 复制'https://www.youtube.com/embed/'之后'?'之前的字符串"
    photos:                              <=== "照片array，为了效果推荐至少放6张照片，包括演出照片三种，合照，现场照片等"
      - image: ""                        <=== "照片链接"
        size: "large"                    <=== "照片尺寸可以是"large","medium","small"
        caption: "演出"                   <=== "caption"
      - image: ""
        caption: "谢幕"
        size: "large"
  ---
  ```
4. 填写上述信息时会需要用到图片、场刊等assets。assets要存放到相应的目录下。存好后用相应的路径填写到上述`md`文件里：
  - banner, poster和photos放路径`/assets/imgs/works/<project-name>/<img-name>`
  - 其他文件（如场刊）存放路径`/assets/files/works/<project-name>/<file-name>`
5. 一切就绪后，开一个新的PR，请求审核。PR被approve，merge后内容更新就完成了。

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
