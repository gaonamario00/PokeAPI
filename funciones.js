var ID = "";
var UrlApi = "";
var data = undefined;

function buscar(){
    debugger;
    var pikachu = document.getElementById("pikachu");
    pikachu.style.display = "inline";
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
            showPoke(data);
        }
    }

}

function showPoke(data){
    debugger;
    clear();
    var element = document.getElementById('results');
    var element2 = document.getElementById('name');
    var td1 = document.createElement('h2');
    var nombreStyle = "<strong>" + data.id + ". " + data.name + "</strong>";
    
    td1.style.color="yellow";
    var img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.width = "300";
    img.height = "300";

    td1.innerHTML=nombreStyle;
    txt=document.createElement('h2');
    txt.innerHTML="Sprites";

    element.appendChild(txt);
    element.appendChild(img);
    element2.appendChild(td1);

    var td2 = document.createElement('tr');
    var typeStyle="";
    for(var i = 0; i<data.types.length;i++){
        if(i==1) typeStyle+= "/";
        types = document.createElement('h4');
        types.style.color = "yellow";
        typeStyle += data.types[i].type.name;
    }
    typeStyle+= "<br>";
    types.innerHTML = typeStyle;
    td2.appendChild(types);
    td2.style.width="20%";
    txt.innerHTML="Tipo";
    txt.style.color="yellow";
    element.appendChild(txt);
    element.appendChild(td2);

    var movStyle = "";
    for (var i = 0; i < 4; i++){
        movimiento = document.createElement('tr');
        movimiento.style.color = "yellow";
        movStyle += data.moves[i].move.name + "<br/>";
    }
    movimiento.innerHTML = movStyle;
    var txt2=document.createElement('h2');
    txt2.innerHTML="Movimiento";
    txt2.style.color="yellow";
    element.appendChild(txt2);
    element.appendChild(movimiento);
    
    
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
    C = document.getElementById("name");
    C.innerHTML = "";
    pikachu();
}

function pikachu(){
    var pikachu = document.getElementById("pikachu");
    pikachu.style.display = "none";
}
