const pokemonList = document.getElementById("pokemon-list");
const buttonLoadMore = document.getElementById("loadMore");
const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemonsJson = []) => {
    const newHtml = pokemonsJson
      .map(
        (pokemon) => `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
            </ol>
            <img src="${pokemon.photos}" 
            alt="${pokemon.name}">
        </div>
    
    </li>`
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

buttonLoadMore.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage >= maxRecords) {
    const newlimit = maxRecords - offset;
    loadPokemonItens(offset, newlimit);
    buttonLoadMore.style.display = "none";
  } else {
    loadPokemonItens(offset, limit);
  }
});
