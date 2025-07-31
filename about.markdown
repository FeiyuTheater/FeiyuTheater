---
layout: about
js: about.js
title: 关于我们
permalink: /about
photos:
  - title: "演出照片：2019-灵魂拒葬"
    asset: "/assets/imgs/about_page/2019-bury-the-dead.jpg"

  - title: "演出照片：2024-每一件美妙的小事"
    asset: "/assets/imgs/about_page/2024-every-brilliant-thing.jpeg"

  - title: "演出照片：2025-玩偶之家2"
    asset: "/assets/imgs/about_page/2025-dolls-house.JPG"

  - title: "演出照片：2020-茶话会"
    asset: "/assets/imgs/about_page/2020-tea-talk.jpg"

  - title: "排练花絮：2022-金锁记"
    asset: "/assets/imgs/about_page/2022-the-golden-cangue.JPG"

  - title: "剧组合影：2021-有客来访三则"
    asset: "/assets/imgs/about_page/2021-san-ze.JPG"
---

<!-- Hero Banner Section -->
{% include hero-banner.html
    background="/assets/imgs/about_page/banner.png"
    content='<div class="hero-logo"><img src="/assets/imgs/logo.png" alt="Feiyu Theater Logo"></div>'
%}

<!-- Main Content -->
<main class="about-main">
  <div class="container text-center">
    <h1 class="about-title">关于我们</h1>

    <div class="about-content">
      <p>非鱼剧社于2015年春季成立于斯坦福大学，由一群热爱话剧的中国学生创建，是斯坦福校园内首个中文话剧社。目前，非鱼剧社已发展为湾区最有影响力的非营利性中文剧社和文化品牌之一。在纷繁复杂或平淡单一的生活外，非鱼剧社再造出一个世界来。生活烦琐，人性纠葛，哲思深渊，命运曲折，都被我们搬到了舞台上。在这里，你将体验不同的人生，分享精彩的故事，找到纷繁烟尘中埋藏的自我。</p>
    </div>

    <div class="about-quote">
      <blockquote>
        “以戏剧探索人性，用创作连接彼此”
      </blockquote>
    </div>

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

    <h1 class="about-title" id="support-us">支持我们</h1>

    <div class="about-content">
      <p>无论是个人捐款，或企业与组织的赞助，您的支持都是非鱼剧社持续创作与成长的动力。诚邀您加入，共同推动戏剧艺术的发展！</p>
    </div>

    <!-- Support Buttons -->
    <div class="support-buttons">
      <a href="#" class="support-button">
        <div class="button-image">
          <img src="/assets/imgs/about_page/icon_sponsorship.png" alt="商业赞助">
        </div>
        <div class="button-caption">商业赞助</div>
      </a>

      <a href="#" class="support-button">
        <div class="button-image">
          <img src="/assets/imgs/about_page/icon_individual_donation.png" alt="个人捐款">
        </div>
        <div class="button-caption">个人捐款</div>
      </a>

      <a href="#" class="support-button">
        <div class="button-image">
          <img src="/assets/imgs/about_page/icon_collaboration.png" alt="志愿服务">
        </div>
        <div class="button-caption">合作意向</div>
      </a>
    </div>
  </div>
</main>
