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
{% include components/index-hero-banner.html hero=page.hero %}

<!-- Recent Activities Section -->
<section class="recent-activities-section">
  <div class="container">
    <h2 class="section-title">近期活动</h2>
    <div class="activities-list">
      {% for activity in site.activities %}
        {% include components/activity-item.html activity=activity%}
      {% endfor %}
    </div>
  </div>
</section>

<!-- Previous Works Preview Section -->
<section class="prev-works-preview-section">
  <div class="container">
    <h2 class="section-title">往期作品</h2>
    <div class="preview-works-grid">
      {% assign preview_works = site.works | sort: 'work_details.date' | reverse %}
      {% for work in preview_works limit: 3 %}
          <a href="{{ work.url | relative_url }}" class="work-link">
            {% include components/card.html
               image=work.work_details.poster_image
               date=work.work_details.date
               title=work.work_details.title
            %}
          </a>
      {% endfor %}
    </div>
    <div class="view-more-section">
      <a href="{{ '/prev-work' | relative_url }}" class="view-more-button">查看更多</a>
    </div>
  </div>
</section>
