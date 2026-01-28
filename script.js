document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu clicked - specific styling would be added here.');
        });
    }

    // Header scroll background effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            header.style.background = 'rgba(11, 13, 23, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(11, 13, 23, 0.95)';
        }
    });

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.expertise-card, .section-title, .hero-content, .about-content, .tech-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // --- Interactive Hero Image (3D Tilt Effect) ---
    const heroContainer = document.getElementById('heroImageContainer');
    const heroImage = document.getElementById('heroImage');

    if (heroContainer && heroImage) {
        heroContainer.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = heroContainer;
            const { offsetX: x, offsetY: y } = e;

            // Calculate rotation
            const xRotation = ((y / height) - 0.5) * -20;
            const yRotation = ((x / width) - 0.5) * 20;

            // Apply transformation
            heroImage.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
        });

        heroContainer.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }

    // --- About Section Image Slider ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    function nextSlide() {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Increment or reset
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Start auto slider
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Optional: Click on dots to change slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer); // Stop auto slide on interaction

            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            slideTimer = setInterval(nextSlide, slideInterval); // Restart auto slide
        });
    });
    // --- Active Navigation Highlight on Scroll ---
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.navbar a');

    const navObserverOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get id of the section
                const id = entry.target.getAttribute('id');

                if (id) {
                    // Remove active from all
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Add active to the current one
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Service Details Modal Logic ---
    const serviceDetails = {
        'electrical': `Our Electrical Works service is designed to cover all aspects of residential and commercial electrical maintenance. From safety inspections to complete rewiring, our certified electricians ensure your systems are efficient and compliant with Dubai's safety standards.

        • **Diagnostics & Troubleshooting**: Quick identification and repair of tripping breakers, faulty wiring, and power outages.
        • **Installations**: Ceiling lights, chandeliers, socket replacements, and new power points.
        • **Safety Audits**: Comprehensive checks for load balancing and fire hazard prevention.
        
        We prioritize safety above all, ensuring every connection is secure and every system is grounded perfectly.`,

        'plumbing': `Water leaks and plumbing issues can cause significant damage if left unchecked. Our expert plumbers provide rapid, reliable solutions for all your plumbing needs.

        • **Leak Detection**: Advanced methods to find hidden leaks in walls or ceilings without unnecessary damage.
        • **Fixture Installation**: Professional installation of sinks, toilets, showers, and water heaters.
        • **Pipe Maintenance**: Unclogging drains, repairing burst pipes, and general system flushing.
        
        We ensure your water systems flow smoothly, preventing wastage and ensuring hygiene for your property.`,

        'painting': `Transform your space with our premium Painting & Wallpaper services. Whether you need a fresh coat for a single room or a complete exterior makeover, our skilled painters deliver a flawless finish.

        • **Interior Painting**: Precision masking, surface preparation, and coating with high-quality, odorless paints.
        • **Exterior Painting**: Weather-resistant coatings to withstand the Dubai heat and sun.
        • **Wallpaper Fixing**: Expert application of all types of wallpapers with pattern matching perfection.
        
        We treat your walls like a canvas, ensuring smooth textures and vibrant colors that last.`,

        'ac': `In Dubai's climate, a functioning AC is not a luxury, it's a necessity. Our AC Service ensures your cooling units perform at their peak efficiency, keeping your energy bills low and your comfort high.

        • **Deep Cleaning**: Thorough cleaning of filters, coils, and drain trays to improve air quality.
        • **Gas Top-up**: Checking and refilling Freon gas for optimal cooling.
        • **Maintenance**: Inspection of motors, capacitors, and thermostats to prevent sudden breakdowns.
        
        Beat the heat with our scheduled maintenance plans designed to extend the lifespan of your AC units.`,

        'cleaning': `Experience the next level of cleanliness with our Deep Cleaning services. We go beyond surface wiping to eliminate dust, allergens, and bacteria from every corner of your home or office.

        • **Deep Home Cleaning**: Scrubbing floors, sanitizing kitchens and bathrooms, and dusting hard-to-reach areas.
        • **Upholstery Cleaning**: Steam cleaning sofas, mattresses, and carpets to remove stains and odors.
        • **Move-in/Move-out Cleaning**: Getting your property sparkling clean for the next tenant or for your arrival.
        
        Enjoy a pristine environment that feels fresh and healthy for you and your family.`,

        'carpentry': `Our Carpentry Service combines traditional craftsmanship with modern repair techniques. From fixing squeaky hinges to building custom furniture, our carpenters are masters of wood.

        • **Furniture Assembly**: Professional assembly of flat-pack furniture (IKEA, etc.) with precision.
        • **Repairs**: Fixing broken cabinets, door locks, hinges, and wooden flooring.
        • **Custom Woodwork**: Designing and building custom shelves, wardrobes, and storage solutions.
        
        We handle your wooden assets with care, restoring their beauty and functionality.`,
    };

    const modalOverlay = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.view-details');

    if (modalOverlay) {
        // Open Modal
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceKey = btn.getAttribute('data-service');
                const details = serviceDetails[serviceKey];

                if (details) {
                    modalTitle.textContent = btn.parentElement.querySelector('h3').textContent;
                    // Parse simple markdown-like bold syntax
                    modalDesc.innerHTML = details.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

                    document.body.classList.add('modal-open');
                }
            });
        });

        // Close Modal Function
        const closeModal = () => {
            document.body.classList.remove('modal-open');
        };

        // Close on Button Click
        closeBtn.addEventListener('click', closeModal);

        // Close on Overlay Click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Close on Escape Key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('modal-open')) {
                closeModal();
            }
        });
    }
});

