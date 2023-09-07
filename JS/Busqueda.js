import { Card1, Footer, Header } from "./Components.js";

//location.reload();   //carga la paguina
//$("card1-container").load();


$(document).ready(function () {

    $("#header").html(Header());
    $("#footer").html(Footer());
    var urlPoke = "https://pokeapi.co/api/v2/pokemon";
    var btnNext;
    var btnPrevious;

    var query = $(location).attr('search');
    var params = new URLSearchParams(query);
    if(params.get("query")!=''){
        switch (params.get('tag')) {
            case "p":
                $("#queryText").html(`Pokemon: ${params.get("query")}`);
                searchByName(params.get('query').toLowerCase());
                break;
            case "t":
                $("#queryText").html(`Tipo: ${params.get("query")}`);
                searchByType(params.get('query').toLowerCase());
                break;
            case "g":
                $("#queryText").html(`Generacion: ${params.get("query")}`);
                searchByGeneration(params.get('query'));
                break;
            case "a":
                $("#queryText").html(`Habilidad: ${params.get("query")}`);
                var ability = params.get('query').toLowerCase();
                searchByAbility(ability.split(' ').join('-'));
                break;
            default:
                getPokemonByUrl(urlPoke);
                break;
        }
    }
    else{
        getPokemonByUrl(urlPoke);
        console.log("funciona el else")
    }

})

