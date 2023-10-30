import {createHashedPassword, verifyPassword} from './password-module.js';

const hashs = await createHashedPassword('1234')

console.log('hashs.salt, hashs.hashedPassword :', hashs.salt, hashs.hashedPassword)

const isPassword = await verifyPassword('1234', hashs.salt, hashs.hashedPassword)

console.log(isPassword === hashs.hashedPassword)