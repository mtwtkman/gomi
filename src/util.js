import { cities } from './data.js'


function findCityName(code) {
  for (var city of cities) {
    if (city.code === code) {
      return city.name;
    }
  }
  return null;
}


export {
  findCityName
}
