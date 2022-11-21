import * as THREE from "../three.js-master/build/three.module.js";
//import Plane from "./plane.js";

const scene = new THREE.Scene();



const cameraParameters = {
    fieldOfView : 45,
    aspectRatio : window.innerWidth / window.innerHeight,
    near : 1,
    far : 1000
};
const camera = new THREE.PerspectiveCamera(cameraParameters.fieldOfView, cameraParameters.aspectRatio, cameraParameters.near, cameraParameters.far);
camera.position.set(0, -10, 10);
camera.rotation.x = cameraParameters.fieldOfView * (Math.PI / 180);
scene.add(camera);



/*
    The color being used is Forest Green, to simulate a very simple grass "texture" on the terrain.
    The size of the terrain will be set relative to the set of points stated on the Project proposition.
*/
const terrainParameters = {
    xSize : 20,
    ySize : 20,
    color : 0x228B22
};
const terrainGeometry = new THREE.PlaneGeometry(terrainParameters.xSize, terrainParameters.ySize);
const terrainMaterial = new THREE.MeshBasicMaterial({ color: terrainParameters.color });
const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
scene.add(terrainMesh);



/*
    The color being used is Charcoal, to make a more realist representation of the road.
    The roundaboutMaterial.depthTest is being used to ensure that the Roundabout does not overlap the terrain.
*/

const roundaboutParameters = {
    innerRadius : 4,
    outerRadius : 2,
    segments : 120,
    color : 0x36454F
};
const roundaboutGeometry = new THREE.RingGeometry(roundaboutParameters.innerRadius, roundaboutParameters.outerRadius, roundaboutParameters.segments);
const roundaboutMaterial = new THREE.MeshBasicMaterial({ color :  roundaboutParameters.color, side : THREE.DoubleSide });
roundaboutMaterial.depthTest = false;
const roundaboutMesh = new THREE.Mesh(roundaboutGeometry, roundaboutMaterial);
terrainMesh.add(roundaboutMesh);



const roundaboutOuterLinesParameters = {
    innerRadius : roundaboutParameters.innerRadius,
    outerRadius : roundaboutParameters.innerRadius - 0.1,
    segments : roundaboutParameters.segments,
    color : 0xFFFFFF
};
const roundaboutOuterLinesGeometry = new THREE.RingGeometry(roundaboutOuterLinesParameters.innerRadius, roundaboutOuterLinesParameters.outerRadius, roundaboutOuterLinesParameters.segments);
const roundaboutOuterLinesMaterial = new THREE.MeshBasicMaterial({ color : roundaboutOuterLinesParameters.color, side : THREE.DoubleSide });
roundaboutOuterLinesMaterial.depthTest = false;
const roundaboutOuterLinesMesh = new THREE.Mesh(roundaboutOuterLinesGeometry, roundaboutOuterLinesMaterial);
roundaboutMesh.add(roundaboutOuterLinesMesh);



const roundaboutInnerLinesParameters = {
    innerRadius : roundaboutParameters.outerRadius + 0.1,
    outerRadius : roundaboutParameters.outerRadius,
    segments : roundaboutParameters.segments,
    color : 0xFFFFFF
};
const roundaboutInnerLinesGeometry = new THREE.RingGeometry(roundaboutInnerLinesParameters.innerRadius, roundaboutInnerLinesParameters.outerRadius, roundaboutInnerLinesParameters.segments);
const roundaboutInnerLinesMaterial = new THREE.MeshBasicMaterial({ color : roundaboutInnerLinesParameters.color, side : THREE.DoubleSide });
roundaboutInnerLinesMaterial.depthTest = false;
const roundaboutInnerLinesMesh = new THREE.Mesh(roundaboutInnerLinesGeometry, roundaboutInnerLinesMaterial);
roundaboutMesh.add(roundaboutInnerLinesMesh);



const roadParameters = {
    width : 1,
    length : (terrainParameters.xSize / 2) - roundaboutParameters.outerRadius,
    color : 0x36454F
};
const roadShape1 = new THREE.Shape();
const x0 = 0.1, y0 = 0.1, z = 0.0;
const x1 = x0 - (roadParameters.width / 2);
const y1 = y0 + roundaboutParameters.outerRadius;
const y2 = y1 + roadParameters.length;
const x2 = x0 + (roadParameters.width / 2);
roadShape1.moveTo(x1, y1);
roadShape1.lineTo(x1, y2);
roadShape1.lineTo(x2, y2);
roadShape1.lineTo(x2, y1);
const roadGeometry1 = new THREE.ShapeGeometry(roadShape1);
const roadMaterial1 = new THREE.MeshBasicMaterial({ color: roadParameters.color, side: THREE.DoubleSide, depthWrite: false });
roadMaterial1.depthTest = false;
const roadMesh1 = new THREE.Mesh(roadGeometry1, roadMaterial1);
terrainMesh.add(roadMesh1);



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



animate();
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}