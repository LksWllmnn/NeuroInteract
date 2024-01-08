import * as THREE from 'three';
import { InteractionFactory } from './InteractionLib/InteractionFactory';
import { InterType } from './enums/InterType';
import { NeuralNetwork } from './NetworkStuff/Model';
import { weight_1, weight_2 , transposeMat} from './testWeightsMatrix';
import {CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"
import { TFModel } from './NetworkStuff/tfModel';
import { IOLables } from './NetworkStuff/InputOutputLables';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.Renderer;
let raycaster: THREE.Raycaster;
let lablerenderer: CSS2DRenderer;

function init(): void {
    
    let tfModel = new TFModel();

    tfModel.start();
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    lablerenderer = new CSS2DRenderer();
    camera.position.z = 10;
    raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);

    let nn = new NeuralNetwork(scene, transposeMat(weight_1), transposeMat(weight_2));
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    lablerenderer.setSize(window.innerWidth, window.innerHeight);
    lablerenderer.domElement.style.position = 'absolute';
	lablerenderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(lablerenderer.domElement);

    new InteractionFactory(InterType.Wheel, renderer, camera, nn, raycaster, scene, lablerenderer);
    new IOLables(camera, renderer, scene, tfModel);
    renderAFrame();
}

function renderAFrame() {
    requestAnimationFrame( renderAFrame );
	renderer.render( scene, camera );
    lablerenderer.render( scene, camera );
}

init();

export { NeuralNetwork };
