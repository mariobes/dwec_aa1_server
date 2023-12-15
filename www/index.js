document.addEventListener('DOMContentLoaded', function () {

    let drawData = (data) => {
        data.forEach(category => {
          let parent = document.getElementById('ul')
          let child = document.createElement('li')
          // child.innerText = JSON.stringify(category)
          child.innerText = category.name
          parent.appendChild(child)
        })
      }
  
      fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawData(data))

});