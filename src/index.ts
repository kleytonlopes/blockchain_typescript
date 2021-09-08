import Block from './Model/Block'
import Blockchain from './Model/Blockchain'

let myCoin = new Blockchain()
myCoin.addBlock(new Block(1, '654321', {amount: 4}));
myCoin.addBlock(new Block(2, '789123', {amount: 10}));

console.log('BlockChain é válida? '+ myCoin.isChainValid());

myCoin.chain[1].data = {amount: 100000};

console.log('BlockChain é válida? '+ myCoin.isChainValid());




console.log(JSON.stringify(myCoin, null, 4));