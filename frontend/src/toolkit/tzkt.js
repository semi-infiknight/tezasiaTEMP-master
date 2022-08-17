// TODO 8 - Fetch lottery contract storage

import axios from "axios";

export const auctionStorage = async () => {
    const res = await axios.get(
        "https://api.jakartanet.tzkt.io/v1/contracts/KT1SKxiNGRD3ziaQVDwxZnpYJcDLuhmhfRa8/storage"
    );
    return res.data;
};

export const nftStorage = async () => {
    const res = await axios.get(
        "https://api.jakartanet.tzkt.io/v1/contracts/KT1EgAzBnhm9TZqKZxmyuWM9hPb4Vcoob7tF/storage"
    );
    return res.data;
};