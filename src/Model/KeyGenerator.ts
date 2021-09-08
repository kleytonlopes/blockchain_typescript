const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class KeyGenerator{

    static generateKeys(){
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
        return {privateKey, publicKey}
    }
}

export default KeyGenerator;
