---
layout: home
title: "非鱼剧社"
hero:
  title: "萨勒姆的女巫"
  date: "2025年11月8日 2:00PM"
  event_datetime: "2025-11-08T14:00:00-07:00" # ISO format with timezone
  location: "SJSU Hammer Theatre, San Jose, CA"
  background_image: "/assets/imgs/hero-banner.png"
---

<!-- Hero Banner Section -->
<!-- Hero Banner Section -->
<section class="hero-section">
  <div class="hero-background" style="background-image: url('{{ page.hero.background_image }}');">
    <div class="hero-overlay">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ page.hero.title }}</h1>
          <div class="hero-meta">
            <p class="hero-date">{{ page.hero.date }}</p>
            <p class="hero-location">地点：{{ page.hero.location }}</p>
          </div>
          <a href="/tickets" class="hero-cta-button">点击购票</a>
          
          <!-- Real Countdown Timer -->
          <div class="countdown-section">
            <p class="countdown-label">距离演出还有时间:</p>
            <div class="countdown-timer" data-event-date="{{ page.hero.event_datetime }}">
              <div class="countdown-item">
                <span class="countdown-number" id="days">00</span>
                <span class="countdown-unit">天</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-number" id="hours">00</span>
                <span class="countdown-unit">小时</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-number" id="minutes">00</span>
                <span class="countdown-unit">分</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-number" id="seconds">00</span>
                <span class="countdown-unit">秒</span>
              </div>
            </div>
            <div class="countdown-message" id="countdown-message" style="display: none;">
              <p>演出已开始！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Recent Activities Section -->
<section class="recent-activities-section">
  <div class="container">
    <h2 class="section-title">近期活动</h2>
    <div class="activities-list">
      {% for activity in site.activities %}
        <article class="activity-item">
          <div class="activity-image">
            <img src="{{ activity.image }}" alt="{{ activity.title }}">
          </div>
          <div class="activity-content">
            <div class="activity-date">{{ activity.date_str }}</div>
            <h3 class="activity-title">{{ activity.title }}</h3>
            <p class="activity-location">地点：{{ activity.location }}</p>
            <p class="activity-description">{{ activity.description }}</p>
            <a href="{{ activity.link }}" class="activity-cta">点击查看</a>
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<!-- Previous Works Preview Section -->
<section class="prev-works-preview-section">
  <div class="container">
    <h2 class="section-title">往期作品</h2>
    <div class="preview-works-grid">
      {% assign preview_works = site.works | limit: 3 %}
      {% for work in preview_works %}
        <!-- {% if work.work_details %} -->
          <a href="{{ work.url | relative_url }}" class="work-link">
            {% include components/card.html 
               image=work.work_details.poster_image 
               date=work.work_details.date 
               title=work.work_details.title 
            %}
          </a>
        {% endif %}
      {% endfor %}
    </div>
    <div class="view-more-section">
      <a href="{{ '/prev-work' | relative_url }}" class="view-more-button">查看更多</a>
    </div>
  </div>
</section>
