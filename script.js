// DOM元素
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const themeBtn = document.getElementById('themeBtn');
const viewWorksBtn = document.getElementById('viewWorksBtn');
const contactBtn = document.getElementById('contactBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');
const workViewBtns = document.querySelectorAll('.work-view-btn');
const workModal = document.getElementById('workModal');
const modalClose = document.querySelector('.modal-close');
const messageForm = document.getElementById('messageForm');
const scrollIndicator = document.querySelector('.scroll-indicator');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// 作品数据
const worksData = [
    {
        id: 1,
        title: "晨曦咖啡品牌视觉系统",
        description: "为晨曦咖啡打造完整的品牌视觉识别系统，包括Logo设计、色彩系统、字体规范和视觉元素。该项目旨在传达咖啡品牌的温暖、专业和现代感，帮助品牌在竞争激烈的市场中建立独特形象。",
        category: "branding",
        year: "2023",
        tags: ["品牌设计", "Logo设计", "视觉识别"],
        color: "#ff9a9e"
    },
    {
        id: 2,
        title: "环保组织年度报告",
        description: "为环保组织设计的40页年度报告画册，采用环保纸张和可持续印刷工艺。设计以自然元素为主题，通过简洁的排版和自然的配色，传达组织的环保理念和成就。",
        category: "print",
        year: "2023",
        tags: ["画册设计", "排版", "印刷设计"],
        color: "#a1c4fd"
    },
    {
        id: 3,
        title: "健康APP界面设计",
        description: "移动端健康管理应用UI/UX设计，包括用户界面、用户体验流程和交互设计。设计注重易用性和美观性，帮助用户更好地管理个人健康数据。",
        category: "digital",
        year: "2022",
        tags: ["UI设计", "用户体验", "移动应用"],
        color: "#84fab0"
    },
    {
        id: 4,
        title: "有机茶叶包装设计",
        description: "为有机茶叶品牌设计的系列包装，强调自然、可持续和手工制作的理念。包装采用环保材料和简约设计，突出茶叶的天然品质。",
        category: "packaging",
        year: "2022",
        tags: ["包装设计", "可持续设计", "品牌包装"],
        color: "#d4fc79"
    },
    {
        id: 5,
        title: "独立书店视觉识别",
        description: "为小型独立书店打造的品牌视觉系统，包括Logo、店铺标识、宣传材料和网站设计。设计旨在传达书店的文艺气息和社区精神。",
        category: "branding",
        year: "2021",
        tags: ["品牌设计", "视觉识别", "店铺设计"],
        color: "#a6c0fe"
    },
    {
        id: 6,
        title: "音乐节社交媒体视觉",
        description: "为音乐节设计的系列社交媒体视觉，包括海报、动态图和社交媒体素材。设计充满活力和动感，体现音乐节的欢乐氛围。",
        category: "digital",
        year: "2021",
        tags: ["社交媒体", "海报设计", "动态设计"],
        color: "#fccb90"
    }
];

// 导航切换
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        // 更新活跃导航链接
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
        
        // 显示对应内容区域
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
            }
        });
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// 主题切换
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeBtn.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeBtn.style.color = '#ffa500';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeBtn.style.color = '#66c0f4';
    }
});

// 作品筛选
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // 更新活跃筛选按钮
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 筛选作品
        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 作品查看
workViewBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const work = worksData[index];
        openWorkModal(work);
    });
});

// 打开作品模态框
function openWorkModal(work) {
    document.getElementById('modalTitle').textContent = work.title;
    document.getElementById('modalDescription').textContent = work.description;
    document.getElementById('modalDate').textContent = work.year;
    document.getElementById('modalCategory').textContent = 
        work.category === 'branding' ? '品牌设计' :
        work.category === 'print' ? '印刷品' :
        work.category === 'digital' ? '数字媒体' : '包装设计';
    
    const modalImage = document.getElementById('modalImage');
    modalImage.style.background = `linear-gradient(135deg, ${work.color}, ${work.color}dd)`;
    
    const modalTags = document.getElementById('modalTags');
    modalTags.innerHTML = '';
    work.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'work-tag';
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });
    
    workModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
modalClose.addEventListener('click', closeWorkModal);
workModal.addEventListener('click', (e) => {
    if (e.target === workModal) {
        closeWorkModal();
    }
});

function closeWorkModal() {
    workModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 表单提交
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        category: document.getElementById('category').value,
        message: document.getElementById('message').value,
        date: new Date().toLocaleDateString('zh-CN')
    };
    
    // 创建新的留言项
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
        <div class="message-header">
            <span class="message-author">
                <i class="fas fa-user"></i> ${formData.name}
            </span>
            <span class="message-date">${formData.date}</span>
            <span class="message-category">
                ${formData.category === 'design' ? '设计合作' : 
                  formData.category === 'optometry' ? '视光咨询' : '其他'}
            </span>
        </div>
        <p class="message-content">${formData.message}</p>
    `;
    
    // 添加到留言列表顶部
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.insertBefore(messageItem, messagesContainer.firstChild);
    
    // 显示成功消息
    alert('留言已发送！我会尽快回复您。');
    
    // 重置表单
    messageForm.reset();
});

// 按钮点击事件
viewWorksBtn.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('a[data-section="works"]').classList.add('active');
    contentSections.forEach(section => section.classList.remove('active'));
    document.getElementById('works').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactBtn.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('a[data-section="contact"]').classList.add('active');
    contentSections.forEach(section => section.classList.remove('active'));
    document.getElementById('contact').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 滚动指示器
scrollIndicator.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// 移动端菜单
mobileMenuBtn.addEventListener('click', () => {
    const mainNav = document.querySelector('.main-nav');
    mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
});

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// 数字计数器动画
function initCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        const valueElement = item.querySelector('.stat-value');
        const target = parseInt(item.getAttribute('data-count'));
        const suffix = valueElement.textContent.includes('%') ? '%' : '+';
        let current = 0;
        
        const increment = () => {
            if (current < target) {
                current += Math.ceil(target / 50);
                if (current > target) current = target;
                valueElement.textContent = current + (suffix === '%' ? '%' : '+');
                setTimeout(increment, 20);
            }
        };
        
        // 开始计数
        setTimeout(increment, 500);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCounters();
    
    // 添加键盘事件监听
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeWorkModal();
        }
    });
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            const mainNav = document.querySelector('.main-nav');
            mainNav.style.display = 'flex';
        }
    });
});
