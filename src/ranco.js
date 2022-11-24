import * as THREE from "../three.js-master/build/three.module.js";

const scene = new THREE.Scene();



const cameraParameters = {
    fieldOfView : 45,
    aspectRatio : window.innerWidth / window.innerHeight,
    near : 1,
    far : 1000
};
const camera = new THREE.PerspectiveCamera(cameraParameters.fieldOfView, cameraParameters.aspectRatio, cameraParameters.near, cameraParameters.far);
camera.position.set(0, -20, 20);
camera.rotation.x = cameraParameters.fieldOfView * (Math.PI / 180);
camera.up.set(0, 0, 1);
scene.add(camera);



const g = new THREE.CircleGeometry(1, 64);
const m1 = new THREE.MeshBasicMaterial({ color : 0x00FF00 });
const c1 = new THREE.Mesh(g, m1);
c1.position.x = -5;
c1.position.y = -2;
c1.position.z = 0;
scene.add(c1);

const m2 = new THREE.MeshBasicMaterial({ color : 0xFF0000 })
const c2 = new THREE.Mesh(g, m2);
c2.position.x = 5;
c2.position.y = 2;
c2.position.z = -6;
scene.add(c2);


const cat1 = Math.pow((c2.position.x ))
const d = Math.sqrt() - 2;
const dd = Math.sqrt(Math.pow(d, 2) + Math.pow(c2.position.z, 2)); 
const a = Math.atan2((c2.position.y - c1.position.y), (c2.position.x - c1.position.x))
const i = Math.atan(c2.position.z / d);
const pg = new THREE.PlaneGeometry(1, dd);
const m3 = new THREE.MeshBasicMaterial({ color : 0x0000FF, side : THREE.DoubleSide });
const p = new THREE.Mesh(pg, m3);

p.position.x = (c2.position.x + c1.position.x) / 2;
p.position.y = (c2.position.y + c1.position.y) / 2;
p.position.z = (c2.position.z + c1.position.z) / 2;

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