class CastPosterComponent {
  constructor(container) {
    this.container = container;
    this.data = JSON.parse(container.dataset.cast);
    this.teams = JSON.parse(container.dataset.teams);
    this.state = {
      currentSection: '0', // 使用索引而不是固定名称
      currentPage: 0
    };

    this.breakpoints = { 
      mobile: 480, 
      tablet: 768, 
      medium: 1000,    // 新增这一行
      desktop: 1024 
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
    this.handleResize();
  }

  bindEvents() {
    // 标签切换
    this.container.querySelectorAll('.cast-tab-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchSection(e.target.dataset.section);
      });
    });

    // 导航按钮
    this.container.querySelector('#castNavLeft').addEventListener('click', () => {
      this.goToPage(this.state.currentPage - 1);
    });

    this.container.querySelector('#castNavRight').addEventListener('click', () => {
      this.goToPage(this.state.currentPage + 1);
    });

    // 响应式处理
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.handleResize(), 100);
    });

    this.bindTouchEvents();
  }

  bindTouchEvents() {
    const grid = this.container.querySelector('#castMemberGrid');
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    grid.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = false;
    }, { passive: true });

    grid.addEventListener('touchmove', (e) => {
      if (!startX || !startY) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const diffX = Math.abs(currentX - startX);
      const diffY = Math.abs(currentY - startY);
      
      // 如果水平滑动距离大于垂直距离，认为是左右滑动
      if (diffX > diffY && diffX > 10) {
        isDragging = true;
        e.preventDefault(); // 阻止页面滚动
      }
    }, { passive: false });

    grid.addEventListener('touchend', (e) => {
      if (!isDragging || !startX) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50; // 滑动阈值
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // 向左滑动 - 下一页
          this.goToPage(this.state.currentPage + 1);
        } else {
          // 向右滑动 - 上一页
          this.goToPage(this.state.currentPage - 1);
        }
      }
      
      startX = 0;
      startY = 0;
      isDragging = false;
    }, { passive: true });
  }

  getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= this.breakpoints.mobile) return 4;      // ≤480px: 2x2
    if (width <= this.breakpoints.tablet) return 6;      // 481px-768px: 3x2
    if (width <= 840) return 4;                          // 769px-840px: 2x2 (新增)
    if (width <= this.breakpoints.medium) return 6;      // 841px-1000px: 3x2
    return 8;                                             // >1000px: 4x2
  }

  getCurrentData() {
    return this.data[this.state.currentSection]?.members || [];
  }

  getTotalPages() {
    const itemsPerPage = this.getItemsPerPage();
    return Math.ceil(this.getCurrentData().length / itemsPerPage);
  }

  renderMembers() {
    const data = this.getCurrentData();
    const itemsPerPage = this.getItemsPerPage();
    const startIndex = this.state.currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const pageData = data.slice(startIndex, endIndex);

    const grid = this.container.querySelector('#castMemberGrid');

    grid.classList.add('loading');

    setTimeout(() => {
      grid.innerHTML = pageData.map(member => `
      <div class="cast-member">
        <div class="cast-avatar">${member.avatar}</div>
        <div class="cast-name">${member.name}</div>
        <div class="cast-character">
          ${member.role ? `饰 ${member.role}<br>` : ''}${member.position}
        </div>
      </div>
    `).join('');

      grid.classList.remove('loading');
    }, 150);
  }

  renderPageIndicator() {
    const totalPages = this.getTotalPages();
    const pageInfo = this.container.querySelector('#castPageInfo');
    const pageDots = this.container.querySelector('#castPageDots');

    if (totalPages <= 1) {
      pageInfo.textContent = '';
      pageDots.innerHTML = '';
      return;
    }

    pageInfo.textContent = `${this.state.currentPage + 1} / ${totalPages}`;
    
    pageDots.innerHTML = Array.from({ length: totalPages }, (_, i) => 
      `<div class="cast-page-dot ${i === this.state.currentPage ? 'active' : ''}" data-page="${i}"></div>`
    ).join('');

    pageDots.querySelectorAll('.cast-page-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        this.goToPage(parseInt(e.target.dataset.page));
      });
    });
  }

  updateNavigation() {
    const totalPages = this.getTotalPages();
    const navLeft = this.container.querySelector('#castNavLeft');
    const navRight = this.container.querySelector('#castNavRight');



    // 如果只有一页，隐藏导航按钮
    if (totalPages <= 1) {
      navLeft.style.display = 'none';
      navRight.style.display = 'none';
      return;
    }
    
    // 多页时显示按钮
    navLeft.style.display = 'flex';
    navRight.style.display = 'flex';

    navLeft.disabled = this.state.currentPage === 0;
    navRight.disabled = this.state.currentPage >= totalPages - 1;
  }

  goToPage(page) {
    const totalPages = this.getTotalPages();
    if (page >= 0 && page < totalPages && page !== this.state.currentPage) {
      this.state.currentPage = page;
      this.render();
    }
  }

  switchSection(section) {
    if (section === this.state.currentSection) return;
    
    this.state.currentSection = section;
    this.state.currentPage = 0;
    
    this.container.querySelectorAll('.cast-tab-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === section);
    });
    
    this.render();
  }

  render() {
    this.renderMembers();
    this.renderPageIndicator();
    this.updateNavigation();
  }

  handleResize() {
    const oldItemsPerPage = this.getItemsPerPage();
    const currentFirstItem = this.state.currentPage * oldItemsPerPage;
    const newItemsPerPage = this.getItemsPerPage();
    const newPage = Math.floor(currentFirstItem / newItemsPerPage);
    
    const newTotalPages = Math.ceil(this.getCurrentData().length / newItemsPerPage);
    this.state.currentPage = Math.min(newPage, Math.max(0, newTotalPages - 1));
    
    this.render();
  }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cast-poster-container').forEach(container => {
    new CastPosterComponent(container);
  });
});