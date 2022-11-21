import * as THREE from "../../three.js-master/build/three.module.js";

export default class Rotunda {
    constructor(rotundaParameters, rotundaLinhasExterioresParameters, rotundaLinhasInterioresParameters) {
        this.criarRotunda(rotundaParameters);
        //this.criarLinhasExteriores(rotundaLinhasExterioresParameters);
        //this.criarLinhasInteriores(rotundaLinhasInterioresParameters);
    }

    criarRotunda(rotundaParameters) {
        const rotundaGeometry = new THREE.RingGeometry(rotundaParameters.raioInterior, rotundaParameters.raioExterior, 
            rotundaParameters.segmentos);
        const rotundaMaterial = new THREE.MeshBasicMaterial({ color :  rotundaParameters.cor, side : THREE.DoubleSide });
        rotundaMaterial.depthTest = false;
        this.object = new THREE.Mesh(rotundaGeometry, rotundaMaterial);
    }

    criarLinhasExteriores(rotundaLinhasExterioresParameters) {
        const rotundaLinhasExterioresGeometry = new THREE.RingGeometry(rotundaLinhasExterioresParameters.raioInterior, 
            rotundaLinhasExterioresParameters.raioExterior, rotundaLinhasExterioresParameters.segmentos);
        const rotundaLinhasExterioresMaterial = new THREE.MeshBasicMaterial({ color : rotundaLinhasExterioresParameters.cor, 
            side : THREE.DoubleSide });
        rotundaLinhasExterioresMaterial.depthTest = false;
        const rotundaLinhasExteriores = new THREE.Mesh(rotundaLinhasExterioresGeometry, rotundaLinhasExterioresMaterial);
        this.object.add(rotundaLinhasExteriores);
    }

    criarLinhasInteriores(rotundaLinhasInterioresParameters) {
        const rotundaLinhasInterioresGeometry = new THREE.RingGeometry(rotundaLinhasInterioresParameters.raioInterior, 
            rotundaLinhasInterioresParameters.raioExterior, rotundaLinhasInterioresParameters.segmentos);
        const roundaboutLinhasInterioresMaterial = new THREE.MeshBasicMaterial({ color : rotundaLinhasInterioresParameters.cor, 
            side : THREE.DoubleSide });
        roundaboutLinhasInterioresMaterial.depthTest = false;
        const rotundaLinhasInteriores = new THREE.Mesh(rotundaLinhasInterioresGeometry, roundaboutLinhasInterioresMaterial);
        this.object.add(rotundaLinhasInteriores);
    }
}