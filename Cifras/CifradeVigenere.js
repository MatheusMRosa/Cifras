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
        process.exit(0);
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
            let newKey = '';
            while(newKey.length < textOrigin.length){
                newKey += key;
            }
            console.log("Texto encriptado: ", encrypt(textOrigin, newKey));
            rl.close();
            process.exit(0);
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
            console.log('Agora a chave: ')
        } else {
            key = input;
            let newKey = '';
            while(newKey.length < textEncrypted.length){
                newKey += key;
            }
            console.log("Texto decriptado: ", decrypt(textEncrypted, newKey));
            rl.close();
            process.exit(0);
        }

    });
};

const encryptLetter = (letter, key) => {
    for(let i = 0; i < letter.length; i++){
        for(let j = 0; j < letters.length; j++){
            if(letters[j] === letter[i]){
                return letters[(j + key)% letters.length];
            }
        }
    }
};

const decryptLetter = (letter, key) => {
    for(let i = 0; i < letter.length; i++){
        for(let j = 0; j < letters.length; j += 1){
            if(letter[i] === letters[j]){
                return letters[((j - key)+ letters.length)% letters.length];
            }
        }
    }
};

const encrypt = (texto, key) => {
    let encrypted = '';

    for(let i = 0; i < texto.length; i++){
        switch(texto[i]){
            case ' ':
                encrypted += texto[i];
                break;
            case ',':
                encrypted += texto[i];
                break;
            case '.':
                encrypted += texto[i];
                break;
            case '!':
                encrypted += texto[i];
                break;
            case '?':
                encrypted += texto[i];
                break;
            case '"':
                encrypted += texto[i];
                break;
            default:
                encrypted += encryptLetter(texto[i], position(key[i]));
        }
    }

    return encrypted;
};

const position = (caracter) => {
    for (let i = 0; i < letters.length; i+=1){
        if (letters[i] === caracter){
            return i;
        }
    }
};

const decrypt = (textEncrypted, key) => {
    let decrypted = '';

    for(let i = 0; i < textEncrypted.length; i+=1){
        switch(textEncrypted[i]){
            case ' ':
                decrypted += textEncrypted[i];
                break;
            case ',':
                decrypted += textEncrypted[i];
                break;
            case '.':
                decrypted += textEncrypted[i];
                break;
            case '!':
                decrypted += textEncrypted[i];
                break;
            case '?':
                decrypted += textEncrypted[i];
                break;
            case '"':
                decrypted += textEncrypted[i];
                break;
            default:
                decrypted += decryptLetter(textEncrypted[i], position(key[i]));
        }
    }

    return decrypted;
};