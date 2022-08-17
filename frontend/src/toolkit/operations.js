import { tezos } from "./tezos";

export const buyTicketOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at( "KT1SKxiNGRD3ziaQVDwxZnpYJcDLuhmhfRa8" );
        const op = await contractInstance.methods.make_bid().send( {
            amount: 1,
            mutez: false,
        } );
        await op.confirmation( 1 );
    } catch ( err ) {
        throw err;
    }
};

// TODO 10 - Call end_game entrypoint in the Lottery contract
export const endGameOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at( "KT1SKxiNGRD3ziaQVDwxZnpYJcDLuhmhfRa8" );
        const op = await contractInstance.methods.end_game().send();
        await op.confirmation( 1 );
    } catch ( err ) {
        throw err;
    }
};