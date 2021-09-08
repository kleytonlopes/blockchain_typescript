import SHA256 from 'crypto-js/sha256';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    signature?: string;

    constructor(fromAddress: string | null, toAddress: string, amount: number){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }

    calculateHash(){
        return SHA256(
            this.fromAddress +
            this.toAddress + 
            this.amount
        ).toString();
    }

    signTransaction(signingKey: any){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }
        const hashTransaction = this.calculateHash();
        const signature = signingKey.sign(hashTransaction, 'base64');
        this.signature = signature.toDER('hex');
    }

    isValid(){
        if (this.fromAddress === null) return true;
        if(!this.signature || this.signature.length === 0){
            throw new Error('No Signature in this transaction!');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }

    

}

export default Transaction;