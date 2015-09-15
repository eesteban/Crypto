function caesarCipher(validCharacters){
	if (typeof validCharacters == 'string' && validCharacters!='') {
		validCharacters = validCharacters;
		maxCharacters = validCharacters.length;
	}else{
		throw "notValidCharacters";
	}

	function isValidText(text){
		if (typeof text == 'string' && text!='') {
			for ( var i = 0; i < text.length; i++ ){
				if (validCharacters.indexOf(text.charAt(i)) === -1) {
					return false;
				}
			}
		        return true;
		} else{
			return false;
		}
	}

	function isValidKey(number){
    return (number>0 && number % 1 === 0);
	}

	this.encrypt = function(key, msg) {
		key = parseInt(key);
		if (isValidKey(key)) {
			if (isValidText(msg)) {
				var encryptedMsg="";
				for(var i = 0; i<msg.length; i++){
					valueText = validCharacters.indexOf(msg[i]);
					encryptedChar = validCharacters.charAt((valueText+key)%maxCharacters);
					encryptedMsg += encryptedChar;
				}
				return encryptedMsg;
			}else{
				throw "notValidMessage";
			}
		}else{
			throw "notValidKey";
		}

	};

	this.decrypt = function(key, msg) {
		key = parseInt(key);
		if (isValidKey(key)) {
			if (isValidText(msg)) {
				var decryptedMsg="";
				for(var i = 0; i<msg.length; i++){
				    valueText = validCharacters.indexOf(msg[i]);
				    decryptedChar = validCharacters.charAt((valueText-key+maxCharacters)%maxCharacters);
				    decryptedMsg += decryptedChar;
				}
				return decryptedMsg;
			}else{
				throw "notValidMessage";
			}
		}else{
			throw "notValidKey";
		}
	}
}

caesarCipher.prototype.toJSON = function(){
	return 'CaesarCipher';
};
