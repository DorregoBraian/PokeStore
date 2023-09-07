import { Header,Footer,CardM} from "./Components.js";

const valor = window.location.search;
const urlParams = new URLSearchParams(valor);
const query = urlParams.get('q');

var masVendidosList = ["pikachu","charmander","squirtle","bulbasaur","abra","rattata","cubone","eevee","magikarp","geodude"];
var recomendadosList = ["eevee","scyther","flareon","jolteon","nidoking","vaporeon","alakazam","gengar","nidoqueen","kabutops","marowak","charizard","blastoise","golem","mewtwo"];
var ultimosVistosList = JSON.parse(localStorage.getItem('lastVisitedList') || "[]");

$(document).ready(function () {
    $("#header").html(Header());
    $("#footer").html(Footer());
    loadByQuery(query)
})


function loadByQuery(query){
    
    switch(query){
        case "masVendidos":  loadCards(masVendidosList,"Mas Vendidos"); break;
        case "recomendados": loadCards(recomendadosList,"Recomendados"); break;
        case "vistos": loadList(ultimosVistosList,"Ultimos Visitados"); break;
        default: break;
    }
}

const loadList = (pokeList,headerText) =>{
    var newList = [];

    pokeList.forEach(p => {
        newList.push(p.name);
    });
    loadCards(newList,headerText);
}

const loadCards = (pokeList,headerText) =>{
    console.log(pokeList);
    $("#card-container-header-text").html(`${headerText}`);

    pokeList.forEach(p => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${p}`,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                $("#cardM-container").append(CardM(
                    pokemon.name,
                    PadLeft(pokemon.id,3),
                    '118.000',
                    pokemon.sprites.other['official-artwork'].front_default)
                );
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        })
    });
    //localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
}

function PadLeft(value, length) { //
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}