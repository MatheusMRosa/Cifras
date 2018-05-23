const readLine = require('readline');

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('1 - Encrypt the text, 2 - Decrypt the text', (answer) => {
    if (answer === '1'){
        type1()
    } else if (answer === '2'){
        type2()
    } else {
        rl.close();
    }
});


const type1 = () => {
    let count = 0;
    let textOrigin = '';
    let key = '';
    console.log("Digite um texto Claro: ");
    rl.on('line', (input) => {
        count++;
        if (count === 1) {
            console.log(`Received: ${input}`);
            textOrigin = input;
            console.log('Agora uma chave: ')
        } else {
            key = input;
            console.log("Texto encriptado: ", encrypt(textOrigin, key));
            rl.close();
        }

    });
};

const type2 = () => {
    let count = 0;
    let textEncrypted = '';
    let key = '';
    console.log("Digite um texto Encriptado: ");
    rl.on('line', (input) => {
        count++;
        if (count === 1) {
            console.log(`Received: ${input}`);
            textEncrypted = input;
            console.log('Agora uma chave: ')
        } else {
            key = input;
            console.log("Texto decriptado: ", decrypt(textEncrypted, key));
            rl.close();
        }

    });
};


const encrypt = (text, key) => {
    key = parseInt(key);
    let encrypted = [];

    for (let i = 0; i < text.length; i++) {// walk in array of the text passed for my function
        if (text[i] !== ' ') {//only validate if my text is empty in someone place
            for (let j = 0; j < letters.length; j++) {// walk in the array of the alphabet
                if (text[i] === letters[j]) {// found a letter in the alphabet
                    encrypted[i] = letters[(j + key) % letters.length]; // chose the letter for a letter of alphabet key more my position, and mod size total, because the letter can to exceed a letters of alphabet
                    break;
                }
            }
        } else {
            encrypted[i] = ' ';
        }
    }

    return encrypted.join("");
};

const decrypt = (encrypted, key) => {
    key = parseInt(key);
    let textOrigin = [];

    for (let i = 0; i < encrypted.length; i++) {
        if (encrypted[i] !== ' ') {
            for (let j = 0; j < letters.length ; j++) {
                if (encrypted[i] === letters[j]) {
                    textOrigin[i] = letters[(j - key) % letters.length]; // chose the letter for a letter of alphabet key any less my position, and mod size total, because the letter can to exceed a letters of alphabet
                    break;
                }
            }
        } else {
            textOrigin[i] = ' ';
        }
    }

    return textOrigin.join("");
};