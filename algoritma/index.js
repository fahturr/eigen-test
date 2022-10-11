const test1 = (word) => {
    const splitWord = word.split(/(\d+)/);
    let result = '';

    result += [...splitWord[0]].reverse().join("");
    result += splitWord[1];

    console.log(result);
}

const test2 = (sentences) => {
    const splitSentences = sentences.split(" ");
    let max = 0;
    let index = 0;

    splitSentences.forEach((v, i) => {
        if (v.length > max) {
            max = v.length;
            index = i;
        }
    });

    console.log(`${splitSentences[index]}: ${max} character`)
};

const test3 = (input, query) => {
    const count = [];

    for (const q of query) {
        let temp = 0;
        for (const inp of input) {
            if (inp === q) temp++;
        }
        count.push(temp);
    }

    console.log(count);
};

const test4 = (matrix) => {
    let diagonalPertama = 0;
    let diagonalKedua = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i === j) diagonalPertama += matrix[i][j]
            if (i + j === matrix[i].length - 1) diagonalKedua += matrix[i][j];
        }
    }
    console.log(Math.abs(diagonalPertama - diagonalKedua));
};

(() => {
    test1('mangstap1');
    test2('Saya sangat senang mengerjakan soal algoritma');
    test3(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']);
    test4([[1, 2, 0], [4, 5, 6], [7, 8, 9]]);
})();