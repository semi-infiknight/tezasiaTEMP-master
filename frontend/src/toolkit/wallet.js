import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet(
    {
        name: "Pro NFT League",
        prefferedNetwork: "jakartanet",
    }
);

export const connectWallet = async () => {
    await wallet.requestPermissions( { network: { type: "jakartanet" } } );
};

export const disconnectWallet = async () => {
    await wallet.client.clearActiveAccount().then(async () => {
        const account = await wallet.client.getActiveAccount();
      
        console.log("Active Account", account);
      });
};


export const getAccount = async () => {
    const activeAccount = await wallet.client.getActiveAccount();

    if ( activeAccount ) {
        return activeAccount.address;
    }
    else {
        return "";
    }
};