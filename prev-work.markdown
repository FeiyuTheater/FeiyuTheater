---
layout: default
title: 往期作品
permalink: /prev-work
works:
  - title: "这个男人来自地球"
    image: "/assets/imgs/the-man-from-earth.png"
    date: "2025年1月"

  - title: "玩偶之家2：娜拉归来"
    image: "/assets/imgs/a-dolls-house.png"
    date: "2024年12月"

  - title: "每一件美好的小事"
    image: "/assets/imgs/every-brilliant-thing.png"
    date: "2024年11月"

  - title: "艺术"
    image: "/assets/imgs/art.png"
    date: "2024年10月"

  - title: "风声"
    image: "/assets/imgs/the-message.png"
    date: "2024年9月"

  - title: "断手斯城"
    image: "/assets/imgs/behanding.png"
    date: "2024年8月"
---
<!-- Header Include -->

{%include header.html %}

<!-- Hero Banner Section -->
<section class="hero-banner">
  <div class="hero-overlay">
    <h1 class="hero-title">往期作品</h1>
  </div>
</section>

<!-- Navigation Include -->

{% include nav.html %}

<!-- Main Content -->
<main class="prev-works-main">
  <div class="container">
    <!-- Works Grid -->
    <div class="works-grid">
      {% for work in page.works %}
        {% include components/card.html 
           image=work.image 
           date=work.date 
           title=work.title 
        %}
      {% endfor %}
    </div>
  </div>
</main>

<!-- Footer Include -->

{% include footer.html %}
