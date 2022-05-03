const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash
        this.hash = this.calculateHash();
    }
    calculateHash(){  // takes properties of block run through hash function, then return hash
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()    
    }
}

class Blockchain{
    constructor(){   //constructor is responsible for initialising our blockchain
        this.chain = [this.createGenesisBlock];
    }
    createGenesisBlock(){  //<-- first block on a blockchain (which should be created manually)
        return new Block(0, "21/04/2022", "Genesis block", "0") //1st Block cannot point towards any previous blocks  
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){  // as method suggests this adds new block to chain
        //set the previous hash property of the new block to the last block on chain
        newBlock.previousHash = this.getLatestBlock().hash; 
        //recalculate the hash
        newBlock.hash = newBlock.calculateHash();
        //push new block
        this.chain.push(newBlock);
    }  
}

let curtCoin = new Blockchain();
curtCoin.addBlock(new Block(1, "10/3/2022", { amount: 540.50 }));
curtCoin.addBlock(new Block(2, "18/3/2022", { amount: 1304.05 }));

console.log(JSON.stringify(curtCoin, null, 4 ));