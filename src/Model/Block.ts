import SHA256 from 'crypto-js/sha256';

class Block {
  hash: string;
  index: string;
  timestamp: number;
  data: [string: any];
  previousHash: string;

  constructor(index: string, timestamp: number, data: [string: any], previousHash = '') {
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
