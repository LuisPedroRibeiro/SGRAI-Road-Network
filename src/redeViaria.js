import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "../three.js-master/build/three.module.js";
import Terreno from "./assets/terreno.js";



const scene = new THREE.Scene();



const cameraParameters = {
    fieldOfView : 45,
    aspectRatio : window.innerWidth / window.innerHeight,
    near : 1,
    far : 1000
};
const camera = new THREE.PerspectiveCamera(cameraParameters.fieldOfView, cameraParameters.aspectRatio, cameraParameters.near, cameraParameters.far);
camera.position.set(23, -50, 30);
camera.rotation.x = cameraParameters.fieldOfView * (Math.PI / 180);
camera.up.set(0, 0, 1);
scene.add(camera);

//TODO: Criar os terrenos pelo uso da lista recebida da Gestão de Armazéns
//TODO: Calcular o número de ligações através do custo

/*
    The color being used is Forest Green, to simulate a very simple grass "texture" on the terrain.
    The size of the terrain will be set relative to the set of points stated on the Project proposition.
*/
const terrenoParameters = {
    tamanho : 1,
    segmentos : 64,
    x : 24,
    y : -24,
    z : 0,
    cor : 0x228B22
};
const terrenoParameters1 = {
    tamanho : 1,
    segmentos : 64,
    x : 22,
    y : -27,
    z : 0,
    cor : 0x228B22
};
const rotundaParameters = {
    raioInterior : terrenoParameters.tamanho / 2,
    raioExterior : terrenoParameters.tamanho / 4,
    segmentos : 120,
    cor : 0x36454F
};
const estradaParameters = {
    largura : 0.25,
    comprimento : terrenoParameters.tamanho - rotundaParameters.raioExterior,
    cor : 0xFFFFFF
};
const terreno = new Terreno(terrenoParameters, rotundaParameters, estradaParameters);
const terreno1 = new Terreno(terrenoParameters1, rotundaParameters, estradaParameters);
scene.add(terreno.object);
scene.add(terreno1.object);


const calc = Math.pow(terrenoParameters1.x - terrenoParameters.x, 2) + Math.pow(terrenoParameters1.y - terrenoParameters.y, 2);
const d = Math.sqrt(calc) - terrenoParameters.tamanho - terrenoParameters1.tamanho;
const h = terrenoParameters1.z - terrenoParameters.z;
const dd = Math.sqrt(Math.pow(d, 2) + Math.pow(h, 2)); 
const a = Math.atan2((terrenoParameters1.y - terrenoParameters.y), (terrenoParameters1.x - terrenoParameters.x))
const i = Math.atan(h / d);
console.log(THREE.MathUtils.degToRad(90) + a);
const rampaGeometry = new THREE.PlaneGeometry(estradaParameters.largura, dd);
const rampaMaterial = new THREE.MeshBasicMaterial({ color : 0xFFFFFF, side : THREE.DoubleSide });
const p = new THREE.Mesh(rampaGeometry, rampaMaterial);

p.position.x = (terrenoParameters1.x + terrenoParameters.x) / 2;
p.position.y = (terrenoParameters1.y + terrenoParameters.y) / 2;
p.position.z = (terrenoParameters1.z + terrenoParameters.z) / 2;

//p.rotateZ(THREE.MathUtils.degToRad(90));
p.rotateZ(THREE.MathUtils.degToRad(90) + a);
p.rotateX(-i);
scene.add(p);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

controls.enablePan = true; //só mudar para false para desativar cada opção
controls.enableRotate = true;
controls.enableZoom = true;

controls.maxPolarAngle = Math.PI /2;

controls.enableDamping = false; //efeito de gravidade, mudar para true ativa
controls.dampingFactor = 0.01;



animate();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}