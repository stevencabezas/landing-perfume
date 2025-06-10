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