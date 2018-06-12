const readLine = require('readline');

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const rl = readLine.createInterface({ // lib native of javascript for catch a input of keyboard
    input: process.stdin,
    output: process.stdout
});

rl.question('1 - Encrypt the text, 2 - Decrypt the text', (answer) => { // function of 'readline' for question the user
    if (answer === '1' || answer === '2') {
        run(answer)
    } else {
        rl.close();
        process.exit(0);
    }
});

const run = (typeOfFunction) => {// function receives the type of function (encrypt or decrypt)
    let count = 0; // in this section start the variables only for initialize
    let text = '';
    let key = '';

    console.log("Digite um texto: ");

    rl.on('line', (input) => { // this function read each line
        count++; // need count only for know what the first line
        if (count === 1) {
            text = input; // save the input of keyboard

            console.log('Agora uma chave: ')

        } else {
            key = input; // save the key in other variable
            let newKey = '';
            while (newKey.length < text.length) { // in this while only in case of my key is less that my text add in end of new key the key again
                newKey += key;
            }
            console.log("Texto modificado: ", cipher(text, newKey, typeOfFunction));

            rl.close();
            process.exit(0);
        }

    });
};

const cipher = (text, key, type) => { // this function receive the text and key and type of function to execute
    let newWord = '';// initialize the variable void
    type = parseInt(type); // need this only because the type is a text not number

    for (let i = 0; i < text.length; i++) { // loop in the string text for get a positions
        switch (text[i]) {
            case ' ': // verify if exist the void spaces only for not get this
                newWord += text[i];
                break;
            default:
                /*
                here a call my function for encrypt or decrypt
                this functions need 2 params
                the first is my letter of my text
                and second is a position of my key letter (for this i call the function position)
                */
                if (type === 1) { // verify what function i call encrypt or decrypt
                    newWord += encryptLetter(text[i], position(key[i]));
                    break;
                } else {
                    newWord += decryptLetter(text[i], position(key[i]));
                    break;
                }
        }
    }

    return newWord;
};

const position = (letter) => { // the function get the position in alphabet array of my letter of key
    for (let i = 0; i < alphabet.length; i += 1) {
        if (alphabet[i] === letter) {
            return i;
        }
    }
};

/*
here i use the some logical for cipher of Cesar
walk in my alphabet and verify if found my letter in alphabet
*/

const encryptLetter = (letter, key) => {
    for (let j = 0; j < alphabet.length; j++) {
        if (alphabet[j] === letter) {
            /*
            if found return my alphabet indexed by position found plus my position key, and for my array
            be it circular do to mod my size alphabet
            */
            return alphabet[(j + key) % alphabet.length];
        }
    }

};

const decryptLetter = (letter, key) => {
    for (let j = 0; j < alphabet.length; j += 1) {
        if (letter === alphabet[j]) {
            /*
            if found return my alphabet indexed by position found any less my position key, but is number small to 0,
            need to add the size of my alphabet and for my array
            be it circular do to mod my size alphabet, but if my number
            */
            return alphabet[((j - key) + alphabet.length) % alphabet.length];
        }
    }

};
