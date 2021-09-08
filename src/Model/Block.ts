import SHA256 from 'crypto-js/sha256';

class Block {
  hash: string;
  timestamp: string;
  transactions: any;
  previousHash: string;
  nonce: number;

  constructor(timestamp: string, transactions: any, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions)+
        this.nonce
    ).toString();
  }

  mineBlock(difficulty: number){
    while(this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join('0')){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: '+this.hash);
  }
}

export default Block;
