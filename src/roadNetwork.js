import * as THREE from "../three.js-master/build/three.module.js";
import Terrain from "./assets/terreno.js";
//import Plane from "./plane.js";

const scene = new THREE.Scene();



const cameraParameters = {
    fieldOfView : 45,
    aspectRatio : window.innerWidth / window.innerHeight,
    near : 1,
    far : 1000
};
const camera = new THREE.PerspectiveCamera(cameraParameters.fieldOfView, cameraParameters.aspectRatio, cameraParameters.near, cameraParameters.far);
camera.position.set(0, -2, 2);
camera.rotation.x = cameraParameters.fieldOfView * (Math.PI / 180);
scene.add(camera);



/*
    The color being used is Forest Green, to simulate a very simple grass "texture" on the terrain.
    The size of the terrain will be set relative to the set of points stated on the Project proposition.
*/
const terrenoParameters = {
    tamanho : 1,
    segmentos : 64,
    x : 0,
    y : 0,
    z : 0,
    cor : 0x228B22
};
const terrenoParameters1 = {
    tamanho : 8,
    segmentos : 64,
    x : 47,
    y : 6,
    z : 9,
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
    cor : 0x36454F
};
const terrain = new Terrain(terrenoParameters, rotundaParameters, estradaParameters);
const terrain1 = new Terrain(terrenoParameters1, rotundaParameters, estradaParameters);
scene.add(terrain.object);
scene.add(terrain1.object);



/*
    The color being used is Charcoal, to make a more realist representation of the road.
    The roundaboutMaterial.depthTest is being used to ensure that the Roundabout does not overlap the terrain.
*/



/*
const roadParameters = {
    width : 1,
    length : terrainParameters.size - roundaboutParameters.outerRadius,
    color : 0x36454F
};
const roadLineShape = new THREE.Shape();
let x0 = 0.2, y0 = 0.2, z = 0.0;
let x1 = x0 - ((roadParameters.width + 0.1) / 2);
let y1 = y0 + roundaboutParameters.outerRadius;
let y2 = y1 + roadParameters.length;
let x2 = x0 + ((roadParameters.width + 0.1) / 2);
roadLineShape.moveTo(x1, y1);
roadLineShape.lineTo(x1, y2);
roadLineShape.lineTo(x2, y2);
roadLineShape.lineTo(x2, y1);
const roadLineGeometry = new THREE.ShapeGeometry(roadLineShape);
const roadLineMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, depthWrite: false });
roadLineMaterial.depthTest = false;
const roadLineMesh = new THREE.Mesh(roadLineGeometry, roadLineMaterial);
terrainMesh.add(roadLineMesh);

const roadShape1 = new THREE.Shape();
x0 = 0.1, y0 = 0.1, z = 0.0;
x1 = x0 - (roadParameters.width / 2);
y1 = y0 + roundaboutParameters.outerRadius;
y2 = y1 + roadParameters.length;
x2 = x0 + (roadParameters.width / 2);
roadShape1.moveTo(x1, y1);
roadShape1.lineTo(x1, y2);
roadShape1.lineTo(x2, y2);
roadShape1.lineTo(x2, y1);
const roadGeometry1 = new THREE.ShapeGeometry(roadShape1);
const roadMaterial1 = new THREE.MeshBasicMaterial({ color: roadParameters.color, side: THREE.DoubleSide, depthWrite: false });
roadMaterial1.depthTest = false;
const roadMesh1 = new THREE.Mesh(roadGeometry1, roadMaterial1);
terrainMesh.add(roadMesh1);*/



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



animate();
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}