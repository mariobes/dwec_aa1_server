document.addEventListener('DOMContentLoaded', function () {

    //Pintar las catrgorias
    let drawDataCategories = (data) => {
        let parent = document.getElementById('item-categorie')
        parent.innerHTML = '';
        data.forEach(category => {
          let child = document.createElement('button')
          child.classList.add('list-group-item')
          child.innerText = category.name
          parent.appendChild(child)
        })
      }

    const GetCategories = () => {
        fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawDataCategories(data))
    }

    //Inicializar popup
    document.getElementById('add-category').addEventListener('click', function() {
        document.getElementById('category-name').value = '';
        document.getElementById('add-category-btn').disabled = true;
    })

    //Popup
    document.getElementById('add-category-btn').addEventListener('click', function(event) {

        const categoryName = document.getElementById('category-name').value;

        fetch("http://localhost:3000/categories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        })
        .then(res => res.json())
        GetCategories();
    })


    //Validar que se introduzca un nombre al añadir una categoría
    document.getElementById('category-name').addEventListener('input', checkName);

    function checkName() {

        const addCategoryForm = document.getElementById('add-category-btn');
        const categoryName = document.getElementById('category-name');

        if (categoryName.value === '') {
            addCategoryForm.disabled = true;
        } else {
            addCategoryForm.disabled = false;
        }
    }

    GetCategories();
});





