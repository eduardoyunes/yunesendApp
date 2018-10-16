// libs
import * as Nightmare from 'nightmare';

const browser = new Nightmare({ show: true }) as Nightmare;
const baseUrl = 'http://localhost:4000'; // TODO: get from `build-config.json`

export { browser, baseUrl };
