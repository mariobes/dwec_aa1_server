document.addEventListener('DOMContentLoaded', function () {

    const URL_API = "http://localhost:3000";
    let currentCategoryId;

    //Pintar las categorias
    let drawDataCategories = (data) => {
        let parent = document.getElementById('item-category')
        parent.innerHTML = '';
        data.forEach(category => {
          let child = document.createElement('li');
          let categoryNameBtn = document.createElement('button');
          categoryNameBtn.classList.add('list-group-item', 'name-category-btn');
          categoryNameBtn.setAttribute('category-id', category.id)
          categoryNameBtn.innerText = category.name

          let deleteCategoryBtn = document.createElement('button');
          deleteCategoryBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'delete-category-btn');
          deleteCategoryBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>`;
          child.appendChild(categoryNameBtn)
          child.appendChild(deleteCategoryBtn)
          parent.appendChild(child)

          //Si hago click en la categoria llama al metodo de listar los sitios y habilita el botón de añadir sitio
          categoryNameBtn.addEventListener('click', function () {
            document.getElementById('add-site').disabled = false;
            currentCategoryId = category.id;
            GetSites(category.id);
        });

          //Si hago click en borrar llama al método para borrar la categoría, deshabilita el botón de añadir sitio y limpia la tabla de sitios
          deleteCategoryBtn.addEventListener('click', function () {
            document.getElementById('add-site').disabled = true;
            let cleanTableSities = document.getElementById('table-sites');
            cleanTableSities.innerHTML = '';
            DeleteCategory(category.id);
          });

        })
      }

    const GetCategories = () => {
        fetch(`${URL_API}/categories`)
        .then(res => res.json())
        .then(data => drawDataCategories(data))
    }


    //Borrar una categoría
    const DeleteCategory = (categoryId) => {
        fetch(`${URL_API}/categories/${categoryId}`, {
            method: 'DELETE',
        })
        .then(() => GetCategories());
    };


    //Pintar los sitios
    let drawDataSites = (data) => {
        const sitesInfo = data.sites;
        let parent = document.getElementById('table-sites')
        parent.innerHTML = '';
        sitesInfo.forEach(site => {
            let row = document.createElement('tr');
            let column1 = document.createElement('td');
            column1.innerHTML = `<b>${site.name}</b>`;
            row.appendChild(column1);
            let column2 = document.createElement('td');
            column2.innerText = site.user;
            row.appendChild(column2);
            let column3 = document.createElement('td');
            column3.innerText = site.createdAt;
            row.appendChild(column3);
            let column4 = document.createElement('td');
            let img1 = document.createElement('button');
            img1.classList.add('btn', 'btn-sm');
            img1.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                </svg>`
            let img2 = document.createElement('button');
            img2.classList.add('btn', 'btn-sm');
            img2.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>`
            let img3 = document.createElement('button');
            img3.classList.add('btn', 'btn-sm');
            img3.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>`
            column4.appendChild(img1);
            column4.appendChild(img2);
            column4.appendChild(img3);
            row.appendChild(column4);
            parent.appendChild(row);


            img2.addEventListener('click', function () {
                DeleteSite(site.id);
            });
        })
    }

    const GetSites = (categoryId) => {
        fetch(`${URL_API}/categories/${categoryId}`)
        .then(res => res.json())
        .then(data => drawDataSites(data))
    };


    //Borrar un sitio
    const DeleteSite = (siteId) => {
        fetch(`${URL_API}/sites/${siteId}`, {
            method: 'DELETE',
        })
        .then(() => GetSites(currentCategoryId));
    };


    //Inicializar popup
    document.getElementById('add-category').addEventListener('click', function() {
        document.getElementById('category-name').value = '';
        document.getElementById('add-category-btn').disabled = true;
    })


    //Añadir categoria con popup
    document.getElementById('add-category-btn').addEventListener('click', function() {
        const categoryName = document.getElementById('category-name').value.trim();
        fetch(`${URL_API}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: categoryName })
        })
        .then(res => res.json())
        .then(() => GetCategories());
    })


    //Validar que se introduzca un nombre al añadir una categoría
    document.getElementById('category-name').addEventListener('input', checkName);

    function checkName() {
        const addCategoryForm = document.getElementById('add-category-btn');
        const categoryName = document.getElementById('category-name');
        if (categoryName.value.trim() === '') {
            addCategoryForm.disabled = true;
        } else {
            addCategoryForm.disabled = false;
        }
    }


    //Al darle click a añadir nuevo sitio ir a su html
    let addSite = document.getElementById('add-site')
    addSite.addEventListener('click', function() {
        window.location.href = `./addSite.html?categoryId=${currentCategoryId}`;
    })
    
    GetCategories();
});

