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

    isChainValid(){
        for(let i = 1; i === this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

export default Blockchain