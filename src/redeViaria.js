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
//TODO: Calcular a orientação a ser utilizada na ligação

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



const comprimentoXY = Math.sqrt(Math.pow(terrenoParameters1.x - terrenoParameters.x, 2) + 
    Math.pow(terrenoParameters1.y - terrenoParameters.y, 2)) - (terrenoParameters.tamanho) - (terrenoParameters1.tamanho);
const desnivel = terrenoParameters1.z - terrenoParameters.z;
const comprimento = Math.sqrt(Math.pow(comprimentoXY, 2) + Math.pow(desnivel, 2));
const inclinacao = Math.atan(desnivel / comprimentoXY);
const orientacao = Math.atan2((terrenoParameters1.y - terrenoParameters.y), (terrenoParameters1.x - terrenoParameters.x));
const rampaGeometry = new THREE.PlaneGeometry(estradaParameters.largura, comprimento);
const rampaMaterial = new THREE.MeshBasicMaterial({ color : estradaParameters.cor, side : THREE.DoubleSide });
rampaMaterial.depthTest = false;
const rampa = new THREE.Mesh(rampaGeometry, rampaMaterial);
rampa.position.x = (terrenoParameters1.x + terrenoParameters.x) / 2;
rampa.position.y = (terrenoParameters1.y + terrenoParameters.y) / 2;
rampa.position.z = (terrenoParameters1.z + terrenoParameters.z) / 2;
rampa.rotateZ(-orientacao);
//rampa.rotateY(inclinacao);
scene.add(rampa);
console.log("A(" + terrenoParameters.x + "; " + terrenoParameters.y + "; " + terrenoParameters.z + ")");
console.log("B(" + terrenoParameters1.x + "; " + terrenoParameters1.y + "; " + terrenoParameters1.z + ")");
console.log("Comprimento xOy: " + comprimentoXY);
console.log("Comprimento: " + comprimento);
console.log("Orientação: " + orientacao);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}