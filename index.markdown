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
      {% assign preview_works = site.works | sort: 'sort_by_date' | reverse %}
      {% for work in preview_works limit: 3 %}
          <a href="{{ work.url | relative_url }}" class="work-link">
            {% if work.work_details.dates %}
              {% assign first_date = work.work_details.dates | first %}
              {% assign first_year = first_date | date: "%Y" %}
              {% assign first_month = first_date | date: "%-m" %}
              {% assign first_day = first_date | date: "%-d" %}
              {% assign formatted_dates = first_year | append: '年' | append: first_month | append: '月' | append: first_day | append: '日' %}

              {% if work.work_details.dates.size > 1 %}
                {% for date_str in work.work_details.dates offset:1 %}
                  {% assign current_year = date_str | date: "%Y" %}
                  {% assign current_month = date_str | date: "%-m" %}
                  {% assign current_day = date_str | date: "%-d" %}

                  {% if current_year == first_year and current_month == first_month %}
                    {% assign date_part = current_day | append: '日' %}
                  {% else %}
                    {% assign date_part = current_year | append: '年' | append: current_month | append: '月' | append: current_day | append: '日' %}
                  {% endif %}

                  {% assign formatted_dates = formatted_dates | append: ' | ' | append: date_part %}
                {% endfor %}
              {% endif %}

              {% assign work_date = formatted_dates %}
            {% else %}
              {% assign work_date = work.work_details.date %}
            {% endif %}
            {% include components/card.html
               image=work.work_details.poster_image
               date=work_date
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
