import { Header,Footer,Card1,Card2} from "./Components.js";

$(document).ready(function () {
    $("#header").html(Header());
    $("#footer").html(Footer());
    loadLastVisited();
    loadMasVendido();
    loadRecomendado();
    loadLastVisited2();
    checkForVisited();
})

const loadRecomendado = () => {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=4&offset=132",
        type: "GET",
        dataType: "json",
        success: function (datos) {
            $.each(datos.results, function (index, urlInfoPoke) {
                $.ajax({
                    url: urlInfoPoke.url,
                    type: "GET",
                    dataType: "json",
                    success: function (pokemon) {
                        $("#card1-container").append(Card1(
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
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

function checkForVisited(){
    var lastVisitedList = JSON.parse(localStorage.getItem('lastVisitedList') || "[]");
    if(lastVisitedList.length==0){
        $("#ultimoVisto2").hide();
        $("#ultimoVisto").hide();
    }
}

const loadMasVendido = () => {
    var listaMasVendidos = ['bulbasaur','squirtle','charmander','pikachu'];
    listaMasVendidos.forEach(p => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${p}`,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                $("#card2-container").append(Card2(
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
}

const loadLastVisited = () => {
    var lastVisitedList = JSON.parse(localStorage.getItem('lastVisitedList') || "[]");
    var lastPoke = lastVisitedList[0].name;
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${lastPoke}`,
        type: "GET",
        dataType: "json",
        success: function (pokemon) {
            $("#card3-container").append(Card2(
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
    });
}

const loadLastVisited2 = () => {
    var lastVisitedList = JSON.parse(localStorage.getItem('lastVisitedList') || "[]");
    var lastPoke;
    for(var i=0; i<4; i++){
        lastPoke=lastVisitedList[i].name;
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${lastPoke}`,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                $("#card3-container2").append(Card2(
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
        });
    };
}

function PadLeft(value, length) { //
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}



