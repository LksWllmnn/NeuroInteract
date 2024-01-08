import { Neuron } from "./Neuron";
export class Layer {
    constructor(type, amountNeurons, _weights) {
        this.neurons = [];
        this.type = type;
        this.amountNeurons = amountNeurons;
        console.log("hello from layer");
        if (_weights) {
            let transpose = [];
            for (let i = 0; i < _weights.length; i++) {
                let newNeuron = new Neuron();
                for (let j = 0; i < _weights[i].length; j++) {
                    transpose = _weights[i].map((col, j) => _weights.map(row => row[j]));
                }
                newNeuron.setWeights(transpose[i]);
                this.neurons.push(newNeuron);
            }
        }
    }
}
//# sourceMappingURL=Layer.js.map