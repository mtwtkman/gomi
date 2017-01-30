import m from 'mithril'
import { cities } from './data.js'
import Step1 from './step_1.js'
import Step2 from './step_2.js'


// material-desing-lite global instance.
if (!componentHandler) {
  throw Error('material-design-lite not found!');
}


const cityCodes = cities.map(city => {
  return `${city.code}`;
});


function include(code) {
  for (let x of cityCodes) {
    if (x === code) {
      return true;
    }
  }
  return false;
}


m.route(document.body, '/', {
  '/': {
    onmatch: () => {
      return Step1;
    }
  },
  '/city/:code': {
    onmatch: args => {
      if (!include(args.code)) {
        m.route.set('/');
      }
      return Step2;
    }
  }
});
