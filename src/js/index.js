function numAleatorio (min,max){
    return Math.floor(Math.random() * ((max+1) - min)) + min; 
}

const Pokemon = class {
    constructor(vida = numAleatorio(100,150), fotoAleatoria = "assets/pokemons/pokemon" + numAleatorio(1,5) + ".svg" ){
        this.life = vida;
        this.img = fotoAleatoria; 
    }
}

const Cazador = class {
    constructor (puntuacion = 0, imagen) {
        this.puntuacion = puntuacion;
        this.img = imagen;
    }
}

const Arquero = class extends Cazador {
    constructor () {
        super();
        this.img = "assets/cazadores/cazador" + numAleatorio(1,5) + ".svg" ;
        this.flechas = numAleatorio(200,300);
    }

    atacar(Pokemon){
        
        if(flechas > 0){
            if (Pokemon.life <= 0){
                return true;
            }else{
                let numeroFlechasAtaque = numAleatorio(10,20);
                flechas -= numeroFlechasAtaque;
                Pokemon.life -= numeroFlechasAtaque * 2;
                this.puntuacion += numeroFlechasAtaque * 2;
                if (Pokemon.life <=0){
                    this.puntuacion += 50;
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
}

const Luchador = class extends Cazador {
    constructor () {
        super();
        this.img = "assets/cazadores/cazador" + numAleatorio(1,5) + ".svg" ;
        this.fuerza = numAleatorio(20,40);
    }

    atacar(Pokemon){
        if (Pokemon.life <= 0){
            return true;
        }else{
            Pokemon.life -= this.fuerza;
            this.puntuacion += this.fuerza;
            if (Pokemon.life <=0){
                this.puntuacion += 30;
                return true;
            }else{
                return false;
            }
        }
    }
}
const botonPintar = document.querySelector('#botonPintar');

function pintarCampoLucha(){

    let personaje = new Arquero();
    console.log(personaje);

    let cazadores = document.querySelector(".cazadores")
    alert("Empieza el juego");
    const divLuchador = document.createElement('div');
    divLuchador.className = "cazador";
    divLuchador.innerHTML = '<img src="assets/cazadores/cazador1.svg"></img><span>Puntuación:' + personaje.puntuacion + "</span><span>Daño: "+ personaje.flechas +"</span>"
    cazadores.appendChild(divLuchador);
}


botonPintar.addEventListener('click', pintarCampoLucha);

