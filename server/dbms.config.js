import PocketBase from 'pocketbase';
import './fetch-polyfill.js';

// store these credentials using a secure method in production
const dbmsUser = 'admin@example.com';
const dbmsPass = dbmsUser;

const pb = new PocketBase('http://127.0.0.1:8090');
const adminData = await pb.admins.authWithPassword(dbmsUser, dbmsPass);
console.debug(adminData); // do not expose token in production

export default pb;