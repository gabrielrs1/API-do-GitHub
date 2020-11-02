function addUser() {
    var inputElement = document.querySelector('input[name=user]').value

    var ulElement = document.querySelector('ul')
    var liElement = document.createElement('li')
    liElement.style.listStyle = 'none'
    liElement.innerHTML = 'Carregando...'
    ulElement.appendChild(liElement)

    var myPromise = function() {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest()
    
            xhr.open('GET', `https://api.github.com/users/${inputElement}`)
            xhr.send(null)
    
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject('[ERROR] Usuário inexistente')
                    }
                }
            }
        })
    }
    
    myPromise()
    .then(function(response) {
        liElement.innerHTML = response.login
    })
    .catch(function(error) {
        alert(error)
    })
}

