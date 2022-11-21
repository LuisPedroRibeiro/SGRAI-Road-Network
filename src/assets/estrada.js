import * as THREE from "../../three.js-master/build/three.module.js";

export default class Estrada {
    constructor(estradaParameters, rotundaParameters, x0, y0, orientacao) {
        let x1, x2, x3, y1, y2, y3;
        switch(orientacao) {
            case "N": 
                y0 += 0.1;
                x1 = x0 - (estradaParameters.largura / 2);
                y1 = y0 + rotundaParameters.raioExterior;
                y2 = y1 + estradaParameters.comprimento;
                x2 = x0 + (estradaParameters.largura / 2);
                this.criarNormais(estradaParameters, x1, x2, y1, y2);
                break;
            case "S": 
                y0 -= 0.1;
                x1 = x0 - (estradaParameters.largura / 2);
                y1 = y0 - rotundaParameters.raioExterior;
                y2 = y1 - estradaParameters.comprimento;
                x2 = x0 + (estradaParameters.largura / 2);
                this.criarNormais(estradaParameters, x1, x2, y1, y2);
                break;
            case "E": 
                x0 += 0.1;
                x1 = x0 + rotundaParameters.raioExterior;
                y1 = y0 - (estradaParameters.largura / 2);
                y2 = y0 + (estradaParameters.largura / 2);
                x2 = x1 + estradaParameters.comprimento;
                this.criarNormais(estradaParameters, x1, x2, y1, y2);
                break;
            case "O":
                x0 -= 0.1; 
                x1 = x0 - rotundaParameters.raioExterior;
                y1 = y0 - (estradaParameters.largura / 2);
                y2 = y0 + (estradaParameters.largura / 2);
                x2 = x1 - estradaParameters.comprimento;
                this.criarNormais(estradaParameters, x1, x2, y1, y2);
                break;
            case "NE":
                x0 ++;
                y0 ++;
                x1 = x0 + rotundaParameters.raioExterior - estradaParameters.largura;
                x2 = x1 + 0.7 + (estradaParameters.comprimento / 2);
                x3 = x2 + 0.7;
                y1 = y0 + rotundaParameters.raioExterior - estradaParameters.largura;
                y2 = y1 + 0.7 + (estradaParameters.comprimento / 2);
                y3 = y2 - 0.7;
                this.criarDiagonais(estradaParameters, x0, x1, x2, x3, y0, y1, y2, y3);
                break;
            case "NO":
                x0 --;
                y0 ++;
                x1 = x0 - rotundaParameters.raioExterior + estradaParameters.largura;
                x2 = x1 - 0.7 - (estradaParameters.comprimento / 2);
                x3 = x2 - 0.7;
                y1 = y0 + rotundaParameters.raioExterior - estradaParameters.largura;
                y2 = y1 + 0.7 + (estradaParameters.comprimento / 2);
                y3 = y2 - 0.7;
                this.criarDiagonais(estradaParameters, x0, x1, x2, x3, y0, y1, y2, y3);
                break;
            case "SE":
                x0 ++;
                y0 --;
                x1 = x0 + rotundaParameters.raioExterior - estradaParameters.largura;
                x2 = x1 + 0.7 + (estradaParameters.comprimento / 2);
                x3 = x2 + 0.7;
                y1 = y0 - rotundaParameters.raioExterior + estradaParameters.largura;
                y2 = y1 - 0.7 - (estradaParameters.comprimento / 2);
                y3 = y2 + 0.7;
                this.criarDiagonais(estradaParameters, x0, x1, x2, x3, y0, y1, y2, y3);
                break;
            case "SO":
                x0 --;
                y0 --;
                x1 = x0 - rotundaParameters.raioExterior + estradaParameters.largura;
                x2 = x1 - 0.7 - (estradaParameters.comprimento / 2);
                x3 = x2 - 0.7;
                y1 = y0 - rotundaParameters.raioExterior + estradaParameters.largura;
                y2 = y1 - 0.7 - (estradaParameters.comprimento / 2);
                y3 = y2 + 0.7;
                this.criarDiagonais(estradaParameters, x0, x1, x2, x3, y0, y1, y2, y3);
                break;
            default: console.error("Something went wrong.");
        }


    }

    criarNormais(estradaParameters, x1, x2, y1, y2) {
        const estradaShape = new THREE.Shape();
        estradaShape.moveTo(x1, y1);
        estradaShape.lineTo(x1, y2);
        estradaShape.lineTo(x2, y2);
        estradaShape.lineTo(x2, y1);
        const estradaGeometry = new THREE.ShapeGeometry(estradaShape);
        const estradaMaterial = new THREE.MeshBasicMaterial({ color: estradaParameters.cor, 
            side: THREE.DoubleSide, depthWrite: false });
        estradaMaterial.depthTest = false;
        this.object = new THREE.Mesh(estradaGeometry, estradaMaterial);
    }

    criarDiagonais(estradaParameters, x0, x1, x2, x3, y0, y1, y2, y3) {
        const estradaShape = new THREE.Shape();
        estradaShape.moveTo(x1, y0);
        estradaShape.lineTo(x0, y1);
        estradaShape.lineTo(x2, y2);
        estradaShape.lineTo(x3, y3);
        estradaShape.lineTo(x1, y0);
        const estradaGeometry = new THREE.ShapeGeometry(estradaShape);
        const estradaMaterial = new THREE.MeshBasicMaterial({ color: estradaParameters.cor, 
            side: THREE.DoubleSide, depthWrite: false });
        estradaMaterial.depthTest = false;
        this.object = new THREE.Mesh(estradaGeometry, estradaMaterial);
    }
}