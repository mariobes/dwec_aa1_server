document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

    //Al darle click a guardar añade el nuevo sitio y vuelve al index
    document.getElementById('btn-save').addEventListener('click', function() {
        addSite(categoryId);
    })

    const addSite = (categoryId) => {
        const siteName = document.getElementById('name-form').value.trim();
        const siteUrl = document.getElementById('url-form').value.trim();
        const siteUser = document.getElementById('user-form').value.trim();
        const sitePassword = document.getElementById('password-form').value.trim();
        const siteDescription = document.getElementById('description-form').value.trim();
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

        if (siteName.value.trim() === '' || siteUser.value.trim() === '' || sitePassword.value.trim() === '') {
            btnSave.disabled = true;
        } else {
            btnSave.disabled = false;
        }
    }


    //Generar contraseña segura
    let parent = document.getElementById('secure-password')
    let securePasswordBtn = document.createElement('button');
    securePasswordBtn.classList.add('btn', 'btn-sm');
    securePasswordBtn.setAttribute('onclick', "return false");
    securePasswordBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2" viewBox="0 0 16 16">
            <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5z"/>
        </svg>`
    parent.appendChild(securePasswordBtn);

    parent.addEventListener('click', function() {
        const characters = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
        let password = "";
        for (let i = 0; i < 8; i++) {
            const randomCharacter = Math.floor(Math.random() * characters.length);
            password += characters[randomCharacter];
        }
        const sitePassword = document.getElementById('password-form');
        sitePassword.value = password;
        checkNewSite();
    })


    //Al darle click a cerrar vuelve al index
    document.getElementById('btn-close').addEventListener('click', function() {
        backIndex();
    })


    //Método para volver al index
    const backIndex = () => {
        window.location.href = './index.html';     
    }

})