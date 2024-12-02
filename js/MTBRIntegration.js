import { Connection, PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";

let wallet, connection;
const MTBR_MINT_ADDRESS = "MY_METABREAK_TOKEN_ADDRESS"; // TODO: Replace with the MTBR token's mint address
const network = WalletAdapterNetwork.Mainnet; // Change to 'Testnet' for testing

export async function connectWallet() {
  wallet = new PhantomWalletAdapter();
  await wallet.connect();
  connection = new Connection(network);
  console.log("Wallet connected:", wallet.publicKey.toString());
}

export async function getMTBRBalance() {
  if (!wallet || !connection) {
    console.error("Wallet not connected!");
    return 0;
  }
  const balance = await connection.getTokenAccountsByOwner(wallet.publicKey, {
    mint: new PublicKey(MTBR_MINT_ADDRESS),
  });
  return balance;
}
