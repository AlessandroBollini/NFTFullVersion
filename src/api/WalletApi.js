class WalletApi {

    static list(callback) {
        fetch("http://localhost:8080/wallets")
            .then(response => response.json())
            .then(data => callback(data));
    }

    static load(address, publicKey, privateKey, seedPhrase, callback) {
        const wallet = {
            address: address,
            publicKey: publicKey,
            privateKey: privateKey,
            seedPhrase: seedPhrase
        }
        const url = "http://localhost:8080/addWallet";

        const requestOptions = {
            method: 'POST',
            'Content-Type': 'application/json',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wallet)
        };
        fetch(url, requestOptions)
            .then(_response => callback());
    }
}
export default WalletApi;