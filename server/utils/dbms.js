import PocketBase from 'pocketbase';
import './fetch-polyfill.js';

// store these credentials using a secure method in production
const adminUsername = 'admin@example.com';
const adminPassword = adminUsername;

export const pbAdmin = new PocketBase('http://127.0.0.1:8090');
const adminData = await pbAdmin.admins.authWithPassword(adminUsername, adminPassword);
console.debug(adminData); // do not expose token in production
console.debug(pbAdmin.authStore.isValid);
console.debug(pbAdmin.authStore.token);
console.debug(pbAdmin.authStore.model.id);

// need separate instances for user and admin
// otherwise admin privileges are lost after authenticating a user on a single/shared instance
export const pbUser = new PocketBase('http://127.0.0.1:8090');