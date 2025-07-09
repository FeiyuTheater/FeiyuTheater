---
title: Projects
layout: default
permalink: /projects/
---

<div class="projects-page">
  <div class="text-center">
    <h1>非鱼制作</h1>
    <p>我们的制作</p>
  </div>

  {% if site.projects.size > 0 %}
    <div class="projects-container">
      {% for project in site.projects %}
        <div class="project-item">
          {% if project.image %}
            <img src="{{ project.image }}" alt="{{ project.title }}" class="project-image" />
          {% else %}
            <div class="project-image" style="background-color: #e0e0e0; display: flex; align-items: center; justify-content: center;">
              <span style="color: #888; font-size: 1.2em;">{{ project.title }}</span>
            </div>
          {% endif %}
          <div class="project-content">
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-date">{{ project.date | date: "%B %d, %Y" }}</p>
            <div class="project-excerpt">{{ project.content | strip_html | markdownify | truncatewords: 30 }}</div>
            <a href="{{ project.url }}" class="btn btn-primary">Read More</a>
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <p class="text-center">No past productions found. Stay tuned for updates on our upcoming projects!</p>
  {% endif %}
</div>