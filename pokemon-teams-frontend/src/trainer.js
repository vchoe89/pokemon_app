const trainerCards = document.querySelector(".trainer-cards")

function fetchAllTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainerArray => {
    trainerArray.forEach((trainer) => {renderTrainer(trainer)})
  })
}

function renderTrainer(trainer) {
  let trainerProfile = document.createElement("div")
  trainerProfile.classList.add("card")
  trainerProfile.dataset.id = trainer.id

  trainerCards.appendChild(trainerProfile)
  trainerProfile.innerHTML = `
    <p>${trainer.name}</p>
    <button id=${trainer.id} data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul class="myPokemon">
    </ul>`

  let addButton = trainerProfile.children[1]
  if (trainer.pokemons.length >= 6) {
    addButton.style.display = "none"
  }
  else {
    addButton.addEventListener("click", (e) => createPokemon(e, trainer))
  }

  if (trainer.pokemons) {
    trainer.pokemons.forEach((pokemon) => {
      let li = document.createElement("li")
      trainerProfile.querySelector(".myPokemon").appendChild(li)
      li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class='release' data-pokemon-id=${pokemon.id}>Release</button>`
      li.children[0].addEventListener("click", deletePokemon)
    })
  }



}

function createPokemon(e, trainer) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
    })
  })
    .then(response => response.json())
    .then(newPokemon => {
      addToTrainer(e, newPokemon)
    })
}


function addToTrainer(e, newPokemon){
  let li = document.createElement("li")
  e.target.parentElement.children[2].appendChild(li)
  li.innerHTML = `${newPokemon.nickname} (${newPokemon.species}) <button class='release' data-pokemon-id=${newPokemon.id}>Release</button>`
  li.children[0].addEventListener("click", deletePokemon)
  let liLength = e.target.parentElement.children[2].childElementCount
  let addButton = e.target.parentElement.children[1]
    if (liLength >= 6) {
      addButton.style.display = "none"
    }
    else {
      addButton.style.display = "block"
    }
}

function deletePokemon(e) {
  let deleteId = e.target.dataset.pokemonId
  fetch(POKEMONS_URL+ '/' + deleteId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      pokemon_id: deleteId
    })
  })
  .then(response => response.json())
  .then(pokemon => {
      removePokemon(pokemon, e)
  })
}

function removePokemon(pokemon, e) {
  let pokeListCheck = e.target.parentElement.parentElement
  let addBtn = e.target.parentElement.parentElement.parentElement.children[1]
  e.target.parentElement.remove()
  if (pokeListCheck.childElementCount <= 5){
    addBtn.style.display = "block"
  }
  else {
    addBtn.style.display = "none"
  }
}
