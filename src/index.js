let goodDogFilter = false
const dogBar = document.getElementById('dog-bar')

function fetchAllDogs() {
    fetch('http://localhost:3000/pups')
    .then(response => {
        if(!response.ok) {
            throw new Error("Error on fetch: " + response.statusText)
        } return response.json()
    })
    .then(dogData => {
        
        dogData.forEach(dog => {

            appendDogs(dog)

        })
    })
    .catch(error => {
        console.error(error)
        console.log(error)
    })
}

function appendDogs(dog) {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name

    if(!goodDogFilter || (goodDogFilter && dog.isGoodDog)) {
        dogBar.appendChild(dogSpan)
        dogSpan.addEventListener('click', () => renderDog(dog))
    }
}

function renderDog(dog) {
    let dogBox = document.getElementById('dog-info')

    let dogImg = document.createElement('img')
    dogImg.src = dog.image

    let dogTitle = document.createElement('h2')
    dogTitle.textContent = dog.name

    let dogStatus = document.createElement('button')
    dogStatus.textContent = dog.isGoodDog ? 'Good Dog' : 'Bad Dog'
    dogStatus.setAttribute('id', 'dog-status')
    dogStatus.addEventListener('click', () => handleDogStatusChange(dog))

    dogBox.innerHTML= ''
    dogBox.appendChild(dogImg)
    dogBox.appendChild(dogTitle)
    dogBox.appendChild(dogStatus)
}

function handleDogStatusChange(dog) {
    dog.isGoodDog = !dog.isGoodDog
    renderDog(dog)

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers:
        {
            "Content-Type" : "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify(
        {
            'isGoodDog' : dog.isGoodDog
        })
    })
}

function handleFilterDogs() {

    const dogFilterBtn = document.getElementById('good-dog-filter')
    dogFilterBtn.addEventListener('click', () => {
        goodDogFilter = !goodDogFilter
        dogBar.innerHTML = ''
        fetchAllDogs()
    })
}

handleFilterDogs()
fetchAllDogs()