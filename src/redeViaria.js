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



animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}