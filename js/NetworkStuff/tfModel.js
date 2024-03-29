import * as tf from '@tensorflow/tfjs';
export class TFModel {
    constructor() {
        this.model = tf.sequential();
        // Define a custom event
        this.trainingDoneEvent = new CustomEvent('trainingDone');
    }
    async start() {
        let predButton = document.getElementById("PredictButton");
        if (predButton) {
            this.stylePredBut(predButton);
            predButton.addEventListener("click", this.clickedPredictButton);
        }
        this.loader = document.getElementById("loaderScreen");
        this.epochLoader = document.getElementById("epochLoader");
        // Read file content synchronously
        const response = await fetch('wohnungen.txt');
        const content = await response.text();
        // Split content into lines
        const lines = content.split('\n');
        const shuffled_lines = tf.tensor(lines).dataSync();
        console.log(tf.tensor(shuffled_lines).shape);
        const all_inputs = [];
        const all_labels = [];
        // Iterate over each line and create training data
        for (let index = 0; index < shuffled_lines.length; index++) {
            const line = shuffled_lines[index].toString();
            const [input_str, label_str] = line.split(';');
            const input_list = input_str.split(',').map(Number);
            const label = parseInt(label_str, 10);
            all_inputs.push(input_list);
            all_labels.push(label);
        }
        const x_train = tf.tensor(all_inputs.slice(0, 300));
        console.log(x_train.shape);
        const y_train = tf.oneHot(tf.tensor1d(all_labels.slice(0, 300), 'int32'), 2);
        console.log(y_train.shape);
        const x_val = tf.tensor(all_inputs.slice(300));
        const y_val = tf.oneHot(tf.tensor1d(all_labels.slice(300), 'int32'), 2);
        // Define a simple model.
        this.model.add(tf.layers.inputLayer({ inputShape: [3] }));
        this.model.add(tf.layers.dense({ units: 3, activation: 'relu' }));
        this.model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));
        this.model.weights.forEach(w => {
            console.log(w.name, w.shape);
        });
        // Compile the model
        this.model.compile({
            loss: 'categoricalCrossentropy',
            optimizer: tf.train.adam(0.01),
            metrics: ['accuracy']
        });
        this.train(x_train, y_train, x_val, y_val);
    }
    async train(x_train, y_train, x_val, y_val) {
        console.log("train start");
        await this.model.fit(x_train, y_train, {
            epochs: 200,
            verbose: 1,
            validationData: [
                x_val,
                y_val
            ],
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    if (this.epochLoader)
                        this.epochLoader.innerHTML = "training in Epoch: " + epoch + "/200";
                },
                onTrainEnd: () => {
                    if (this.loader)
                        this.loader.style.display = "none";
                    window.dispatchEvent(this.trainingDoneEvent);
                }
            }
        });
        //console.log(await this.predict(1,1,50));
    }
    stylePredBut(button) {
        button.style.position = "absolute";
        button.style.top = "5px";
        button.style.left = "20px";
    }
    clickedPredictButton() {
        this.predict(1, 1, 200);
    }
    async predict(village, rooms, price) {
        let test = tf.tensor([[rooms, village, price]]);
        let pred = this.model.predict(test);
        let result = await pred.array();
        return result;
    }
}
//# sourceMappingURL=tfModel.js.map