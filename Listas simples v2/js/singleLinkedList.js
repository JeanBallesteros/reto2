/* Desactivar o habilitar inputs y radiobutton según select */
$( function() {
    $("#functionSelected").change( function() {
        if ($(this).val() === "1") {
            $("#valorN").prop("disabled", false);
            $("#posicionN").prop("disabled", true);
            document.getElementById("aggInicio").disabled = false;
            document.getElementById("aggFinal").disabled = false;
        }else if($(this).val() === "2"){
            $("#valorN").prop("disabled", true);
            $("#posicionN").prop("disabled", true);
            document.getElementById("aggInicio").disabled = false;
            document.getElementById("aggFinal").disabled = false;
        }else if($(this).val() === "3"){
            $("#valorN").prop("disabled", true);
            $("#posicionN").prop("disabled", false);
            document.getElementById("aggInicio").disabled = true;
            document.getElementById("aggFinal").disabled = true;
        }else if($(this).val() === "4"){
            $("#valorN").prop("disabled", true);
            $("#posicionN").prop("disabled", false);
            document.getElementById("aggInicio").disabled = true;
            document.getElementById("aggFinal").disabled = true;
        }else if($(this).val() === "5"){
            $("#valorN").prop("disabled", false);
            $("#posicionN").prop("disabled", false);
            document.getElementById("aggInicio").disabled = true;
            document.getElementById("aggFinal").disabled = true;
        }else if($(this).val() === "6"){
            $("#valorN").prop("disabled", false);
            $("#posicionN").prop("disabled", false);
            document.getElementById("aggInicio").disabled = true;
            document.getElementById("aggFinal").disabled = true;
        }else if($(this).val() === "7"){
            $("#valorN").prop("disabled", true);
            $("#posicionN").prop("disabled", true);
            document.getElementById("aggInicio").disabled = true;
            document.getElementById("aggFinal").disabled = true;
        }
    });
    
});

const capturaValorInputAnonima = function() {
    let valoresNodos = document.getElementById("nodos").value;
    document.getElementById("nodosIngresados").innerHTML = valoresNodos;
};

/* Función para limpiar inputs */
function limpiarInputs(){
    document.getElementById("nodos").value = "";
    document.getElementById("nodosIngresados").value = "";
    document.getElementById("files").value = "";
    document.getElementById("list").value = "";
    document.getElementById("myInput").value = "";
    document.getElementById("ver").value = "";
    document.getElementById("eu").value = "";
    document.getElementById("eu2").value = "";

    let campos = arregloImages.length;
    for (let i = 0; i < campos; i++) {
        arregloImages.pop(); 
        if(arregloImages.length === 1){
            arregloImages.shift();
        }
    }
    let campos2 = arregloTxt.length;
    for (let i = 0; i < campos2; i++) {
        arregloTxt.pop(); 
        if(arregloTxt.length === 1){
            arregloTxt.shift();
        }
    }
    console.log(arregloTxt.length);
    console.log(arregloImages);
    console.log(arregloTxt);
}

/* Tipos de funciones

const capturaValorInputFlecha = () => {
    let valoresNodos = document.getElementById("nodos").value;
    document.getElementById("nodosIngresados").innerHTML = valoresNodos;
};
function funcionEstandar() {
    let valoresNodos = document.getElementById("nodos").value;
    document.getElementById("nodosIngresados").innerHTML = valoresNodos;
} */

/* Arreglo de ruta de imágenes*/
const arregloImages = [];

function cargueImagenes(eventoSeleccionar){
    let files = eventoSeleccionar.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        /* Cargue de sólo imágenes */
        if (!f.type.match('image.*')){
            continue;
        }
        /* Capturar información de la imagen: tipo, nombre, tamaño */
        let infoArchivo = new FileReader();
        infoArchivo.onload = (function(imagenSeleccionada) {
            return function(imagen) {
                /* Crear etiqueta HTML en el DOM */
                let span = document.createElement('span');
                
                /* Escribimos en la etiqueta span */
                span.innerHTML = [
                    '<img class="thumb" width="100px" heigth="100px" id="eu" src="', imagen.target.result, ' "title=" ', escape(imagenSeleccionada.name), ' "/> '
                ].join('');

                /* Esta línea llena con cada iteración el array con el nombre 
                de las imágenes añadidas */ 
                arregloImages.push(escape(imagenSeleccionada.name));

                document.getElementById('list').insertBefore(span, null);
            };
        })(f);
        /* Función de la API FileReader */
        /* Hace la lectura del contenido de un objeto Blob 
        Trabaja con el atributo result que devuelve los datos del fichero, en este caso la imagen seleccionada*/
        infoArchivo.readAsDataURL(f);
    }
    
    console.log(arregloImages);
}
document.getElementById('files').addEventListener('change', cargueImagenes, false);

