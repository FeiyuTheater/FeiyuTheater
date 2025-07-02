# FeiyuTheater
非鱼剧社官方网站

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
- Jekyll
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
│   │   ├── header.html
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
- 所有网站实时更新的内容（比如往期活动、最新动态等）都在`contents`文件夹下。
- `contents`文件夹下的子文件夹对应是网站的板块, 比如`projects`对应“往期作品”，`news`对应主页的banner和最新动态等。
- `contents`子文件夹里的内容一般是Markdown文件，这个文件往往包含了metadata（比如标题、作者、日期等）和正文（比如正文内容、图片等）。

### 网站素材
- 不同于contents，这里主要放素材，比如图片、CSS、JS等。

## 🎨 代码风格
## 基本风格
- 用4个space作为tab
- 所有的folder structure尽量有逻辑性，反应hierarchy关系。

## 关于如何使用Bootstrap
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