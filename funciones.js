var ID = "";
var UrlApi = "";
var data = undefined;
var nombre = undefined;
var img = undefined;
var types = undefined;
var spin = undefined;
function buscar() {
    ID = document.getElementById("pokeID");

    if (ID.value == "" || ID.value == undefined || ID.value == null) {
        alertaAdvertencia();
    } else {
        if (ID.value <= 0 || ID.value > 898) {
            console.log(ID.value);
            alertaError();
        } else {
            var g = ID.value;
            console.log(ID.value);
            console.log(parseInt(g));
            var num = g - parseInt(g);
            console.log(num);
            if (num > 0) {
                alertaNoDecimales();
            } else {
                UrlApi = "https://pokeapi.co/api/v2/pokemon/" + ID.value;
                obtenerPokemon();
            }
        }
    }
}

function obtenerPokemon() {
    clear();
    var request = new XMLHttpRequest();
    request.open('GET', UrlApi, true);
    request.send();

    request.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var resultsData = this.response;
            data = JSON.parse(resultsData);
            mostrarPokemon(data);
        }
    }

}

function mostrarPokemon(data) {

    //muestra el numero y el nombre del pokemon
    var element = document.getElementById("results");
    nombre = document.createElement('h3');
    nombre.style.color = "white";
    var htmlStyle = "<hr/ ><strong>" + data.id + ". " + data.name + "</strong><br />";
    nombre.innerHTML = htmlStyle;
    element.appendChild(nombre);

    //inserta imagen del pokemon
    img = document.createElement('img');
    img.src = data.sprites.front_default;
    //img.src = data.sprites.other.dream_world.front_default;
    img.width = "300";
    img.height = "300";
    element.appendChild(img);

    //muestra tipo del pokemon
    htmlStyle = "<hr/ ><strong>";
    htmlStyle += "Tipo: ";
    for (var i = 0; i < data.types.length; i++) {
        if (i == 1) htmlStyle += "/";
        types = document.createElement('h2');
        types.style.color = "white";
        htmlStyle += data.types[i].type.name;
    }
    htmlStyle += "</strong><br />";
    types.innerHTML = htmlStyle;
    element.appendChild(types);


    //muestra el movimiento del pokemon
    
    var htmlStyle2 = "Movimientos: "
    for (var i = 0; i < data.moves.length; i++){
        movimiento = document.createElement('h3');
        movimiento.style.color = "white";
        htmlStyle2 += data.moves[i].move.name + "<br />";
    }
    movimiento.innerHTML = htmlStyle2;
    element.appendChild(movimiento);

    

    // muestra la region del pokemon
    // region = document.createElement('h4');
    // region.style.color = "white";
    // var htmlStyle3 = "Region: ";
    // for (var i = 0; i < data.generations.length; i++) {
    //     if (i == 1) htmlStyle += "/";
    //     types = document.createElement('h4');
    //     types.style.color = "white";
    //     htmlStyle += generations[i].generation.name;
    // }
    // htmlStyle3 += "</strong><br />";
    // region.innerHTML = htmlStyle3;
    // element.appendChild(region);    
}

function eliminarElemento(id) {
    imagen = document.getElementById(id);
    if (!imagen) {
        alert("El elemento selecionado no existe");
    }
    else {
        debugger;
        var padre = imagen.parentNode;
        padre.removeChild(imagen);
    }
}

function alertaError() {
    Swal.fire({
        title: "Valor fuera de rango",
        text: "Por favor ingrese un numero de 1-898",
        icon: "error"
    })
    clear();
}

function alertaAdvertencia() {
    Swal.fire({
        title: "Debe ingresar algun valor",
        text: "Por favor ingrese un numero de 1-898",
        icon: "warning"
    })
    clear();
}

function alertaInfo() {
    Swal.fire({
        title: "Información",
        text: "Actualmente existen 898 Pokémon con la última entrega que fue Pokémon Sword y Pokémon Shield.",
        icon: "info"
    })
}

function alertaNoDecimales() {
    Swal.fire({
        title: "Error!",
        text: "Debe ingresar un numero entero",
        icon: "error"
    })
    clear();
}

function clear() {
    var C = document.getElementById("pokeID");
    C.value = null;
    C = document.getElementById("results");
    C.innerHTML = "";
}
