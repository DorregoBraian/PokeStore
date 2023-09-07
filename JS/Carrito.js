
import { Header,Footer,CardC} from "./Components.js";

$(document).ready(function () {
    $("#header").html(Header());
    $("#footer").html(Footer());
    checkForEmpty();
    loadCarrito();
})

let precioTotal = 0;

$("#comprarCarrito").click(function(){
    realizarCompra();
});

const loadCarrito = () =>{
    var cartList = JSON.parse(localStorage.getItem('cartList') || "[]");
    console.log(cartList);

    cartList.forEach(c => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${c.name}`,
            type: "GET",
            dataType: "json",
            success: function (pokemon) {
                $("#cardC-container").append(CardC(
                    pokemon.name,
                    PadLeft(pokemon.id,3),
                    '118.000',
                    pokemon.sprites.other['official-artwork'].front_default)
                );
                precioTotal+=118000;
                $("#total").html(`$${precioTotal}`);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        })
    });
}


function PadLeft(value, length) { //
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}

function checkForEmpty(){
    var cartList = JSON.parse(localStorage.getItem('cartList') || "[]");
    if(cartList.length==0){
        $("#recomendado").hide();
        $("#negocio").hide();
    }
    else{
        $("#emptyCart").hide();
    }
}

function realizarCompra(){
    alert("Compra Realizada Con Exito");
    var cartList = JSON.parse(localStorage.getItem('cartList') || "[]");
    cartList = [];
    localStorage.setItem('cartList', JSON.stringify(cartList));
    location.reload();
}

