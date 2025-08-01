import { marcasData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID de la marca de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const marcaId = urlParams.get('marca'); // Ejemplo: ?marca=afnan

    // Buscar la marca correspondiente en el arreglo de marcas
    const marcaSeleccionada = marcasData.find(marca => marca.id === marcaId);

    if (marcaSeleccionada) {
        // Mostrar el nombre de la marca
        document.getElementById('marcaNombre').textContent = marcaSeleccionada.nombre;

        // Mostrar las imágenes de perfumes de hombres
        const hombresContainer = document.getElementById('hombres');
        marcaSeleccionada.perfumes.hombres.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            hombresContainer.appendChild(img);
        });

        if(marcaSeleccionada.perfumes.hombres.length === 0){
            hombresContainer.parentElement.classList.add('d-none');
        }

        // Mostrar las imágenes de perfumes de mujeres
        const mujeresContainer = document.getElementById('mujeres');
        marcaSeleccionada.perfumes.mujeres.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            mujeresContainer.appendChild(img);
        });

        if(marcaSeleccionada.perfumes.mujeres.length === 0){
            mujeresContainer.parentElement.classList.add('d-none');
        }

        // Mostrar las imágenes de perfumes de unixes
        const unixesContainer = document.getElementById('unixes');
        marcaSeleccionada.perfumes.unixes.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            unixesContainer.appendChild(img);
        });

        if(marcaSeleccionada.perfumes.unixes.length === 0){
            unixesContainer.parentElement.classList.add('d-none');
        }
    } else {
        // Si no se encuentra la marca, mostrar un mensaje de error o redirigir
        window.location.href = 'index.html';
    }
});
