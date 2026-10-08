// Слайдер для холодильников
document.addEventListener('DOMContentLoaded', function() {
    // Элементы слайдера
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 10000; // 10 секунд
    
    // Функция для показа слайда
    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Убираем активный класс у всех точек
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем выбранный слайд
        slides[index].classList.add('active');
        slides[index].style.display = 'flex';
        
        // Активируем соответствующую точку
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Функция для следующего слайда
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Функция для предыдущего слайда
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Запуск автоматической смены слайдов
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Остановка автоматической смены слайдов
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Инициализация слайдера
    function initSlider() {
        // Показываем первый слайд
        showSlide(0);
        
        // Запускаем автоматическую смену
        startSlideShow();
        
        // Добавляем обработчики для кнопок
        prevBtn.addEventListener('click', function() {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
        
        nextBtn.addEventListener('click', function() {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
        
        // Добавляем обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });
        
        // Останавливаем автоматическую смену при наведении на слайдер
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
        
        // Для мобильных устройств
        slider.addEventListener('touchstart', stopSlideShow);
        slider.addEventListener('touchend', startSlideShow);
    }
    
    // Запускаем слайдер
    initSlider();
    
    // Адаптация для мобильных устройств
    function handleResize() {
        if (window.innerWidth <= 768) {
            // На мобильных можно добавить свайпы
            let touchStartX = 0;
            let touchEndX = 0;
            
            const sliderContainer = document.querySelector('.slider');
            
            sliderContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            sliderContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Свайп влево - следующий слайд
                    stopSlideShow();
                    nextSlide();
                    startSlideShow();
                }
                
                if (touchEndX > touchStartX + swipeThreshold) {
                    // Свайп вправо - предыдущий слайд
                    stopSlideShow();
                    prevSlide();
                    startSlideShow();
                }
            }
        }
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем сразу для текущего размера
});

// Плавная прокрутка для карточек техники
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (productsGrid) {
        // Добавляем плавную прокрутку колесом мыши
        productsGrid.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                productsGrid.scrollLeft += e.deltaY;
            }
        });
        
        // Индикаторы прокрутки
        function updateScrollIndicators() {
            const scrollLeft = productsGrid.scrollLeft;
            const scrollWidth = productsGrid.scrollWidth;
            const clientWidth = productsGrid.clientWidth;
            
            // Можно добавить логику для показа/скрытия индикаторов
            // если нужно
        }
        
        productsGrid.addEventListener('scroll', updateScrollIndicators);
        updateScrollIndicators();
    }
});