---
layout: about
js: about.js
title: About
permalink: /about/
photos:
  - title: "这个男人来自地球"
    asset: "/assets/imgs/works/the-man-from-earth/poster.png"

  - title: "玩偶之家2：娜拉归来"
    asset: "/assets/imgs/works/dolls-house/poster.png"

  - title: "每一件美好的小事"
    asset: "/assets/imgs/works/every-brilliant-thing/poster.png"

  - title: "艺术"
    asset: "/assets/imgs/art.png"

  - title: "风声"
    asset: "/assets/imgs/the-message.png"

  - title: "断手斯城"
    asset: "/assets/imgs/behanding.png"
---

<!-- Hero Banner Section Placeholder--> 
<section class="hero-banner">
  <div class="hero-overlay">
  </div>
</section>

<!-- Main Content -->
<main class="about-main">
  <div class="container">
  <div id="threeUpCarousel" class="carousel slide" data-bs-ride="carousel">
    <!-- 🖼️ groups of three -->
    <div class="carousel-inner">
      {% for photo in page.photos %}
        {% assign mod3 = forloop.index0 | modulo: 3 %}
        {% if mod3 == 0 %}
          <div class="carousel-item{% if forloop.index0 == 0 %} active{% endif %}">
            <div class="row g-3">
        {% endif %}
          {% include components/album.html 
              asset=photo.asset 
              title=photo.title 
          %}
        {% assign next_index = forloop.index0 | plus: 1 %}
        {% assign next_mod3 = next_index | modulo: 3 %}
        {% if next_mod3 == 0 or forloop.last %}
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
    <!-- ◀ / ▶ controls -->
    <button class="carousel-control-prev" type="button"
            data-bs-target="#threeUpCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button"
            data-bs-target="#threeUpCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
</main>