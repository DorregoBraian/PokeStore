import {Footer,Header} from "./Components.js";

const valor = window.location.search;
const urlParams = new URLSearchParams(valor);
const pokeName = urlParams.get('n');

var botonCarrito = $("boton-carrito");

window.onload = () => {
    $("#header").html(Header());
    $("#footer").html(Footer());
    LoadPokemon();
}

const LoadPokemon = () => {
    var url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {

            showMainInfo(datos.name,datos.id,datos.sprites.other['official-artwork'].front_default);
            
            // --------------------------- Descripcion ---------------------------------
            $("#info-altura").append(datos.height + " metros");
            $("#info-exp").append(datos.base_experience + " puntos");
            $("#info-peso").html(datos.weight + " kilogramos");
            $.each(datos.types, function (index, tipo) {
                $("#info-tipo").append(tipo.type.name + " ");
            });
            $.each(datos.abilities, function (index, habilidad) {
                $("#info-habilidades").append(habilidad.ability.name + " ");
            });

            // ---------------------------- Stats ----------------------------------
            $("#hp").html(datos.stats[0].base_stat);
            $("#ataque").html(datos.stats[1].base_stat);
            $("#defensa").html(datos.stats[2].base_stat);
            $("#ataque-e").html(datos.stats[3].base_stat);
            $("#defensa-e").html(datos.stats[4].base_stat);
            $("#velocidad").html(datos.stats[5].base_stat);

            /*------------------- favorito ---------------------- */
            checkForFavorite(datos.name);
            
            $("#favorito").click(function(){
                manageFavorite(datos.name)
            });

            $("#boton-carrito").click(function(){
                addToCart(datos.name);
            });

            $("#boton-comprar").click(function(){
                buyPoke(datos.name);
            });

            /*---------------- ultimo visitado ------------------------*/
            
            updateLastVisited(datos.name,url);
            //localStorage.clear();
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const showMainInfo = (pokeNombre, pokeNumber, pokeImg) =>{
    $("#main-nombre").html(`#${PadLeft(pokeNumber,3)} ${pokeNombre} + UltraBall de regalo`);
    $("#pokeImagen").attr("src",pokeImg);
}

function PadLeft(value, length) { //
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}

function updateLastVisited(name,url){
    var lastVisitedList = JSON.parse(localStorage.getItem('lastVisitedList') || "[]");
    for(var i = 0 ; i<lastVisitedList.length ; i++){
        if((lastVisitedList[i].name) == name){
            lastVisitedList.splice(i,1);
        }
    }
    lastVisitedList.unshift({name:name, url:url});
    if(lastVisitedList.length >= 11) lastVisitedList.pop();
    localStorage.setItem('lastVisitedList', JSON.stringify(lastVisitedList));
}

function checkForFavorite(name){
    let favoriteList = JSON.parse(localStorage.getItem('favoriteList') || "[]");
    favoriteList.forEach(p => {
        if(p.name==name){
            $("#corazon").attr("src","../Images/corazon-on.png");
            $("#favorito").html("Quitar de Favoritos");
        }
    });
}

function manageFavorite(name){
    let favoriteList = JSON.parse(localStorage.getItem('favoriteList') || "[]");

    var src = $("#corazon").attr("src");
    if (src == "../Images/corazon-off.png") {
        $("#corazon").attr("src","../Images/corazon-on.png");
        $("#favorito").html("Quitar de Favoritos");
        favoriteList.push({name:name});
    }
    else{
        $("#corazon").attr("src","../Images/corazon-off.png");
        $("#favorito").html("Agregar a Favoritos");
        for(var i = 0 ; i<favoriteList.length ; i++){
            if((favoriteList[i].name) == name){
                favoriteList.splice(i,1);
            }
        }
    }
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    console.log(favoriteList);
}

function addToCart(name){
    var cartList = JSON.parse(localStorage.getItem('cartList') || "[]");
    cartList.push({name:name});
    localStorage.setItem('cartList', JSON.stringify(cartList));
    alert(`El pokemon ${name} fue agregado al carrito`);
}

function buyPoke(name){
    var cartList = JSON.parse(localStorage.getItem('cartList') || "[]");
    cartList.push({name:name});
    localStorage.setItem('cartList', JSON.stringify(cartList));
    document.location.href = "Carrito.html";
}
















            /*var color = datos.types[0].type.name;
            switch (color) {
                case "fire":
                    $("#imagen").css({"background-color":"red"})
                    $("#info-estadistica").css({"background-color":"red"})
                    $("#info").css({"background-color":"red"})
                    break;
                case "water":
                    $("#imagen").css({"background-color":"DodgerBlue"})
                    $("#info-estadistica").css({"background-color":"DodgerBlue"})
                    $("#info").css({"background-color":"DodgerBlue"})
                    break;
                case "grass":
                    $("#imagen").css({"background-color":"LimeGreen"})
                    $("#info-estadistica").css({"background-color":"LimeGreen"})
                    $("#info").css({"background-color":"LimeGreen"})
                    break;
                case "normal":
                    $("#imagen").css({"background-color":"DarkGrey"})
                    $("#info-estadistica").css({"background-color":"DarkGrey"})
                    $("#info").css({"background-color":"DarkGrey"})
                    break;
                case "ice":
                    $("#imagen").css({"background-color":"LightCyan"})
                    $("#info-estadistica").css({"background-color":"LightCyan"})
                    $("#info").css({"background-color":"LightCyan"})
                    break;
                case "ghost":
                    $("#imagen").css({"background-color":"Purple"})
                    $("#info-estadistica").css({"background-color":"Purple"})
                    $("#info").css({"background-color":"Purple"})
                    break;
                case "ground":
                    $("#imagen").css({"background-color":"SaddleBrown"})
                    $("#info-estadistica").css({"background-color":"SaddleBrown"})
                    $("#info").css({"background-color":"SaddleBrown"})
                    break;
                case "psychic":
                    $("#imagen").css({"background-color":"Peru"})
                    $("#info-estadistica").css({"background-color":"Peru"})
                    $("#info").css({"background-color":"Peru"})
                    break;
                case "steel":
                    $("#imagen").css({"background-color":"Silver"})
                    $("#info-estadistica").css({"background-color":"Silver"})
                    $("#info").css({"background-color":"Silver"})
                    break;
                case "electric":
                    $("#imagen").css({"background-color":"Yellow"})
                    $("#info-estadistica").css({"background-color":"Yellow"})
                    $("#info").css({"background-color":"Yellow"})
                    break;
                case "bug":
                    $("#imagen").css({"background-color":"YellowGreen"})
                    $("#info-estadistica").css({"background-color":"YellowGreen"})
                    $("#info").css({"background-color":"YellowGreen"})
                    break;
                case "fighting":
                    $("img").css({"background-color":"OrangeRed"})
                    $("#info-estadistica").css({"background-color":"OrangeRed"})
                    $("#info").css({"background-color":"OrangeRed"})
                    break;
                case "dragon":
                    $("#imagen").css({"background-color":"SlateBlue"})
                    $("#info-estadistica").css({"background-color":"SlateBlue"})
                    $("#info").css({"background-color":"SlateBlue"})
                    break;               
                default:
                    break;
            }*/

