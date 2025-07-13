---
layout: prev-work
title: 往期作品
permalink: /prev-work
---

<!-- Hero Banner Section -->
<section class="hero-banner">
  <div class="hero-overlay">
    <h1 class="hero-title">往期作品</h1>
  </div>
</section>

<!-- Main Content -->
<main class="prev-works-main">
  <div class="container">
    <!-- Works Grid -->
    <div class="works-grid">
      {% for work in site.works %}
        <a href="{{ work.url | relative_url }}" class="work-link">
          {% include components/card.html 
             image=work.work_details.poster_image 
             date=work.work_details.date 
             title=work.work_details.title 
          %}
        </a>
      {% endfor %}
    </div>
  </div>
</main>
