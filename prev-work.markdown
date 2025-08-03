---
layout: prev-work
title: 往期作品
description: "探索非鱼剧社往期的戏剧演出和活动回顾，感受每一段舞台的独特魅力。"
permalink: /prev-work
---

<!-- Hero Banner Section -->
{% include hero-banner.html
    background="/assets/imgs/works_page/banner.png"
    content="<h1 class='hero-title'>往期作品</h1>"
%}

<!-- Main Content -->
<main class="prev-works-main">
  <div class="container">
    <!-- Works Grid -->
    <div class="works-grid">
      {% assign sorted_works = site.works | sort: 'sort_by_date' | reverse %}
      {% for work in sorted_works %}
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
  </div>
</main>
