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
        link.addEventListener("click", function(event) {
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