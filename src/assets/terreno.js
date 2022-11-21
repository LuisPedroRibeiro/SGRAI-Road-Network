import * as THREE from "../../three.js-master/build/three.module.js";
import Rotunda from "./rotunda.js";
import Estrada from "./estrada.js";

export default class Terreno {
    constructor(terrenoParameters, rotundaParameters, rotundaLinhasExterioresParameters, 
        rotundaLinhasInterioresParameters, estradaParameters) {
        const terrenoGeometry = new THREE.CircleGeometry(terrenoParameters.tamanho, terrenoParameters.segmentos);
        const terrenoMaterial = new THREE.MeshBasicMaterial({ color: terrenoParameters.cor });
        this.object = new THREE.Mesh(terrenoGeometry, terrenoMaterial);

        this.criarRotunda(rotundaParameters, rotundaLinhasExterioresParameters, rotundaLinhasInterioresParameters);
        this.criarEstradas(terrenoParameters, estradaParameters, rotundaParameters);
    }

    criarRotunda(rotundaParameters, rotundaLinhasExterioresParameters, rotundaLinhasInterioresParameters) {
        const rotunda = new Rotunda(rotundaParameters, rotundaLinhasExterioresParameters, rotundaLinhasInterioresParameters);
        this.object.add(rotunda.object);
    }

    criarEstradas(terrenoParameters, estradaParameters, rotundaParameters) {
        for(let i = 0; i < 8; i ++) {
            let x0 = terrenoParameters.x, y0 = terrenoParameters.y, orientacao = "norte";
            if(i == 0) {
                orientacao = "N";
            } else if(i == 1) {
                orientacao = "E";
            } else if(i == 2) {
                orientacao = "S";
            } else if(i == 3) {
                orientacao = "O";
            } else if(i == 4) {
                orientacao = "NE";
            } else if(i == 5) {
                orientacao = "NO";
            } else if(i == 6) {
                orientacao = "SE";
            } else if(i == 7) {
                orientacao = "SO";
            }
            const estrada = new Estrada(estradaParameters, rotundaParameters, x0, y0, orientacao);
            this.object.add(estrada.object);
        }
    }
}