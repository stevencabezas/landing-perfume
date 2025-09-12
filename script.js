function toggleMenu() {
    const navbar = document.querySelector('header .navbar');
    navbar.classList.toggle('active');
}

function redirectToWhatsApp(brand, product, price, imageUrl) {
    const message = `Hola, estoy interesado en el perfume ${product} de ${brand}, que tiene un precio de ${price}. 
    ${imageUrl}`;

    const phoneNumber = '+50687683732';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');  // Abre el enlace en una nueva pestaña
}

document.addEventListener('DOMContentLoaded', () => {
    // Agregar el efecto de desplazamiento suave
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            // Evitar el comportamiento por defecto
            event.preventDefault();

            // Obtener el destino del enlace (el id de la sección)
            const targetId = link.getAttribute("href").substring(1); // Eliminar el '#' del href
            const targetElement = document.getElementById(targetId);

            // Realizar el desplazamiento suave
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        });
    });

    // Animación de marcas
    const marcas = document.querySelectorAll('.marca');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2 // 20% del elemento visible activa la animación
    });

    marcas.forEach(marca => observer.observe(marca));
});

document.querySelectorAll('.marca').forEach(marca => {
    marca.addEventListener('click', () => {
        const marcaId = marca.getAttribute('data-id');
        if (!marcaId) return; // ⛔ Si no tiene data-id, no hace nada
        window.location.href = `marca.html?marca=${marcaId}`; // Redirige a la página de la marca
    });
});

(() => {
    const carousels = document.querySelectorAll('.carousel');
    if (!carousels.length) return;

    carousels.forEach(initCarousel);

    function initCarousel(root) {
        const track = root.querySelector('.carousel-track');
        const slides = Array.from(root.querySelectorAll('.carousel-slide'));
        const prevBtn = root.querySelector('.carousel-btn.prev');
        const nextBtn = root.querySelector('.carousel-btn.next');
        const dotsList = root.querySelector('.carousel-dots');

        if (!track || !slides.length || !dotsList) return;

        let index = 0;
        let autoplayMs = 5000;
        let timerId = null;
        let isPointerDown = false;
        let startX = 0;
        let deltaX = 0;

        // Dots
        dotsList.innerHTML = '';
        slides.forEach((_, i) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.role = 'tab';
            btn.ariaLabel = `Ir a la diapositiva ${i + 1}`;
            btn.addEventListener('click', () => goTo(i, true));
            li.appendChild(btn);
            dotsList.appendChild(li);
        });
        const dots = Array.from(dotsList.querySelectorAll('button'));

        function updateUI() {
            track.style.transform = `translateX(${-index * 100}%)`;
            dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === index)));
            slides.forEach((sl, i) => sl.setAttribute('aria-hidden', String(i !== index)));
        }

        function goTo(i, user = false) {
            const len = slides.length;
            index = (i + len) % len;
            updateUI();
            if (user) restartAutoplay();
        }
        const next = (user = false) => goTo(index + 1, user);
        const prev = (user = false) => goTo(index - 1, user);

        // Solo autoplay si el carrusel está visible (no display:none)
        const isVisible = () =>
            root.offsetParent !== null &&
            getComputedStyle(root).display !== 'none' &&
            root.clientWidth > 0 && root.clientHeight > 0;

        function startAutoplay() {
            if (timerId || !isVisible()) return;
            timerId = setInterval(() => next(false), autoplayMs);
        }
        function stopAutoplay() { if (timerId) { clearInterval(timerId); timerId = null; } }
        function restartAutoplay() { stopAutoplay(); startAutoplay(); }

        // Controles
        nextBtn?.addEventListener('click', () => next(true));
        prevBtn?.addEventListener('click', () => prev(true));

        root.addEventListener('mouseenter', stopAutoplay);
        root.addEventListener('mouseleave', startAutoplay);
        root.addEventListener('focusin', stopAutoplay);
        root.addEventListener('focusout', startAutoplay);

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stopAutoplay() : startAutoplay();
        });

        // dentro de initCarousel(root)…
        let moved = false;              // <— nuevo

        track.addEventListener('pointerdown', (e) => {
            isPointerDown = true;
            moved = false;
            startX = e.clientX;
            deltaX = 0;
            stopAutoplay();
            // ¡No capturar aquí! (no setPointerCapture todavía)
        });

        track.addEventListener('pointermove', (e) => {
            if (!isPointerDown) return;
            deltaX = e.clientX - startX;

            // Si empieza a moverse más de 6px, ahora sí tratamos como swipe
            if (!moved && Math.abs(deltaX) > 6) {
                moved = true;
                track.style.transition = 'none';
                track.setPointerCapture?.(e.pointerId);
            }
            if (moved) {
                const percent = (deltaX / root.clientWidth) * 100;
                track.style.transform = `translateX(${-(index * 100) + percent}%)`;
            }
        });

        track.addEventListener('pointerup', (e) => {
            if (!isPointerDown) return;
            isPointerDown = false;

            // Si NO hubo movimiento real, era un click — no toques nada
            if (!moved) {
                startAutoplay();
                return;
            }

            // Finalizar swipe
            track.style.transition = '';
            const threshold = root.clientWidth * 0.15;
            if (Math.abs(deltaX) > threshold) {
                deltaX < 0 ? next(true) : prev(true);
            } else {
                updateUI();
            }
            track.releasePointerCapture?.(e.pointerId);
            startAutoplay();
        });


        // Reaccionar a cambios de breakpoint (por si alternas mobile/desktop)
        const mq = matchMedia('(min-width: 992px)');
        mq.addEventListener?.('change', restartAutoplay);

        // Init
        goTo(0);
        startAutoplay();
        root.setAttribute('tabindex', '0');
    }
})();

