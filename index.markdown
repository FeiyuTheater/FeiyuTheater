---
# =============================================================================
# HERO BANNER CONFIGURATION
# =============================================================================
# All banner settings live under the `hero:` key below.
#
# FIELDS
# ------
# title             Display title of the show. Shown as the large heading.
#
# date              Performance date string (free-form). E.g. "2026年5月30日 | 5月31日"
#
# location          Venue name shown as "地点：<value>".
#
# background_image  Path to the banner image under /assets/imgs/.
#
# COUNTDOWN TIMER (optional)
# --------------------------
# Include all three fields to show a live countdown. Remove (or comment out)
# any one of them to hide the countdown section entirely.
#
# countdown_title     Label above the timer. E.g. "距离早鸟票结束还有："
# countdown_datetime  Deadline in ISO 8601 format with timezone offset.
#                     E.g. "2025-09-28T12:00:00-07:00"
#                     When this moment passes the entire countdown block
#                     disappears automatically — no message is shown.
#
# BUTTON — single button
# ----------------------
# Use these three fields when you only need one call-to-action button.
#
# button_status   "active"   → renders a clickable <a> link.
#                 "inactive" → renders a greyed-out non-clickable label.
# button_text     Button label.
# button_link     Destination URL (only used when status is "active").
#
# BUTTONS — multiple buttons
# --------------------------
# Replace the three `button_*` fields above with a `buttons:` list when you
# need two (or more) buttons. Each entry supports:
#
#   - status: "active" | "inactive"
#     text:   Button label
#     link:   Destination URL (used when status is "active")
#     style:  "primary"  → filled red button (default, can omit)
#             "outline"  → transparent button with white border
#
# Example — two buttons:
#   buttons:
#     - status: "active"
#       text: "点击购票"
#       link: "https://..."
#     - status: "active"
#       text: "了解详情"
#       link: "/about"
#       style: "outline"
#
# Note: `buttons:` takes precedence over the flat `button_*` fields.
#       Remove `buttons:` to fall back to the single-button fields.
# =============================================================================
layout: home
title: "非鱼剧社"
hero:
  title: "杀戮之神"
  date: "2026年5月30日 | 5月31日"
  # if no count down is needed, then comment out these keys
  countdown_title: "距离早鸟票结束还有："
  countdown_datetime: "2026-05-03T22:00:00-07:00" # ISO format with timezone

  # Show as button or a info
  # Status can be "active" or "inactive"
  # button_status: "active"
  # button_text: "点击购票"
  # button_link: "https://event.hellotaro.com/e/2026_ca_feiyu_0530"

  buttons:
    - status: "active"
      text: "周六场购票"
      link: "https://event.hellotaro.com/e/2026_ca_feiyu_0530"
    - status: "active"
      text: "周日场购票"
      link: "https://event.hellotaro.com/e/2026_ca_feiyu_0531"

  location: "Starbright Theater, Campbell"
  background_image: "/assets/imgs/goc-hero-banner.png"
---

<!-- Hero Banner Section -->
{% include components/index-hero-banner.html hero=page.hero %}

<!-- Recent Activities Section -->
<section class="recent-activities-section">
  <div class="container">
    <h2 class="section-title">近期活动</h2>
    <div class="activities-list">
      {% assign sorted_activities = site.activities | sort: 'date_str' | reverse %}
      {% for activity in sorted_activities %}
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
      {% assign work_count = 0 %}
      {% for work in preview_works %}
        {% if work_count < 3 %}
          {% if work.hidden == null or work.hidden == false %}
            {% assign work_count = work_count | plus: 1 %}
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
          {% endif %}
        {% endif %}
      {% endfor %}
    </div>
    <div class="view-more-section">
      <a href="{{ '/prev-work' | relative_url }}" class="view-more-button">查看更多</a>
    </div>
  </div>
</section>