/* Cargue de archivo txt */
let input = myInput;
let infoArchivo = new FileReader;
input.addEventListener('change', onChange);

/* Cargue del archivo */
function onChange(event){
    /* event es el evento de selección */
    /* target es el tipo de archivo seleccionado */
    /* files[0] sólo permite cargue de un archivo */
    let archivo = event.target.files[0];
    /* readAsText se utiliza para leer el contenido de los archivos */
    infoArchivo.readAsText(archivo);
    /* Permite ejecutar la función onload después de cargar el archivo */
    infoArchivo.onload = onLoad;
}

/* Arreglo en el que se almacena cada línea
 de un archivo de texto que seleccione */
const arregloTxt = [];

/* Lectura del contenido del archivo */
function onLoad(){
    let contenidoTxt = infoArchivo.result;
    let lecturaLineaPorLinea = contenidoTxt.split('\n');
    let contenido = '';
    contenido += lecturaLineaPorLinea;

    /* Ciclo que llena el arreglo con las líneas de texto */
    for (let i = 0; i < lecturaLineaPorLinea.length; i++) {
        lecturaLineaPorLinea[i]; 
        arregloTxt.push(lecturaLineaPorLinea[i]);
    }
    
    console.log(arregloTxt);
    document.getElementById('ver').innerHTML = contenido;
}


/* Arreglo en el que se almacenan todas 
las imágenes que tiene la lista */
const arregloImagesGeneral = [];

/* Dividir una cadena e ingresar valores del input
enlaces de imagen y el txt. */
function añadirNodosCampos(){
    var cadena = document.getElementById("nodos").value;
    var separa = cadena.split(",");
    for (let i = 0; i < separa.length; i++) {
        if(separa[i] != ""){
            var cadena = separa[i];
            instClass.añadirNodoF(cadena); 
        } 
    }
    for (let i = 0; i < arregloImages.length; i++){
        instClass.añadirNodoF(arregloImages[i]);
    }
    for (let i = 0; i < arregloTxt.length; i++){
        instClass.añadirNodoF(arregloTxt[i]);
    }
    console.log(separa);
    console.log(arregloImages);
    console.log(arregloTxt);
    instClass.imprimirArrayList();

    /* Ciclo que va llenando poco a poco el arreglo general 
    de imágenes que se van agregando cada vez que se 
    actualiza la lista */
    for (let i = 0; i < arregloImages.length; i++) {
        arregloImagesGeneral.push(arregloImages[i]);
    }

}

/* Función que muestra las imágenes temporalmente mientras 
se actualizan estas mismas*/
function imagenes(){
    document.getElementById("imagenes").innerHTML = ""; 

    for (let i = 0; i < arregloImagesGeneral.length; i++) {
        let img = new Image();
        img.src = "img/"+arregloImagesGeneral[i];
        img.width = "150";
        img.height = "100";
        document.getElementById("imagenes").appendChild(img);
    }
}

