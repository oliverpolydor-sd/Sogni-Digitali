import { translations } from './src/lib/translations.ts';

const keysIT = Object.keys(translations.IT);
const keysEN = Object.keys(translations.EN);
const keysFR = Object.keys(translations.FR);
const keysAR = Object.keys(translations.AR);

console.log('Total keys:', { IT: keysIT.length, EN: keysEN.length, FR: keysFR.length, AR: keysAR.length });

const allKeys = new Set([...keysIT, ...keysEN, ...keysFR, ...keysAR]);

allKeys.forEach(k => {
  if (!keysIT.includes(k)) console.log("Missing in IT:", k);
  if (!keysEN.includes(k)) console.log("Missing in EN:", k);
  if (!keysFR.includes(k)) console.log("Missing in FR:", k);
  if (!keysAR.includes(k)) console.log("Missing in AR:", k);
});
