---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
js: home.js
---

<!-- banner in home page -->
<section class="banner-main-page">
  {% for new in site.news limit:1 %}
      {% include components/banner-content.html
         image=new.new_details.poster_image
         event_time=new.new_details.event_time
         title=new.new_details.title
         location=new.new_details.location
         early_bird_purchase_deadline=new.new_details.early_bird_purchase_deadline
      %}
    {% endfor %}
</section>

<!-- recent events -->
<section class="recent-events">
  <div class="container">
    <h2>近期活动</h2>
    {% for new in site.news limit:3 %}
      {% include components/recent-event-item.html
         image=new.new_details.poster_image
         event_time=new.new_details.event_time
         title=new.new_details.title
         location=new.new_details.location
         description=new.new_details.description
      %}
    {% endfor %}
  </div>
</section>

<!-- pre works -->
<section class="home-pre-works">
  <div class="container">
    <h2>往期作品</h2>
    <div class="works-grid">
      {% for work in site.works limit:3 %}
        <a href="{{ work.url | relative_url }}" class="work-link">
          {% include components/card.html 
             image=work.work_details.poster_image 
             date=work.work_details.date 
             title=work.work_details.title 
          %}
        </a>
      {% endfor %}
    </div>
    <div class="load-more-button-wrapper">
      <button class="btn btn-danger">查看更多</button>
    </div>
  </div>
</section>
