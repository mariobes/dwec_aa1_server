document.addEventListener('DOMContentLoaded', function () {


    //Al darle click a cerrar vuelve al index
    let backIndex = document.getElementById('btn-close')
    backIndex.addEventListener('click', function() {
        console.log('Botón cerrar clickeado'); 
        window.location.href = './index.html';
    })
})