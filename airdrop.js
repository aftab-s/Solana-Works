// npm init -y
// npm install --save @solana/web3.js

const {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Keypair,
} = require("@solana/web3.js");

//@solana/web3.js is the library to interact with the Solana Web3 Service

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async () => {
  const keypair = Keypair.generate();

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  const latestBlockHash = await connection.getLatestBlockhash();

  //Sending Transaction to latest block
  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  //Outputing the Public, Private and Airdrop Signature
  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn,
  });
})();

//Copy the whole Array from the output and Import it in 
//Phantom Wallet to Get Tokens.
