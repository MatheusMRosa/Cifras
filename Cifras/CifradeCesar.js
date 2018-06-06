const readLine = require('readline');

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let typeOfFunction = 0;

const rl = readLine.createInterface({ // lib native of javascript for catch a input of keyboard
    input: process.stdin,
    output: process.stdout
});

rl.question('1 - Encrypt the text, 2 - Decrypt the text', (answer) => { // function of 'readline' for question the user
    if (answer === '1') {
        typeOfFunction = 1;
        run()
    } else if (answer === '2') {
        typeOfFunction = 2;
        run()
    } else {
        rl.close();
        process.exit(0);
    }
});

const run = () => {
    let count = 0;
    let text = '';
    let key = '';
    console.log("Digite um texto: ");
    rl.on('line', (input) => {
        count++;
        if (count === 1) {
            text = input;
            console.log('Agora uma chave: ')
        } else {
            key = input;
            if (typeOfFunction === 1) {
                console.log("Texto encriptado: ", encrypt(text, key));
            } else {
                console.log("Texto decriptado: ", decrypt(text, key));
            }
            rl.close();
            process.exit(0);
        }

    });
};


const encrypt = (text, key) => {
    key = parseInt(key);
    let encrypted = [];

    for (let i = 0; i < text.length; i++) {// walk in array of the text passed for my function
        if (text[i] !== ' ') {//only validate if my text is empty in someone place
            for (let j = 0; j < alphabet.length; j++) {// walk in the array of the alphabet
                if (text[i] === alphabet[j]) {// found a letter in the alphabet
                    encrypted[i] = alphabet[(j + key) % alphabet.length]; // chose the letter for a letter of alphabet key more my position, and mod size total, because the letter can to exceed a alphabet of alphabet
                    break;
                }
            }
        } else {
            encrypted[i] = ' ';// case have in the text one space in this line retreat of the logical of encrypt
        }
    }

    return encrypted.join("");
};

const decrypt = (encrypted, key) => { // the logical is very like so function encrypt, the difference is the position in the array is decreased
    key = parseInt(key);
    let textOrigin = [];

    for (let i = 0; i < encrypted.length; i++) {
        if (encrypted[i] !== ' ') {
            for (let j = 0; j < alphabet.length; j++) {
                if (encrypted[i] === alphabet[j]) {
                    textOrigin[i] = alphabet[((j - key) + alphabet.length) % alphabet.length]; // chose the letter for a letter of alphabet key any less my position, and mod size total, because the letter can to exceed a alphabet of alphabet
                    break;
                }
            }
        } else {
            textOrigin[i] = ' ';
        }
    }

    return textOrigin.join("");
};