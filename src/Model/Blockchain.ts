import Block from './Block';

class Blockchain{
    chain: Block[]

    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '1234567890','Genesis Block', '0');
    }

    getLatestBlock(){
        return [... this.chain].pop()
    }

    addBlock(newBlock: Block){
        newBlock.previousHash = this.getLatestBlock()!.hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

export default Blockchain