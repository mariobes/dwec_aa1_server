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

    //Pintar los sitios
    let drawDataSites = (data) => {
        const sitesInfo = data.sites;
        let parent = document.getElementById('table-sites')
        parent.innerHTML = '';
        sitesInfo.forEach(site => {
            let row = document.createElement('tr');
            let child1 = document.createElement('td');
            child1.innerHTML = `<b>${site.name}</b>`;
            row.appendChild(child1);
            let child2 = document.createElement('td');
            child2.innerText = site.user;
            row.appendChild(child2);
            let child3 = document.createElement('td');
            child3.innerText = site.createdAt;
            row.appendChild(child3);
            parent.appendChild(row);
        })
      }

    document.getElementById('item-categorie').addEventListener('click', function(event) {
        const categoryId = event.target.getAttribute('category-id');
        fetch(`http://localhost:3000/categories/${categoryId}`)
        .then(res => res.json())
        .then(data => drawDataSites(data))
    })

    GetCategories();
});





