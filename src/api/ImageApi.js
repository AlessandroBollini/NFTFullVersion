class ImageApi {

    static list(callback) {
        fetch("http://localhost:8080/images")
            .then(response => response.json())
            .then(data => callback(data));
    }

    static load(uri, callback) {
        const image = {
            uri: uri
        }
        const url = "http://localhost:8080/addImage";

        const requestOptions = {
            method: 'POST',
            'Content-Type': 'application/json',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image)
        };
        fetch(url, requestOptions)
            .then(_response => callback());
    }
}
export default ImageApi;