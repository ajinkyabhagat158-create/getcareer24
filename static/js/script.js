document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to posts
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all post cards and items
    document.querySelectorAll('.post-card, .post-item').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href && !this.href.startsWith('#')) {
                this.style.opacity = '0.7';
                this.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });

    // Add copy to clipboard functionality for important dates
    document.querySelectorAll('.dates-list').forEach(datesList => {
        datesList.addEventListener('click', function() {
            const datesText = Array.from(this.querySelectorAll('.date-item'))
                .map(item => item.textContent.trim())
                .join('\n');

            navigator.clipboard.writeText(datesText).then(() => {
                const originalBorder = this.style.borderLeft;
                this.style.borderLeft = '4px solid #27ae60';

                setTimeout(() => {
                    this.style.borderLeft = originalBorder;
                }, 1000);
            });
        });
    });
});