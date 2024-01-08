import * as THREE from "three";
import { ObjectState } from "../enums/ObjectState";
import { LayerType } from "../enums/LayerType";

export class SyntheticNeuron extends THREE.Object3D {
    state: ObjectState = ObjectState.FREE;
    weightLines: THREE.Object3D[] = [];
    pos: THREE.Vector3 = new THREE.Vector3();
    layerType: LayerType = LayerType.INPUT;

    createSyntheticNeuron(_pos: THREE.Vector2, _type: LayerType, ): THREE.Object3D {
        this.layerType = _type;
        const circleGeometry = new THREE.CircleGeometry(0.5, 32);
        const material = new THREE.MeshBasicMaterial({ color: _type.valueOf() });
        const circle = new THREE.Mesh(circleGeometry, material);
        this.pos.set(_pos.x, _pos.y, 0);
        this.position.set(_pos.x, _pos.y, 0);
        this.add(circle)
        circle.layers.enable(1);
        //circle.position.set(this.pos.x, this.pos.y, 0);
        return this;
    }
}