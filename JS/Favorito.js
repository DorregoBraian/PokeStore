import { Header,Footer,CardF} from "./Components.js";

$(document).ready(function () {
    $("#header").html(Header());
    $("#footer").html(Footer());
    loadFavoritos();
    checkForEmpty();
})

const loadFavoritos = () =>{
    var favoriteList = JSON.parse(localStorage.getItem('favoriteList') || "[]");
    console.log(favoriteList);

    favoriteList.forEach(f => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${f.name}`,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                $("#cardF-container").append(CardF(
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

    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
}

function checkForEmpty(){
    var cartList = JSON.parse(localStorage.getItem('favoriteList') || "[]");
    if(cartList.length==0){
        $("#recomendado").hide();
    }
    else{
        $("#notFound").hide();
    }
}


function PadLeft(value, length) { //
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}