function opciones() {
    let seleccion = document.getElementById("functionSelected").value;
    
    if ((seleccion === "1") && (document.getElementById("aggInicio").checked)){
        document.getElementById("nodoPorDefault").innerHTML = "";
        instClass.añadirNodoI(document.getElementById("valorN").value);
        instClass.imprimirArrayList();
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "1") && (document.getElementById("aggFinal").checked)){
        document.getElementById("nodoPorDefault").innerHTML = "";
        instClass.añadirNodoF(document.getElementById("valorN").value);
        instClass.imprimirArrayList();
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "2") && (document.getElementById("aggInicio").checked)){
        document.getElementById("nodoPorDefault").innerHTML = "";
        /* instClass.eliminarNodoI(); */
        let eNI = instClass.eliminarNodoI().valor;

        /* Ciclo que elimina la imagen del array general 
        que se vaya removiendo de la lista */
        for (let i = 0; i < arregloImagesGeneral.length; i++) {
            if(eNI == arregloImagesGeneral[i]){
                let indice = arregloImagesGeneral.indexOf(arregloImagesGeneral[i]); 
                arregloImagesGeneral.splice(indice, 1);
            }
        }

        instClass.imprimirArrayList();
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "2") && (document.getElementById("aggFinal").checked)){
        document.getElementById("nodoPorDefault").innerHTML = "";
        /* instClass.eliminarNodoF(); */
        let eNF = instClass.eliminarNodoF().valor;
        
        /* Ciclo que elimina la imagen del array general 
        que se vaya removiendo de la lista */
        for (let i = 0; i < arregloImagesGeneral.length; i++) {
            if(eNF == arregloImagesGeneral[i]){
                let indice = arregloImagesGeneral.indexOf(arregloImagesGeneral[i]); 
                arregloImagesGeneral.splice(indice, 1);
            }
        } 

        instClass.imprimirArrayList();

        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "3")){
        document.getElementById("nodoPorDefault").innerHTML = "";
        instClass.imprimirArrayGetPosicion(instClass.getPosicionPuntero(parseInt(document.getElementById("posicionN").value)).valor)
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "4")){
        document.getElementById("nodoPorDefault").innerHTML = "";
        /* instClass.removerNodoPorPosicion(parseInt(document.getElementById("posicionN").value)); */
        let rNPP = instClass.removerNodoPorPosicion(parseInt(document.getElementById("posicionN").value));

        /* Ciclo que elimina la imagen del array general 
        que se vaya removiendo de la lista */
        for (let i = 0; i < arregloImagesGeneral.length; i++) {
            if(rNPP == arregloImagesGeneral[i]){
                var indice = arregloImagesGeneral.indexOf(arregloImagesGeneral[i]); 
                arregloImagesGeneral.splice(indice, 1);
            }
        } 

        instClass.imprimirArrayList();
        console.log(instClass);
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "5")){
        document.getElementById("nodoPorDefault").innerHTML = "";

        let mVN = instClass.getPosicionPuntero(parseInt(document.getElementById("posicionN").value)).valor;
        instClass.modificarValorNodo(parseInt(document.getElementById("posicionN").value), document.getElementById("valorN").value); 
        
        /* Ciclo que elimina la imagen del array general 
        que se vaya modificando de la lista */
        for (let i = 0; i < arregloImagesGeneral.length; i++) {
            if(mVN == arregloImagesGeneral[i]){
                var indice = arregloImagesGeneral.indexOf(arregloImagesGeneral[i]);
                arregloImagesGeneral.splice(indice, 1);
            }
        }
        
        instClass.imprimirArrayList();
        console.log(instClass);
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "6")){
        document.getElementById("nodoPorDefault").innerHTML = "";
        instClass.insertarNodoPorPosicion(document.getElementById("valorN").value, parseInt(document.getElementById("posicionN").value));
        instClass.imprimirArrayList();
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else if((seleccion === "7")){
        document.getElementById("nodoPorDefault").innerHTML = "";
        instClass.invertirNodos();
        instClass.imprimirArrayList();
        console.log(instClass); 
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
    }else{
        document.getElementById("nodoPorDefault").innerHTML = "";
        document.getElementById("valorN").value = "";
        document.getElementById("posicionN").value = "";
        alert("¡Vuelve a verificar la información!")
    }
}

/* Creamos un objeto imagen utilizando el método createElement()
let nodo = document.createElement("img");
img.src = "";
document.getElementById("body").appendChild(nodo);
Acceder a un objeto imagen
let imagenNodo = document.getElementById("myImg");
 Agregar texto de la imagen
down.innerHTML = "Nombre de la imagen";
*/

class NodeClass {

    constructor(valor) {
        this.valor = valor;
        this.next = null;
    }
}

class listasSimples {
    constructor() {
            this.head = null;
            this.tail = null;
            this.length = 0;
    }
    
