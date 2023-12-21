document.addEventListener('DOMContentLoaded', function () {

    //Pintar las catrgorias
    let drawDataCategories = (data) => {
        let parent = document.getElementById('item-categorie')
        parent.innerHTML = '';
        data.forEach(category => {
          let child = document.createElement('button')
          child.classList.add('list-group-item')
          child.setAttribute('category-id', category.id)
          child.innerText = category.name
          parent.appendChild(child)
        })
      }

    const GetCategories = () => {
        fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawDataCategories(data))
    }

    GetCategories();
});








        /*

document.addEventListener('DOMContentLoaded', function () {

    let drawData = (data) => {
        let parent = document.getElementById('list-categories');
        parent.innerHTML = '';  // Limpiar el contenido existente antes de volver a dibujar

        data.forEach(category => {
            let child = document.createElement('li');
            child.classList.add('list-group-item');
            child.innerText = category.name;
            parent.appendChild(child);
        });
    }

    // Función para realizar la solicitud fetch y actualizar la lista de categorías
    const updateCategories = () => {
        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(data => drawData(data));
    }

    // Escuchar el envío del formulario
    document.getElementById('addCategoryForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Evitar la recarga de la página por defecto

        // Obtener el nombre de la categoría del formulario
        const categoryName = document.getElementById('categoryName').value;

        // Realizar una solicitud fetch para agregar la nueva categoría
        fetch("http://localhost:3000/categories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        })
        .then(res => res.json())
        .then(data => {
            // Cerrar el modal después de agregar la categoría
            const modal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
            modal.hide();

            // Actualizar la lista de categorías
            updateCategories();
        });
    });

    // Cargar las categorías al cargar la página
    updateCategories();
});












    //Pintar el popup
    document.getElementById('addCategoryForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const categoryName = document.getElementById('categoryName').value;

        fetch("http://localhost:3000/categories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        })
        .then(res => res.json())

        GetCategories();
    });



        */




