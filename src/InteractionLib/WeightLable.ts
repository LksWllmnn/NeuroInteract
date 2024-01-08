import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

export class WeigthLabel {
    isHovered: boolean = false ;
    html: HTMLDivElement;
    center: THREE.Vector3;
    weight: number; 

    constructor(center: THREE.Vector3, weight: number) {
        this.center = center;
        this.weight = weight;
        this.html = document.createElement( 'div' );
        this.html.style.backgroundColor = 'blue';
        this.html.addEventListener( 'mouseenter', () => this.isHovered = true );
        this.html.addEventListener( 'mouseexit', () => this.isHovered = false );
        this.html.addEventListener( 'wheel', (WheelEvent) => {if(this.isHovered) {this.weight = this.weight + WheelEvent.deltaY} console.log(this.weight);this.html.textContent = "" + Math.round(100*this.weight)/100; } );
        this.html.style.color = "white";
		this.html.className = 'label';
		this.html.textContent = "" + Math.round(100*this.weight)/100;
    }

    createCSS2DObj() {
        const neuronLabel = new CSS2DObject( this.html );
        var midpoint = new THREE.Vector3();
        //midpoint.addVectors(this.center[0], this.center[1]).multiplyScalar(0.5);
        neuronLabel.position.set(this.center.x, this.center.y, this.center.z);
        neuronLabel.scale.set(1, 1, 0);
        neuronLabel.layers.enable(1);
        neuronLabel.visible = false;
        return neuronLabel;
    }
}