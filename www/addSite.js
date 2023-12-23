document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

    //Al darle click a guardar añade el nuevo sitio y vuelve al index
    document.getElementById('btn-save').addEventListener('click', function() {
        addSite(categoryId);
    })

    const addSite = (categoryId) => {
        const siteName = document.getElementById('name-form').value;
        const siteUrl = document.getElementById('url-form').value;
        const siteUser = document.getElementById('user-form').value;
        const sitePassword = document.getElementById('password-form').value;
        const siteDescription = document.getElementById('description-form').value;
        fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: siteName, 
                url: siteUrl, 
                user: siteUser, 
                password: sitePassword, 
                description: siteDescription 
            })
        })
        .then(res => res.json())
        backIndex();
    }


    //Validar que se introduzca un nombre un usuario y una contraseña al añadir un sitio
    document.getElementById('name-form').addEventListener('input', checkNewSite);
    document.getElementById('user-form').addEventListener('input', checkNewSite);
    document.getElementById('password-form').addEventListener('input', checkNewSite);

    function checkNewSite() {

        const btnSave = document.getElementById('btn-save');
        const siteName = document.getElementById('name-form');
        const siteUser = document.getElementById('user-form');
        const sitePassword = document.getElementById('password-form');

        if (siteName.value === '' || siteUser.value === '' || sitePassword.value === '') {
            btnSave.disabled = true;
        } else {
            btnSave.disabled = false;
        }
    }


    //Al darle click a cerrar vuelve al index
    document.getElementById('btn-close').addEventListener('click', function() {
        backIndex();
    })


    //Método para volver al index
    const backIndex = () => {
        window.location.href = './index.html';     
    }

})