function searchByType(type) {
    $.ajax({
        async: false,
        url: "https://pokeapi.co/api/v2/type/" + type,
        type: "GET",
        dataType: "json",
        success: function (pokemon) {

            dataPokemonByUrlAndType(pokemon.pokemon)

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

function dataPokemonByUrlAndType(urlPoke) {
    $.each(urlPoke, function (index, urlPokemon) {
        $.ajax({
            async: false,
            url: urlPokemon.pokemon.url,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                //console.log(pokemon)
                $("#card1-container").append(Card1(
                    pokemon.name,
                    PadLeft(pokemon.id, 3),
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
    })

}

function searchByName(name) {
    $.ajax({
        async: false,
        url: "https://pokeapi.co/api/v2/pokemon/" + name,
        type: "GET",
        dataType: "json",
        success: function (pokemon) {
            //console.log(pokemon);
            $("#card1-container").append(Card1(
                pokemon.name,
                PadLeft(pokemon.id, 3),
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
}

function searchByGeneration(number) {
    $.ajax({
        async: false,
        url: "https://pokeapi.co/api/v2/generation/" + number,
        type: "GET",
        dataType: "json",
        success: function (pokemon) {
            //console.log(pokemon.pokemon_species);
            $.each(pokemon.pokemon_species, function (index, ListUrlPokemon) {
                //console.log(ListUrlPokemon);
                dataPokemonByUrlGeneration(ListUrlPokemon.url);
            })
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

function searchByAbility(ability) {
    $.ajax({
        async: false,
        url: "https://pokeapi.co/api/v2/ability/" + ability,
        type: "GET",
        dataType: "json",
        success: function (pokemon) {
            console.log(pokemon.pokemon);
            dataPokemonByUrlAndType(pokemon.pokemon);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

function dataPokemonByUrlGeneration(listUrl) {
    $.ajax({
        async: false,
        url: listUrl,
        type: "GET",
        dataType: "json",
        success: function (pokemon) {
            //console.log(pokemon.varieties[0]);
            dataPokemonByUrl(pokemon.varieties[0])
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

function dataPokemonByUrl(listUrl) {
    $.each(listUrl, function (index, urlPokemon) {
        $.ajax({
            async: false,
            url: urlPokemon.url,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                //console.log(pokemon)
                $("#card1-container").append(Card1(
                    pokemon.name,
                    PadLeft(pokemon.id, 3),
                    '118.000',
                    pokemon.sprites.other['official-artwork'].front_default)
                );
            },
            error: function (xhr, status, error) {
                //console.log(xhr);
                //console.log(status);
                //console.log(error);
            }
        })
    })
}

function getPokemonByUrl(urlPoke) {
    $.ajax({
        async: false,
        url: urlPoke,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            //console.log(datos.results);
            dataPokemonByUrl(datos.results);
            filterByOrden(datos.results);
            //dataPokemonByUrl(datos.results);
            
            var btnNext = (datos.next) ? `<button id="left" class="btn" data-url=${datos.next}> >> </button>` : ""
            var btnPrevious = (datos.previous) ? `<button id="right" class="btn" data-url=${datos.previous}> << </button>` : ""
            $("#paginacion").html(btnNext);
            $("#paginacion").prepend(btnPrevious);

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

$("#paginacion").click(function (e) {
    if (e.target.classList.contains('btn')) {
        var value = e.target.dataset.url
        //console.log(value);
        $(".card1").remove();
        getPokemonByUrl(value);

    }
})

function PadLeft(value, length) {
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}

function filterByOrden(listPokemon) {
    console.log(listPokemon)
    $("#filtro-orden").change(function () {
        switch ($(this).val()) {
            case "nomb-pokemon-acendente":
                var listOrdenada = listPokemon.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                })
                $(".card1").remove();
                dataPokemonByUrl(listOrdenada)
                break;
            case "nomb-pokemon-decendente":
                var listOrdenada = listPokemon.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                })
                $(".card1").remove();
                dataPokemonByUrl(listOrdenada);
                break;
            default:
                
                break;
        }
    });
}

function menuFilterT() {
    $("#filtro").change(function () {
        switch ($(this).val()) {
            case "por tipo":
                $("#type-filter").html(buttonType())  //aparese todos los botones de type
                $("#type-filter").css({ "display": "flex" })
                $("#card-types button").click(function () {
                    //colorTypeFilter($(this).text());
                    console.log($(this).text());
                    return $(this).text()
                    console.log($(this).text());
                })

                break;
            case "por exp-base":

                break;
            default:
                $("#type-filter").css({ "display": "none" })
                break;
        }
    });
}

function pintarBtnFiltroType() {
    $("#card-types").find("button").filter(function (indice, elemento) {
        switch ($(elemento).text()) {
            case "fire":
                $("#card-types button").css({ "background-color": "rgba(251,85,67,255)" })
                break;
            case "water":
                $("#card-types button").css({ "background-color": "rgba(88,172,255,255)" })
                break;
            case "grass":
                $("#card-types button").css({ "background-color": "rgba(139,217,77,255)" })
                break;
            case "normal":
                $("#card-types button").css({ "background-color": "rgba(182,182,176,255)" })
                break;
            case "ice":
                $("#card-types button").css({ "background-color": "rgba(149,240,255,255)" })
                break;
            case "ghost":
                $("#card-types button").css({ "background-color": "rgba(123,116,220,255)" })
                break;
            case "ground":
                $("#card-types button").css({ "background-color": "rgba(235,203,88,255)" })
                break;
            case "psychic":
                $("#card-types button").css({ "background-color": "rgba(245,105,183,255)" })
                break;
            case "steel":
                $("#card-types button").css({ "background-color": "rgba(196,195,219,255)" })
                break;
            case "electric":
                $("#card-types button").css({ "background-color": "rgba(253,231,57,255)" })
                break;
            case "bug":
                $("#card-types button").css({ "background-color": "rgba(194,211,31,255)" })
                break;
            case "fighting":
                $("#card-types button").css({ "background-color": "rgba(167,86,67,255)" })
                break;
            case "dragon":
                $("#card-types button").css({ "background-color": "rgba(138,119,255,255)" })
                break;
            default:
                break;
        }
    })

}

function filterByType(listPokemon, type) {
    var listNewPokemon = listPokemon.filter(function (index, listPokemones) {
        if (type == "todos") {
            dataPokemonByUrl(listPokemon);
        } else {
            listPokemon.filter(function (index, pokemon) {
                if (pokemon.types.type.name == type) {
                    dataPokemonByUrl(listNewPokemon)
                }
            })
        }
    })
    //console.log(listNewPokemon);
}
