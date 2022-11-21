import * as THREE from "../../three.js-master/build/three.module.js";

export default class Estrada {
    constructor(estradaParameters, rotundaParameters, x0, y0, orientacao) {
        let x1, x2, y1, y2;
        x1 = x0 - (estradaParameters.largura / 2);
        y1 = y0 + rotundaParameters.raioExterior;
        y2 = y1 + estradaParameters.comprimento;
        x2 = x0 + (estradaParameters.largura / 2);
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
        this.object.rotateZ(this.calcularRotacao(orientacao));
    }

    calcularRotacao(orientacao) {
        return orientacao * (Math.PI / 180);
    }
}