import * as pjson from '../package.json';
import app from './app';

console.log(`App: ${pjson.description}`);
console.log(`Version: ${pjson.version}`);

app.listen();
