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