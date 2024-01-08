/* ////// Structure /////
InputLayer:
Neuron1     Neuron2     Neuron3 
Weight 1.1;   Weight 2.1;   Weight 3.1;
Weight 1.2;   Weight 2.2;   Weight 3.2;
Weight 1.3;   Weight 2.3;   Weight 3.3;

Hidden Layer:
Neuron1     Neuron2     Neuron3 
Weight 2.1;   Weight 2.1;   Weight 2.1;
Weight 2.2;   Weight 2.2;   Weight 2.2;

Output Layer
Neuron1 [Output];
Neuron2 [Output];
*/

export let weight_1: number[][] = 
[
    [Math.random(), Math.random(), Math.random() ],
    [Math.random(), Math.random(), Math.random() ],
    [Math.random(), Math.random(), Math.random() ],
]

export function transposeMat(mat: number[][]) {
    return mat[0].map((col, i) => mat.map(row => row[i]));
}

export let weight_2: number[][] = 
[
    [Math.random(), Math.random(), Math.random() ],
    [Math.random(), Math.random(), Math.random() ],
]