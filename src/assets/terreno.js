import * as THREE from "../../three.js-master/build/three.module.js";
import Rotunda from "./rotunda.js";
import Estrada from "./estrada.js";

export default class Terreno {
    constructor(terrenoParameters, rotundaParameters, estradaParameters) {
        const terrenoGeometry = new THREE.CircleGeometry(terrenoParameters.tamanho, terrenoParameters.segmentos);
        const terrenoMaterial = new THREE.MeshBasicMaterial({ color: terrenoParameters.cor });
        this.object = new THREE.Mesh(terrenoGeometry, terrenoMaterial);
        this.object.position.set(terrenoParameters.x, terrenoParameters.y, terrenoParameters.z);

        this.criarRotunda(rotundaParameters);
        this.criarEstradas(terrenoParameters, estradaParameters, rotundaParameters);
    }

    criarRotunda(rotundaParameters) {
        const rotunda = new Rotunda(rotundaParameters);
        this.object.add(rotunda.object);
    }

    criarEstradas(terrenoParameters, estradaParameters, rotundaParameters) {
        for(let i = 0; i < 8; i ++) {
            let x0 = 0.0, y0 = 0.0, orientacao;
            if(i == 0) {
                orientacao = 0;
            } else if(i == 1) {
                orientacao = -90;
            } else if(i == 2) {
                orientacao = 180;
            } else if(i == 3) {
                orientacao = 90;
            } else if(i == 4) {
                orientacao = -45;
            } else if(i == 5) {
                orientacao = 45;
            } else if(i == 6) {
                orientacao = -135;
            } else if(i == 7) {
                orientacao = 135;
            }
            const estrada = new Estrada(estradaParameters, rotundaParameters, x0, y0, orientacao);
            this.object.add(estrada.object);
        }
    }
}