import m from 'mithril'
import { cities } from './data.js'
import { findCityName } from './util.js'
import { Image } from './component.js'


let state = {
  code: null,
  name: null,
  update: val => {
    state.code = val;
    state.name = findCityName(val);
  }
};

export default {
  oninit: vnode => {
    vnode.state.cities = cities;
    vnode.state.selected = state;
    vnode.state.selected.code = vnode.state.cities[0].code;
    vnode.state.selected.name = vnode.state.cities[0].name;
    vnode.state.next = ev => {
      m.route.set(`/city/${vnode.state.selected.code}`);
    };
  },
  oncreate: () => {
    componentHandler.upgradeAllRegistered();
  },
  view: vnode => {
    return m('div#step1-wrapper',
      m(Image, {cityName: findCityName(vnode.state.selected.code)}),
      m('div.mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label',
        m('select#cities .mdl-selectfield__select', {
            onchange: m.withAttr('value', vnode.state.selected.update)
          },
          vnode.state.cities.map(city => {
            return m('option', {
              value: city.code,
            }, city.name);
          })
        ),
        m('label.mdl-selectfield__label', { for: 'cities' }, '自治体を選択'),
      ),
      m('div#next-button .mdl-cell mdl-cell--12-col',
        m('button.mdl-button mdl-js-button mdl-button--raised mdl-button--colored', { onclick: vnode.state.next }, '決定')
      )
    );
  }
}
