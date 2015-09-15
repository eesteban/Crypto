function vigeniereCipher(validCharacters){
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

	this.encrypt = function(key, msg) {
		if(isValidText(key)){
			if (isValidText(msg)) {
				var encryptedMsg="";
				for(var i = 0; i<msg.length; i++){
					valueText = validCharacters.indexOf(msg.charAt(i));
					valueKey = validCharacters.indexOf(key.charAt(i % key.length));
					encryptedChar = validCharacters.charAt((valueText+valueKey)%maxCharacters);
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
		if(isValidText(key)){
			if (isValidText(msg)) {
				var decryptedMsg="";
				for(var i = 0; i<msg.length; i++){
					valueText = validCharacters.indexOf(msg.charAt(i));
					valueKey = validCharacters.indexOf(key.charAt(i % key.length));
					decryptedChar = validCharacters.charAt((valueText-valueKey+maxCharacters)%maxCharacters);
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

vigeniereCipher.prototype.toJSON = function(){
	return 'VigeniereCipher';
};
