document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.special-effect-section');
    const modal = document.querySelector('.slider-modal');
    const modalSlider = modal.querySelector('.modal-slider');
    const closeButton = modal.querySelector('.close-slider');
    const prevButton = modal.querySelector('.prev-slide');
    const nextButton = modal.querySelector('.next-slide');
    let currentModalSlide = 0;
    let currentSliderImages = [];

    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.3 });

        observer.observe(section);

        const slider = section.querySelector('.custom-gallery-slider');
        if (slider) {
            let currentSlide = 0;
            const slides = slider.querySelectorAll('.main-slider > div');
            const totalSlides = slides.length;

            function showSlide(index) {
                const offset = -index * 33.333; // 33.333% for each slide
                slider.style.transition = 'transform 0.5s ease-in-out';
                slider.style.transform = `translateX(${offset}%)`;
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }

            setInterval(nextSlide, 3000);

            slider.addEventListener('click', (e) => {
                if (e.target.tagName === 'IMG') {
                    currentSliderImages = Array.from(slides).map(slide => slide.querySelector('img').src);
                    openModal(currentSliderImages, currentSlide);
                }
            });
        }
    });

    function openModal(images, startIndex) {
        currentModalSlide = startIndex;
        modalSlider.innerHTML = '';
        currentSliderImages = images;
        showModalSlide(currentModalSlide);
        modal.style.display = 'block';
    }

    function showModalSlide(index) {
        modalSlider.innerHTML = `<img src="${currentSliderImages[index]}" alt="Modal Image">`;
    }

    function nextModalSlide() {
        currentModalSlide = (currentModalSlide + 1) % currentSliderImages.length;
        showModalSlide(currentModalSlide);
    }

    function prevModalSlide() {
        currentModalSlide = (currentModalSlide - 1 + currentSliderImages.length) % currentSliderImages.length;
        showModalSlide(currentModalSlide);
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevButton.addEventListener('click', prevModalSlide);
    nextButton.addEventListener('click', nextModalSlide);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});