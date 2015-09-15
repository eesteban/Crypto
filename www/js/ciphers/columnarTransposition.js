function columnarTranspositionCipher(validCharacters){
	if (typeof validCharacters == 'string') {
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
				ncryptedMsg="";
				keySorted = getKeySorted(key);
				adaptedMsg = adaptMessage(msg, key);
				encryptedMsg = getSortedText(adaptedMsg, keySorted);
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
				decryptedMsg="";
				keySorted = getKeySorted(key);
				decryptedMsg = recoverText(msg, keySorted);
				return decryptedMsg;
			}else{
				throw "notValidMessage";
			}
		}else{
			throw "notValidKey";
		}
	};

	function adaptMessage(msg, key){
		adaptedMessage = msg;
		while((adaptedMessage.length%key.length)!=0){
			adaptedMessage += validCharacters[0];
		}
		return adaptedMessage;
	}

	function getKeySorted (key){
		//Get the integer values of the key
		var keyValues = [];
		for(var i = 0; i<key.length; i++){
			var valueKey = validCharacters.indexOf(key.charAt(i));
			keyValues.push(valueKey);
		}
		//Get the column order
		return getOrder(keyValues);
	}

	function getOrder(keyValues){
		var columnOrder = [];
		for(var i = 0; i<keyValues.length; i++){
			var index = 0;
			var minimum = Number.MAX_VALUE;
			for (var k = 0; k<keyValues.length; k++){
				var value = keyValues[k];
				if(value<minimum){
					minimum = value;
					index = keyValues.indexOf(value);
				}
			}
			keyValues[index] = Number.MAX_VALUE;
			columnOrder[index] = i;
		}
		return columnOrder;
	}

	function getSortedText(text, keySorted) {
		sortedText = [];
		for(var i = 0; i<keySorted.length; i++){
			index = keySorted[i];
			while(index<text.length){
				sortedText.push(text[index]);
				index+=keySorted.length;
			}
		}
		return sortedText.join('');
	}

	function recoverText(text, keySorted) {
		var recoveredText="";
		var columnValues = getColumns(text, keySorted.length);
		for(var i = 0; i<columnValues[0].length; i++){
			for(var k = 0; k<keySorted.length; k++){
				recoveredText += columnValues[keySorted[k]].charAt(i);
			}
		}
		return recoveredText;
	}

	function getColumns(text, nColumns) {
		chunkSize = text.length/nColumns;
		regexString = ".{1,"+chunkSize+"}";
		divideN = new RegExp (regexString,"gi");
		return text.match(divideN);
	}
}

columnarTranspositionCipher.prototype.toJSON = function(){
	return 'ColumnarTranspositionCipher';
};
