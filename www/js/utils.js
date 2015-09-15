
lowercaseString = 'abcdefghijklmnopqrstuvwxyz';
uppercaseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
digitString = '1234567890';
specialCharString = '#%&()*+-¿?@[]_';
allCharacters = lowercaseString+uppercaseString+digitString+specialCharString;

function getAvailableCharacters(acceptedCharacters){
    characterTypes=acceptedCharacters.split("|");
    availableCharacters = '';
    for(var i=0; i<characterTypes.length; i++){
        characterType = characterTypes[i];
        if(characterType == 'abc'){
            availableCharacters += lowercaseString;
        }else if(characterType == 'ABC'){
            availableCharacters += uppercaseString;
        }else if (characterType == '123') {
            availableCharacters += digitString;
        }else if (characterType == '-?!') {
            availableCharacters += specialCharString;
        }
    }
    return availableCharacters;
}

function getAcceptedCharString(lowercase, uppercase, numbers, specialChar){
    acceptedCharacters = '';
    if(lowercase){
        acceptedCharacters+='abc'
    }
    if(uppercase){
        if(acceptedCharacters==''){
            acceptedCharacters+='ABC'
        }else{
            acceptedCharacters+='|ABC'
        }
    }
    if (numbers) {
        if(acceptedCharacters==''){
            acceptedCharacters+='123'
        }else{
            acceptedCharacters+='|123'
        }
    }
    if (specialChar) {
        if(acceptedCharacters==''){
            acceptedCharacters+='-?!'
        }else{
            acceptedCharacters+='|-?!'
        }
    }
    return acceptedCharacters;
}

function stringToCipherString(cipherName, availableCharacters) {
    if (cipherName == 'vigeniereCipher') {
        cipherObject = new vigeniereCipher(availableCharacters);
    }else if (cipherName == 'affineCipher'){
        cipherObject = new affineCipher(availableCharacters);
    }else if (cipherName == 'caesarCipher') {
        cipherObject = new caesarCipher(availableCharacters);
    }else if(cipherName == 'columnarTranspCipher'){
        cipherObject = new columnarTranspositionCipher(availableCharacters);
    }
    return JSON.stringify(cipherObject).replace(/\"/g, "");
}

function cipherStringToCipher(cipherString, availableCharacters) {
    cipherArray = cipherString.split('|');
    cipher=String(cipherArray[0]);
    if (cipher == 'VigeniereCipher') {
        cipherObject = new vigeniereCipher(availableCharacters);
    }else if (cipher == 'AffineCipher'){
        cipherObject = new affineCipher(availableCharacters);
        if (typeof cipherArray[1]!='undefined') {
            keyA=cipherArray[1];
            cipherObject.setKeyA(keyA);
        }
    }else if (cipher == 'CaesarCipher') {
        cipherObject = new caesarCipher(availableCharacters);
    }else if(cipher == 'ColumnarTranspCipher'){
        cipherObject = new columnarTranspositionCipher(availableCharacters);
    }
    return cipherObject;
}

function getKey(cipher, keyString) {
    if(cipher instanceof affineCipher || cipher instanceof caesarCipher) {
        key=allCharacters.indexOf(keyString[0])+1;
    }else{
        key=keyString;
    }
    return key;
}
