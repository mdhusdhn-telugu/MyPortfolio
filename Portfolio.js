document.addEventListener('DOMContentLoaded', function () {
    // ===== Smooth Scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ===== About Cards Visibility =====
    function handleAboutCards() {
        const cards = document.querySelectorAll('.about-card');
        cards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
                const headings = card.querySelectorAll('h3, p');
                headings.forEach(element => element.classList.add('visible'));
            }
        });
    }
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    window.addEventListener('scroll', handleAboutCards);
    handleAboutCards();

    // ===== Text Container Scroll Animation =====
    const textContainer = document.querySelector('.text-container');
    function handleTextContainerScroll() {
        const rect = textContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.top < viewportHeight && rect.bottom > 0) {
            textContainer.classList.add('animate');
            window.removeEventListener('scroll', handleTextContainerScroll);
        }
    }
    window.addEventListener('scroll', handleTextContainerScroll);
    handleTextContainerScroll();

    // ===== IntersectionObserver for Text Boxes =====
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    const textBoxes = document.querySelectorAll('.text-box');
    textBoxes.forEach(box => observer.observe(box));

    // ===== First Text Box Content (BCA Graduate) =====
    const monthsTextElement = document.querySelector('.text-container .text-box:first-child a');
    if (monthsTextElement) {
        monthsTextElement.textContent = `BCA Graduate | Open to Opportunities`;
    }

    // ===== Age Calculation =====
    const birthdate = new Date(2002, 4, 2); // May 2, 2002
    const ageElement = document.getElementById('age');
    if (ageElement) {
        const currentDate = new Date();
        let years = currentDate.getFullYear() - birthdate.getFullYear();
        let months = currentDate.getMonth() - birthdate.getMonth();
        let days = currentDate.getDate() - birthdate.getDate();
        if (days < 0) {
            months -= 1;
            days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        ageElement.textContent = `${years} years ${months} months ${days} days`;
    }

    // ===== Element Animation Loop =====
    const elements = document.querySelectorAll('.text-left, .text-top-right, .text-bottom-right');
    function animateElements() {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
                setTimeout(() => {
                    el.style.animation = 'fadeOut 1s forwards';
                    setTimeout(() => {
                        el.classList.remove('visible');
                        el.style.animation = '';
                    }, 1000);
                }, 10000);
            }, index * 900);
        });
        setTimeout(animateElements, elements.length * 900 + 12000);
    }
    animateElements();

    // ===== Accordion Functionality =====
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            accordionButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                    btn.nextElementSibling.style.maxHeight = null;
                    btn.querySelector('.accordion-symbol').textContent = "+";
                }
            });
            const accordionContent = this.nextElementSibling;
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                accordionContent.style.maxHeight = null;
                this.querySelector('.accordion-symbol').textContent = "+";
            } else {
                this.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                this.querySelector('.accordion-symbol').textContent = "+";
            }
        });
    });

    // ===== Heading Animation =====
    const headings = document.querySelectorAll('h1');
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    headings.forEach(heading => headingObserver.observe(heading));

    // ===== Animate Sections =====
    const sections = document.querySelectorAll('.container, .banner-container, .navbar, .hero-section, .text-container, .about-me, .till, .sponsor-box, .education-section, .portfolio-wrapper, .inspiration-section, .skills-grid, .faqs, .contact-section, .cont, .footer, .service-section, .service-container, .service-items, .service-box, .about-card, .accordion-button, .accordion-content, .project-card, .project-container');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    });
    sections.forEach(section => sectionObserver.observe(section));

    // ===== Custom Cursor for Education Section =====
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.textContent = 'visit';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    const eduElements = document.querySelectorAll('.education-section .degree-info h3, .education-section .degree-info p, .education-section .degree-info a');
    eduElements.forEach(el => {
        el.addEventListener('mouseover', () => cursor.style.display = 'flex');
        el.addEventListener('mouseout', () => cursor.style.display = 'none');
    });
    document.addEventListener('mouseover', event => {
        if (!event.target.matches('.education-section .degree-info h3, .education-section .degree-info p, .education-section .degree-info a')) {
            cursor.style.display = 'none';
        }
    });

    // ===== Skills Circles =====
    const skillCircles = document.querySelectorAll(".skill-circle");
    function animateSkillCircles() {
        skillCircles.forEach(circle => {
            const rect = circle.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
            if (isVisible) {
                const percent = parseFloat(circle.getAttribute("data-percent"));
                const valueCircle = circle.querySelector(".value");
                const tooltip = circle.querySelector(".tooltip");
                const emoji = circle.querySelector(".emoji");
                const circumference = 2 * Math.PI * 20;
                valueCircle.style.strokeDasharray = `${percent / 100 * circumference}, ${circumference}`;
                tooltip.textContent = `${percent}%`;
                if (percent < 40) emoji.textContent = "😢";
                else if (percent < 60) emoji.textContent = "😐";
                else if (percent < 70) emoji.textContent = "🙂";
                else if (percent <= 80) emoji.textContent = "😊";
                else emoji.textContent = "🎉";
                emoji.style.top = "-40px";
                emoji.style.opacity = "0";
                circle.addEventListener("mouseenter", function () {
                    emoji.style.top = "-50px";
                    emoji.style.opacity = "1";
                });
                circle.addEventListener("mouseleave", function () {
                    emoji.style.top = "-40px";
                    emoji.style.opacity = "0";
                });
            }
        });
    }
    function randomizePositions() {
        skillCircles.forEach(circle => {
            const randomX = Math.random() * (window.innerWidth - 50);
            const randomY = Math.random() * 550;
            circle.style.left = `${randomX}px`;
            circle.style.top = `${randomY}px`;
            const duration = (Math.random() * 5) + 5;
            const direction = Math.random() > 0.5 ? 1 : -1;
            circle.style.animationDuration = `${duration}s`;
            circle.style.animationDirection = direction > 0 ? 'normal' : 'reverse';
        });
    }
    animateSkillCircles();
    randomizePositions();
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(animateSkillCircles, 200);
    });
    window.addEventListener('resize', randomizePositions);

    // ===== Contact Form =====
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            fetch('send_to_whatsapp.php', { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Your message is sent successfully');
                        form.reset();
                    } else {
                        alert('Error sending message: ' + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error sending your message');
                });
        });
    }
});
