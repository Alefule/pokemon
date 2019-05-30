import cazadorImages from '../assets/cazadores/*.svg';
import pokemonImages from '../assets/pokemons/*.svg';

function numAleatorio (min,max){
    return Math.floor(Math.random() * ((max+1) - min)) + min; 
}

const Pokemon = class {
    constructor(vida = numAleatorio(100,150), fotoAleatoria = pokemonImages["pokemon"+ numAleatorio(1,5)]){
        this.life = vida;
        this.img = fotoAleatoria; 
    }
}

const Cazador = class {
    constructor (puntuacion = 0, imagen) {
        this.puntuacion = puntuacion;
        this.img = cazadorImages;
    }
}

const Arquero = class extends Cazador {
    constructor () {
        super();
        this.img = cazadorImages["cazador"+ numAleatorio(1,5)];
        this.flechas = numAleatorio(200,300);
    }

    atacar(Pokemon){
        
        if(this.flechas > 0){
            if (Pokemon.life <= 0){
                return true;
            }else{
                let numeroFlechasAtaque = numAleatorio(10,20);
                this.flechas -= numeroFlechasAtaque;
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
        this.img = cazadorImages["cazador"+ numAleatorio(1,5)];
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
const botonAtacar = document.querySelector('#botonAtacar');

const arrayLuchadores = [];
const arrayPokemons = [];

function pintarCampoLucha(){
    let numJugadores = numAleatorio(3,6);

    

    for(let i = 1; i<= numJugadores; i++){
        let tipoCazador = numAleatorio(1,2);
        if (tipoCazador == 1){
            //Se pinta un arquero
            const personaje = new Arquero();
            const cazadores = document.querySelector(".cazadores")
            const divLuchador = document.createElement('div');
            divLuchador.className = "cazador";
            divLuchador.innerHTML = `<span>${personaje.constructor.name + " " +i }</span>
                            <img src="${personaje.img}">
                            <span>Puntuación: ${personaje.puntuacion}</span>
                            <span>Flechas: ${personaje.flechas}</span>`
            cazadores.appendChild(divLuchador);
            arrayLuchadores.push(personaje);

        }else{
            const personaje = new Luchador();
            const cazadores = document.querySelector(".cazadores")
            const divLuchador = document.createElement('div');
            divLuchador.className = "cazador";
            divLuchador.innerHTML = `<span>${personaje.constructor.name + " " +i}</span>
                                    <img src="${personaje.img}">
                                    <span>Puntuación: ${personaje.puntuacion}</span>
                                    <span>Fuerza: ${personaje.fuerza}</span>`
            cazadores.appendChild(divLuchador);
            arrayLuchadores.push(personaje);
        }

        //Pintar un pokemon por cazador
        const pokemon = new Pokemon();
        const pokemons = document.querySelector(".pokemons")
        const divPokemon = document.createElement('div');
        divPokemon.className = "pokemon";
        divPokemon.innerHTML = `<span>${pokemon.constructor.name + " " +i}</span>
                                <img src="${pokemon.img}">
                                <span>Vida: ${pokemon.life}</span>`
        pokemons.appendChild(divPokemon);
        arrayPokemons.push(pokemon);
    }


    botonPintar.style.display = "none";
    botonAtacar.style.display = "unset";
}


function atacar(){

    console.log(arrayLuchadores);
    console.log(arrayPokemons);
    arrayLuchadores[0].atacar(arrayPokemons[0]);

}


botonPintar.addEventListener('click', pintarCampoLucha);
botonAtacar.addEventListener('click', atacar);

