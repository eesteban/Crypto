function affineCipher(validCharacters){
	this.setKeyA = function(key){
		keyA = key;
	};

	if (typeof validCharacters == 'string' && validCharacters!='') {
		validCharacters = validCharacters;
		maxCharacters = validCharacters.length;
		this.setKeyA(calculateKeyA());
	}else{
		throw "notValidCharacters";
	}

	function calculateKeyA(){
		possibleCoprimes = calculateCoprimes(maxCharacters);
		choosenCoprime = possibleCoprimes[Math.floor((Math.random()*(possibleCoprimes.length+1)))];
		return choosenCoprime;
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

	this.encrypt = function(keyB, msg) {
		keyB = parseInt(keyB);
		if (isValidKey(keyB)) {
			if (isValidText(msg)) {
				var encryptedMsg="";
				for(var i = 0; i<msg.length; i++){
					valueText = validCharacters.indexOf(msg.charAt(i));
					encryptedChar = validCharacters.charAt((keyA*valueText+keyB)%maxCharacters);
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

	this.decrypt = function(keyB, msg) {
		keyB = parseInt(keyB);
		if (isValidKey(keyB)) {
			if (isValidText(msg)) {
				var decryptedMsg="";
				var inversoKeyA = calculateMultInverse(keyA, maxCharacters);
				for(var i = 0; i<msg.length; i++){
				    valueText = validCharacters.indexOf(msg[i]);
				    decryptedChar = validCharacters.charAt((inversoKeyA*(valueText-keyB+maxCharacters))%maxCharacters);
				    decryptedMsg+= decryptedChar;
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

affineCipher.prototype.toJSON = function(){
	return 'AffineCipher|'+keyA;
};

function calculateCoprimes(keyNumber){
    var coprimes = [];
    for(var i=1; i<=keyNumber; i++){
        GCD = getGCD(i, keyNumber);
        if(GCD==1){
            coprimes[coprimes.length]=i;
        }
    }
    return coprimes;
}

function getGCD(a, b) {
    if(!b)
        return a;
    else
        return getGCD(b, a % b);
}

/*Algoritmo obtenido de:
http://math.stackexchange.com/questions/67171/
calculating-the-modular-multiplicative-inverse-without-all-those-strange-looking*/
function calculateMultInverse(a,m) {
    var v = 1;
    var d = a;
    var u = (a == 1);
    var t = 1-u;
    if (t == 1) {
        var c = m % a;
        u = Math.floor(m/a);
        while (c != 1 && t == 1) {
               var q = Math.floor(d/c);
               d = d % c;
               v = v + q*u;
               t = (d != 1);
               if (t == 1) {
                   q = Math.floor(c/d);
                   c = c % d;
                   u = u + q*v;
               }
        }
        u = v*(1 - t) + t*(m - u);
    }
    return u;
}
