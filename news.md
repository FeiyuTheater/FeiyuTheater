---
title: News
layout: default
permalink: /news/
---

<div class="news-page">
  <div class="text-center">
    <h1>最新动态</h1>
    <p>我们的动态</p>
  </div>

  {% if site.news.size > 0 %}
    <div class="news-container">
      {% for news in site.news %}
        <div class="news-item">
          {% if news.image %}
            <img src="{{ news.image }}" alt="{{ news.title }}" class="news-image" />
          {% else %}
            <div class="news-image" style="background-color: #e0e0e0; display: flex; align-items: center; justify-content: center;">
              <span style="color: #888; font-size: 1.2em;">{{ news.title }}</span>
            </div>
          {% endif %}
          <div class="news-content">
            <h2 class="news-title">{{ news.title }}</h2>
            <p class="news-date">{{ news.date | date: "%B %d, %Y" }}</p>
            <div class="news-excerpt">{{ news.content | strip_html | markdownify | truncatewords: 30 }}</div>
            <a href="{{ news.url }}" class="btn btn-primary">Read More</a>
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <p class="text-center">No news items found. Check back later for updates!</p>
  {% endif %}
</div>