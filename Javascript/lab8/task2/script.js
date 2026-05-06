class Carousel {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.images = config.images || [];
        this.duration = config.duration || 500;
        this.autoplay = config.autoplay !== undefined ? config.autoplay : false;
        this.autoplaySpeed = config.autoplaySpeed || 3000;
        this.showArrows = config.showArrows !== undefined ? config.showArrows : true;
        this.showDots = config.showDots !== undefined ? config.showDots : true;

        this.currentIndex = 0;
        this.intervalId = null;

        if (this.images.length > 0) {
            this.init();
        }
    }

    init() {
        this.buildDOM();
        this.setupEvents();
        if (this.autoplay) {
            this.startAutoplay();
        }
    }

    buildDOM() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'carousel-wrapper';

        this.track = document.createElement('div');
        this.track.className = 'carousel-track';
        this.track.style.transition = `transform ${this.duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;

        this.images.forEach(src => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const img = document.createElement('img');
            img.src = src;
            slide.appendChild(img);
            this.track.appendChild(slide);
        });

        this.wrapper.appendChild(this.track);

        if (this.showArrows) {
            this.prevBtn = document.createElement('button');
            this.prevBtn.className = 'carousel-btn prev';
            this.prevBtn.innerHTML = '&#10094;';
            
            this.nextBtn = document.createElement('button');
            this.nextBtn.className = 'carousel-btn next';
            this.nextBtn.innerHTML = '&#10095;';

            this.wrapper.appendChild(this.prevBtn);
            this.wrapper.appendChild(this.nextBtn);
        }

        if (this.showDots) {
            this.dotsContainer = document.createElement('div');
            this.dotsContainer.className = 'carousel-dots';
            this.dots = [];
            
            this.images.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = `dot ${i === 0 ? 'active' : ''}`;
                dot.dataset.index = i;
                this.dotsContainer.appendChild(dot);
                this.dots.push(dot);
            });
            
            this.wrapper.appendChild(this.dotsContainer);
        }

        this.container.appendChild(this.wrapper);
    }

    updateView() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        if (this.showDots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateView();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateView();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateView();
    }

    startAutoplay() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => this.next(), this.autoplaySpeed);
        }
    }

    stopAutoplay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    setupEvents() {
        if (this.showArrows) {
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
        }

        if (this.showDots) {
            this.dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    this.goTo(parseInt(e.target.dataset.index, 10));
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        if (this.autoplay) {
            this.wrapper.addEventListener('mouseenter', () => this.stopAutoplay());
            this.wrapper.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
}

const mockImages = [
    'https://picsum.photos/id/1015/800/400',
    'https://picsum.photos/id/1018/800/400',
    'https://picsum.photos/id/1019/800/400',
    'https://picsum.photos/id/1022/800/400'
];

new Carousel('carousel-container', {
    images: mockImages,
    duration: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    showArrows: true,
    showDots: true
});