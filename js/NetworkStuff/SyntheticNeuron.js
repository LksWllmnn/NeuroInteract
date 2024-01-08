import * as THREE from "three";
import { ObjectState } from "../enums/ObjectState";
import { LayerType } from "../enums/LayerType";
export class SyntheticNeuron extends THREE.Object3D {
    constructor() {
        super(...arguments);
        this.state = ObjectState.FREE;
        this.weightLines = [];
        this.pos = new THREE.Vector3();
        this.layerType = LayerType.INPUT;
    }
    createSyntheticNeuron(_pos, _type) {
        this.layerType = _type;
        const circleGeometry = new THREE.CircleGeometry(0.5, 32);
        const material = new THREE.MeshBasicMaterial({ color: _type.valueOf() });
        const circle = new THREE.Mesh(circleGeometry, material);
        this.pos.set(_pos.x, _pos.y, 0);
        this.position.set(_pos.x, _pos.y, 0);
        this.add(circle);
        circle.layers.enable(1);
        //circle.position.set(this.pos.x, this.pos.y, 0);
        return this;
    }
}
//# sourceMappingURL=SyntheticNeuron.js.map