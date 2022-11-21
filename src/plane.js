import * as THREE from "../three.js-master/build/three.module.js";

export default class Plane {
    constructor() {
        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.MeshBasicMaterial({ color : 0x000000 });
        this.object = new THREE.Mesh(geometry, material);
        this.object.rotation.x = -Math.PI / 2.0;
    }
}