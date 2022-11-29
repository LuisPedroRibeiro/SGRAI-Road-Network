import * as THREE from "../../three.js-master/build/three.module.js";

export default class Camara {
    public object;

    constructor(cameraParameters) {
        this.object = new THREE.PerspectiveCamera(cameraParameters.fieldOfView, cameraParameters.aspectRatio, cameraParameters.near, cameraParameters.far);
        this.object.position.set(23, -50, 30);
        this.object.rotation.x = cameraParameters.fieldOfView * (Math.PI / 180);
        this.object.up.set(0, 0, 1);
    }
}