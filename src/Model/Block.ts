import SHA256 from 'crypto-js/sha256';

class Block {
  hash: string;
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  nonce: number;

  constructor(index: number, timestamp: string, data: any, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(
        this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)+
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
