import * as THREE from "three";
import { LayerType } from "../enums/LayerType";
import { SyntheticNeuron } from "./SyntheticNeuron";

export class NeuralNetwork {
    scene: THREE.Scene;
    inputLayer: THREE.Vector2[];
    hiddenLayer: THREE.Vector2[];
    outputLayer: THREE.Vector2[];

    inputLayerNeurons: SyntheticNeuron[];
    hiddenLayerNeurons: SyntheticNeuron[];
    outputLayerNeurons: SyntheticNeuron[];

    weight1: number[][];
    weight2: number[][];

    allLines: THREE.Line[] = [];


    constructor(_scene: THREE.Scene, weight_1: number[][], weight_2: number[][]) {
        this.scene = _scene;

        this.inputLayer = [new THREE.Vector2(-4, -3), new THREE.Vector2(-4, 0), new THREE.Vector2(-4, 3)];
        this.hiddenLayer = [new THREE.Vector2(0, -3), new THREE.Vector2(0, 0), new THREE.Vector2(0, 3)];
        this.outputLayer = [new THREE.Vector2(4, -1), new THREE.Vector2(4, 1)];

        this.inputLayerNeurons = [];
        this.hiddenLayerNeurons = [];
        this.outputLayerNeurons = [];

        this.createLayer(this.inputLayer, LayerType.INPUT);
        this.createLayer(this.hiddenLayer, LayerType.HIDDEN);
        this.createLayer(this.outputLayer, LayerType.OUTPUT);

        this.weight1 = weight_1;
        this.weight2 = weight_2;

        this.drawLinesBetweenLayers(this.inputLayerNeurons, this.hiddenLayerNeurons, weight_1);
        this.drawLinesBetweenLayers(this.hiddenLayerNeurons, this.outputLayerNeurons, weight_2);
        
    }

    

    createLayer(layer: THREE.Vector2[], type: LayerType) {
        for(let i: number = 0; i < layer.length; i++) {
            switch(type) {
                case LayerType.INPUT:
                    this.inputLayerNeurons.push(this.createSyntheticNeuron(layer[i], type));
                    break;
                case LayerType.HIDDEN:
                    this.hiddenLayerNeurons.push(this.createSyntheticNeuron(layer[i], type));
                    break;
                case LayerType.OUTPUT:
                    this.outputLayerNeurons.push(this.createSyntheticNeuron(layer[i], type));
                    break;
            }
        }
    }

    createSyntheticNeuron(_pos: THREE.Vector2, _type: LayerType, ): SyntheticNeuron {
        let neuron = new SyntheticNeuron();
        this.scene.add(neuron.createSyntheticNeuron(_pos, _type));
        return neuron;
    }

    drawLinesBetweenLayers(layer1: SyntheticNeuron[], layer2: SyntheticNeuron[], weight: number[][]) {
        for (let index1 = 0; index1 < layer1.length; index1++) {
            for (let index2 = 0; index2 < layer2.length; index2++) {
                this.drawLine(layer1[index1], layer2[index2], 0xffffff , weight[index1][index2]);
            }
        }
    }

    drawLine(startNode: SyntheticNeuron, endNode: SyntheticNeuron, color: number = 0xffffff, weight: number): THREE.Line {
        // Erstellen einer Vektorreihe, die die Positionen der Knoten enthält
        const points: THREE.Vector3[] = [];
        points.push(startNode.pos);
        points.push(endNode.pos);
    
        // Erstellen einer Liniengeometrie aus den Punkten
        const geometry: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const material: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({ color: color });
    
        // Erstellen einer Linie mit der definierten Geometrie und dem Material
        const line: THREE.Line = new THREE.Line(geometry, material);
        //line.isLine = true;
        line.renderOrder = -1;
        line.layers.enable(2);

        //let weigthLabel = new WeigthLabel(points, weight);
        //line.add(weigthLabel.createCSS2DObj());
    
        // Annahme: scene ist deine Three.js-Szene
        this.scene.add(line);
        startNode.weightLines.push(line);
        this.allLines.push(line);
    
        // Rückgabe der erstellten Linie, falls benötigt
        return line;
    }

    
}