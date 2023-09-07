import {Footer, Header} from "./Components.js";

$(document).ready(function () {
    $("#header").html(Header());
    $("#footer").html(Footer());
    enviarForm();

})

function enviarForm(){
    var email = $("#email").val();
    console.log(email);
    $("#form").attr("action","https://formsubmit.co/"+email);
    $("#form").attr("method","POST");
    $("#form").append('<input type="hidden" name="_next" value="http://127.0.0.1:5500/HTML/Index.html">') 
    $("#form").append('<input type="hidden" name="_captcha" value="false">')
}

function enviarForm2() {
    $("#enviar").click(function() {
        if (validaForm()) {
            var email =$("#email").val();
            $("#form").prop("action","https://formsubmit.co/rayan22dorrego@gmail.com");
            $("#form").prop("method","POST");
            $("#form").append('<input type="hidden" name="_next" value="http://127.0.0.1:5500/HTML/Index.html">') 
            $("#form").append('<input type="hidden" name="_captcha" value="false">') 

        }      
      });
}

function validaForm(){
    if($("#nombre").val() == ""){
        alert("El campo no puede estar vacío.");
        $("#nombre").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#email").val() == ""){
        alert("El campo no puede estar vacío.");
        $("#apellidos").focus();
        return false;
    }
    if($("#asunto").val() == ""){
        alert("El campo no puede estar vacío.");
        $("#direccion").focus();
        return false;
    }
    if($("#comentario").val() == ""){
        alert("El campo no puede estar vacío.");
        return false;
    }
}    
















