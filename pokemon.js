const maxPokemon = 151;
const listWrapper = document.querySelector(".list_wrapper");
const searchInput = document.querySelector("#search_input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not_found_message");

let allPokemons = [];
fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${maxPokemon}`)
  .then((res) => res.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemon(allPokemons);
  });

async function fetchPokemonDataBefroreRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

function displayPokemon(pokemon) {
  listWrapper.innerHTML = "";
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list_item";
    listItem.innerHTML = `
        <div class="number_wrap">
        <p class="caption_fonts">#${pokemonID}</p>
        </div>
        <div class="img_wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}"/>
        </div>
        <div class="name_wrap">
        <p class="body3_fonts">${pokemon.name}</p>
        </div>
        `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBefroreRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  let filteredPokemons;
  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];

      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  } else {
    filteredPokemons = allPokemons;
  }
  displayPokemon(filteredPokemons);
  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search_close_icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemon(allPokemons);
  notFoundMessage.style.display = "none";
}
