import RedeViaria from "./redeViaria";
import Camara from "./assets/camara";

const scene = new RedeViaria();
const camara = new Camara(this.camaraParameters);
scene.add(camara);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
animate();


function animate() {
    requestAnimationFrame(animate);
    //controls.update();
    this.renderer.render(scene, camara);
}