    /* Métodos de la lista: añadir, eliminar, buscar, actualizar valor */
    añadirNodoF(valor) {
        /* Instancia de la clase NodeClass */
        let newNode = new NodeClass(valor);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    añadirNodoI(valor) {
        let newNode = new NodeClass(valor);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    eliminarNodoF() {
        if (!this.head) return undefined;
        let nodoVisitado = this.head;
        let nuevaColaLista = nodoVisitado;
        while (nodoVisitado.next) {
            nuevaColaLista = nodoVisitado;
            nodoVisitado = nodoVisitado.next;
        }
        this.tail = nuevaColaLista;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return nodoVisitado;
    }
    eliminarNodoI() {
        if (!this.head) return undefined;
        let cabezaActual = this.head;
        this.head = cabezaActual.next;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return cabezaActual;
    }

    getPosicionPuntero(index) {
        if (index < 0 || index >= this.length) return null;
        let contadorPuntero = 0;
        let nodoVisitado = this.head;
        while(contadorPuntero !== index){
            nodoVisitado = nodoVisitado.next;
            contadorPuntero++;
        }
        return nodoVisitado;
    }

    modificarValorNodo(index, valor) {
        let encontrarNodo = this.getPosicionPuntero(index);
        let aux = encontrarNodo;
        if (encontrarNodo) {
            encontrarNodo.valor = valor;

            /* Este return se tuvo que modificar 
            para que diera resultado la impresión
             de las imágenes que hay en la lista */
            return aux;
        }
        return false;
    }

    removerNodoPorPosicion(index) {
        let nodoVisitad = this.head;
        let nodoAnteriorAlVisitado = null;
        if (index < 0 || index >= this.length) return null;
        if (index === 0) this.head = nodoVisitad.next;
        else {
            for (let i = 0; i < index; i++) {
                nodoAnteriorAlVisitado = nodoVisitad;
                nodoVisitad = nodoVisitad.next;
            };
            nodoAnteriorAlVisitado.next = nodoVisitad.next;
        };
        this.length--;
        return nodoVisitad.valor;
    }

    insertarNodoPorPosicion(valor, index) {
        let newNode = new NodeClass(valor);
        let nodoVisitado = this.head;
        let nodoAnteriorAlVisitado;
        if (index < 0 || index >= this.length) return null;
        if (index === 0) this.añadirNodoI(valor);
        else {
            for (let i = 0; i < index; i++) {
                nodoAnteriorAlVisitado = nodoVisitado;
                nodoVisitado = nodoVisitado.next;
            }
            newNode.next = nodoVisitado;
            nodoAnteriorAlVisitado.next = newNode;
        }
        this.length++;
    }
    removerNodoPorValor(valor) {
        let nodoVisitado = this.head;
        let nodoAnteriorAlVisitado = null;
        while (nodoVisitado !== null) {
            if (nodoVisitado.valor === valor) {
                if (!nodoAnteriorAlVisitado)
                    this.head = nodoVisitado.next;
                else
                    nodoAnteriorAlVisitado.next = nodoVisitado.next;
                this.length--;
                return nodoVisitado.valor;
            }
            nodoAnteriorAlVisitado = nodoVisitado;
            nodoVisitado = nodoVisitado.next;
        }
        return null;
    }

    /* Implementar método reverse (invertir nodos de la lista) */
    invertirNodos() {
        if(!this.head) return false;
        let nodoVisitado = this.head;
        this.head = this.tail;
        this.tail = nodoVisitado;

        let nodoAnteriorAlVisitado = null;
        let next;

        for (let i = 0; i < this.length-1; i++) {
            next = nodoVisitado.next;
            nodoVisitado.next = nodoAnteriorAlVisitado;
            nodoAnteriorAlVisitado = nodoVisitado;
            nodoVisitado = next;
        }
        return true;
    }

    imprimirArrayList() {
        let arregloNodos = [];
        let nodoVisitado = this.head;
        while (nodoVisitado) {
            arregloNodos.push(nodoVisitado.valor);
            nodoVisitado = nodoVisitado.next;
        }
        document.getElementById("listaPorDefault").innerHTML = arregloNodos;
        document.getElementById("listaCreada").innerHTML = arregloNodos;
    }

    imprimirArrayGetPosicion(nodoBuscado){
        console.log(nodoBuscado);
        document.getElementById("nodoPorDefault").innerHTML = nodoBuscado;
    }
}


let instClass = new listasSimples();
instClass.añadirNodoF(5);
instClass.añadirNodoI(4);
instClass.añadirNodoI(3);
instClass.añadirNodoI(2);
instClass.añadirNodoI(1);
instClass.añadirNodoI(7);
instClass.añadirNodoI(8);
instClass.añadirNodoI(9);
instClass.removerNodoPorPosicion(1); /* Elimina nodo con valor 3 */
instClass.insertarNodoPorPosicion("Nuevo nodo", 0);
instClass.removerNodoPorValor(3);
console.log(instClass);

instClass.imprimirArrayList();


