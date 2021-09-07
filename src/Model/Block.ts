import SHA256 from 'crypto-js/sha256';

class Block {
  hash: string;
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;

  constructor(index: number, timestamp: string, data: any, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data),
    ).toString();
  }
}

export default Block;
