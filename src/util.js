import { cities } from './data.js'


function findCityName(code) {
  for (var city of cities) {
    if (city.code === code) {
      return city.name;
    }
  }
  return null;
}

function isSupported() {
  const ua = window.navigator.userAgent().toLowerCase();
  const ver = window.navigator.appVersion.toLowerCase();

  if (ua.indexOf("msie") != -1) {
    if (ver.indexOf("msie 6.") != -1) {
      return false;
    } else if (ver.indexOf("msie 7.") != -1) {
      return false;
    } else if (ver.indexOf("msie 8.") != -1) {
      return false;
    } else if (ver.indexOf("msie 9.") != -1) {
      return false;
    } else if (ver.indexOf("msie 10.") != -1) {
      return false;
    } else {
      return false;
    }
  } else if (ua.indexOf('trident/7') != -1) {
    return false;
  } else if (ua.indexOf('chrome') != -1) {
    return false;
  } else if (ua.indexOf('safari') != -1) {
    return true;
  } else if (ua.indexOf('opera') != -1) {
    return false;
  } else if (ua.indexOf('firefox') != -1) {
    return false;
  }
  return false;
}

export {
  findCityName,
  isSupported
}
