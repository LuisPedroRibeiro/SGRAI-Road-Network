import * as THREE from "../../three.js-master/build/three.module.js";

export default class Rampa {
    public object;

    constructor(estradaParameters, terrenoParameters, terrenoParameters1) {
        const calc = Math.pow(terrenoParameters1.x - terrenoParameters.x, 2) + Math.pow(terrenoParameters1.y - terrenoParameters.y, 2);
        const d = Math.sqrt(calc) - terrenoParameters.tamanho - terrenoParameters1.tamanho;
        const h = terrenoParameters1.z - terrenoParameters.z;
        const dd = Math.sqrt(Math.pow(d, 2) + Math.pow(h, 2)); 
        const a = Math.atan2((terrenoParameters1.y - terrenoParameters.y), (terrenoParameters1.x - terrenoParameters.x))
        const i = Math.atan(h / d);
        console.log(THREE.MathUtils.degToRad(90) + a);
        const rampaGeometry = new THREE.PlaneGeometry(estradaParameters.largura, dd);
        const rampaMaterial = new THREE.MeshBasicMaterial({ color : 0xFFFFFF, side : THREE.DoubleSide });
        this.object = new THREE.Mesh(rampaGeometry, rampaMaterial);
        
        this.object.position.x = (terrenoParameters1.x + terrenoParameters.x) / 2;
        this.object.position.y = (terrenoParameters1.y + terrenoParameters.y) / 2;
        this.object.position.z = (terrenoParameters1.z + terrenoParameters.z) / 2;
        
        //p.rotateZ(THREE.MathUtils.degToRad(90));
        this.object.rotateZ(THREE.MathUtils.degToRad(90) + a);
        this.object.rotateX(-i);
    }

    calcularRotacao(orientacao) {
        return orientacao * (Math.PI / 180);
    }
}