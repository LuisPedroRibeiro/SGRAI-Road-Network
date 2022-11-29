//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "../three.js-master/build/three.module.js";
import Terreno from "./assets/terreno";
import Camara from "./assets/camara";
import Rampa from "./assets/rampa";

export default class RedeViaria {
    public scene;


    private camaraParameters = {
        fieldOfView : 45,
        aspectRatio : window.innerWidth / window.innerHeight,
        near : 1,
        far : 1000
    };

    private terrenoParameters = {
        tamanho : 1,
        segmentos : 64,
        x : 24,
        y : -24,
        z : 0,
        cor : 0x228B22
    };
    private terrenoParameters1 = {
        tamanho : 1,
        segmentos : 64,
        x : 22,
        y : -27,
        z : 0,
        cor : 0x228B22
    };
    private rotundaParameters = {
        raioInterior : this.terrenoParameters.tamanho / 2,
        raioExterior : this.terrenoParameters.tamanho / 4,
        segmentos : 120,
        cor : 0x36454F
    };
    private estradaParameters = {
        largura : 0.25,
        comprimento : this.terrenoParameters.tamanho - this.rotundaParameters.raioExterior,
        cor : 0xFFFFFF
    };
    

    constructor() {      
        this.scene = new THREE.Scene();
        this.criarTerrenos();



        const rampa = new Rampa(this.estradaParameters, this.terrenoParameters, this.terrenoParameters1);
        this.scene.add(rampa.object);

        /*
        const controls = new OrbitControls(camera,renderer.domElement);
        controls.enabled = true;
        camera.position.set( 10, 10, 80 );
        controls.update();

        controls.target.set(20,0,20);

        controls.panSpeed = 0.8;
        controls.zoomSpeed = 1.1;
        controls.rotateSpeed = 0.9;
        controls.minDistance = 5;
        controls.maxDistance = 100;

        /*const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
        controls.mouseButtons = { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE };*/ //troca o botão do rato do pan com o do rotate em relação ao default
        /*
        controls.enablePan = true; //só mudar para false para desativar cada opção
        controls.enableRotate = true;
        controls.enableZoom = true;

        controls.maxPolarAngle = Math.PI /2;

        controls.enableDamping = false; //efeito de gravidade, mudar para true ativa
        controls.dampingFactor = 0.01;
        */


    }

    criarTerrenos() {    
        const terreno = new Terreno(this.terrenoParameters, this.rotundaParameters, this.estradaParameters);
        const terreno1 = new Terreno(this.terrenoParameters1, this.rotundaParameters, this.estradaParameters);
        this.scene.add(terreno.object);
        this.scene.add(terreno1.object);
    }

}