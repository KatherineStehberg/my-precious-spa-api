document.addEventListener('DOMContentLoaded', () => {
  const jewelryListElem = document.getElementById('jewelry-list');
  const paginationElem = document.getElementById('pagination');
  const perPageElem = document.getElementById('perPage');
  const categoryElem = document.getElementById('category');
  const metalElem = document.getElementById('metal');
  const minPriceElem = document.getElementById('minPrice');
  const maxPriceElem = document.getElementById('maxPrice');

  const baseUrl = 'http://localhost:3000'; // Tu URL base de la API

  // Función para obtener y mostrar las joyas con filtros, paginación y ordenamiento
  const getJewelry = async (page = 1) => {
      try {
          const limit = perPageElem.value;
          const orderBy = 'id_ASC'; // Por defecto, puedes modificar según tu API
          const categoria = categoryElem.value.trim();
          const metal = metalElem.value.trim();
          const precio_min = minPriceElem.value.trim();
          const precio_max = maxPriceElem.value.trim();

          const params = new URLSearchParams({
              page,
              limit,
              order_by: orderBy,
              categoria,
              metal,
              precio_min,
              precio_max
          });

          const response = await axios.get(`${baseUrl}/joyas?${params.toString()}`);

          // Lógica para mostrar las joyas en el UI
          jewelryListElem.innerHTML = ''; // Limpiar la lista actual

          response.data.forEach(joya => {
              // Construir elementos HTML para cada joya y añadirlos a jewelryListElem
              const joyaElem = document.createElement('div');
              joyaElem.innerHTML = `<h3>${joya.nombre}</h3><p>Precio: ${joya.precio}</p><p>Stock: ${joya.stock}</p>`;
              jewelryListElem.appendChild(joyaElem);
          });

          // Construir la paginación (si aplica) - puedes implementarlo dependiendo de tu respuesta de API
          // Ejemplo básico: Mostrar números de página y botones para cambiar de página
          paginationElem.innerHTML = `<button onclick="getJewelry(${page - 1})" ${page === 1 ? 'disabled' : ''}>Previous</button> Page ${page} <button onclick="getJewelry(${page + 1})">Next</button>`;

      } catch (error) {
          console.error('Error fetching jewelry:', error);
      }
  };

  // Llamar a getJewelry al cargar la página inicialmente
  getJewelry();

  // Event listeners para los controles de filtrado y paginación
  perPageElem.addEventListener('change', () => getJewelry());
  categoryElem.addEventListener('input', () => getJewelry());
  metalElem.addEventListener('input', () => getJewelry());
  minPriceElem.addEventListener('input', () => getJewelry());
  maxPriceElem.addEventListener('input', () => getJewelry());
});
