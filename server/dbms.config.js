import PocketBase from 'pocketbase';
// fetch() polyfill for node < v17
import fetch, {
    Blob,
    blobFrom,
    blobFromSync,
    File,
    fileFrom,
    fileFromSync,
    FormData,
    Headers,
    Request,
    Response,
} from 'node-fetch';

/*global globalThis*/
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
    globalThis.Request = Request;
    globalThis.Response = Response;
}

const pb = new PocketBase('http://127.0.0.1:8090');

const result = await pb.collection('users').getList(1, 20, {
});
console.log(result);