import m from 'mithril'
import { findCityName } from './util.js'
import { Image, TextField } from './component.js'


const PREFIX = 'ctl00$cphMain$';

const Store = {
  cityCode: null,
  params: {
    data: {
      [`${PREFIX}txtTel1`]: null,
      [`${PREFIX}txtTel2`]: null,
      [`${PREFIX}txtTel3`]: null,
      [`${PREFIX}txtName1`]: null,
      [`${PREFIX}txtName2`]: null,
      [`${PREFIX}txtKana1`]: null,
      [`${PREFIX}txtKana2`]: null,
      [`${PREFIX}lstStreet`]: null,
      [`${PREFIX}cmdStreet`]: null,
      [`${PREFIX}lstChome`]: null,
      [`${PREFIX}txtBan`]: null,
      [`${PREFIX}txtGo`]: null,
      [`${PREFIX}txtBldg`]: null,
      [`${PREFIX}txtRoom`]: null,
      [`${PREFIX}lstOutPlace`]: null,
      [`${PREFIX}txtMail1`]: null,
      [`${PREFIX}txtMail2`]: null,
      [`${PREFIX}hidMail`]: null,
      [`${PREFIX}txtDayTel`]: null,
      [`${PREFIX}hidRecStartDt`]: null,
      [`${PREFIX}hidRecStartTm`]: null,
      __EVENTTARGET: null,
      __EVENTARGUMENT: null,
      __LASTFOCUS: null,
      __VIEWSTATE: null,
      __SCROLLPOSITIONX: null,
      __SCROLLPOSITIONY: null,
      __EVENTVALIDATION: null,
      streets: []
    },
    fetch: cityCode => {
      m.request({
        url: `http://tv.tokyokankyo.or.jp/pag/InputVouchers.aspx?CityCode=${cityCode}&xMode=3`,
        method: 'GET',
        deserialize: response => { return response; }
      }).then(response => {
        const dom = new DOMParser().parseFromString(response, 'text/html');
        Store.params.data.__EVENTTARGET = dom.getElementById('__EVENTTARGET').value;
        Store.params.data.__EVENTTARGET = dom.getElementById('__EVENTTARGET').value;
        Store.params.data.__LASTFOCUS = dom.getElementById('__LASTFOCUS').value;
        Store.params.data.__VIEWSTATE = dom.getElementById('__VIEWSTATE').value;
        Store.params.data.__SCROLLPOSITIONX = dom.getElementById('__SCROLLPOSITIONX').value;
        Store.params.data.__SCROLLPOSITIONY = dom.getElementById('__SCROLLPOSITIONY').value;
        Store.params.data.__EVENTVALIDATION = dom.getElementById('__EVENTVALIDATION').value;
        const streets = Array.prototype.slice.call(dom.getElementById('ctl00_cphMain_lstStreet').children, 1);
        Store.params.data.streets = [];
        for (let i=0, l=streets.length; i<l; i++) {
          const street = streets[i];
          Store.params.data.streets.push({
            value: street.value,
            name: street.textContent
          });
        }
      });
    }
  },
  update: key => {
    return value => {
      Store.params.data[key] = value;
    };
  }
};


export default {
  oninit: vnode => {
    vnode.state.store = Store;
    const cityCode = /\d+/.exec(m.route.get())[0];
    vnode.state.store.params.fetch(cityCode);
    vnode.state.cityName = findCityName(cityCode);
  },
  oncreate: () => {
    componentHandler.upgradeAllRegistered();
  },
  view: vnode => {
    return m('div',
      m('h1', vnode.state.cityName),
      m(Image, { cityName: vnode.state.cityName }),
      m('table.mdl-data-table mdl-js-data-table mdl-shadow--2dp',
        m('thead',
          m('tr',
            m('th.mdl-data-table__cell--non-numeric', { style: 'text-align:center;' }, '項目'),
            m('th.mdl-data-table__cell--non-numeric', { style: 'text-align:center;' }, '値')
          )
        ),
        m('tbody',
          m('tr',
            m('td.mdl-data-table__cell--non-numeric', '排出方法'),
            m('td', { style: 'text-align:center;' }, '収集')
          ),
          m('tr',
            m('td.mdl-data-table__cell--non-numeric', '電話番号'),
            m('td',
              m('div.mdl-textfield mdl-js-textfield', { style: 'width:60px;' },
                m(TextField, {
                  style: 'width:60px',
                  id: 'phone-number1',
                  pattern: '[0-9]{3}',
                  onchange: m.withAttr(
                    'value',
                    vnode.state.store.update(`${PREFIX}txtTel1`)
                  ),
                  label: '数字3桁'
                })
              ),
              m('span', ' - '),
              m(TextField, {
                  style: 'width:60px',
                  id: 'phone-number2',
                  pattern: '[0-9]{4}',
                  onchange: m.withAttr(
                    'value',
                    vnode.state.store.update(`${PREFIX}txtTel2`)
                  ),
                  label: '数字4桁'
              }),
              m('span', ' - '),
              m(TextField, {
                  style: 'width:60px',
                  id: 'phone-number3',
                  pattern: '[0-9]{4}',
                  onchange: m.withAttr(
                    'value',
                    vnode.state.store.update(`${PREFIX}txtTel3`)
                  ),
                  label: '数字4桁'
              })
            )
          ),
          m('tr',
            m('td.mdl-data-table__cell--non-numeric', '名前(全角)'),
            m('td',
              m(TextField, {
                style: 'width:90px; margin-right:20px;',
                id: 'lastname',
                pattern: '[^\x20-\x7E]+',
                onchange: m.withAttr(
                  'value',
                  vnode.state.store.update(`${PREFIX}txtName1`)
                ),
                label: '姓'
              }),
              m(TextField, {
                style: 'width:90px;',
                id: 'firstname',
                pattern: '[^\x20-\x7E]+',
                onchange: m.withAttr(
                  'value',
                  vnode.state.store.update(`${PREFIX}txtName2`)
                ),
                label: '名'
              })
            )
          ),
          m('tr',
            m('td.mdl-data-table__cell--non-numeric', '名前(かな)'),
            m('td',
              m(TextField, {
                style: 'width:90px; margin-right:20px;',
                id: 'lastname-kana',
                pattern: '^[ぁ-ん]+$',
                onchange: m.withAttr(
                  'value',
                  vnode.state.store.update(`${PREFIX}txtKana1`)
                ),
                label: 'せい'
              }),
              m(TextField, {
                style: 'width:90px;',
                id: 'firstname-kana',
                pattern: '^[ぁ-ん]+$',
                onchange: m.withAttr(
                  'value',
                  vnode.state.store.update(`${PREFIX}txtKana2`)
                ),
                label: 'めい'
              })
            )
          ),
          m('tr',
            m('td.mdl-data-table__cell--non-numeric', '住所'),
            m('td',
              m('div.mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label',
                m('select#streets .mdl-selectfield__select', {
                    onchange: m.withAttr('value', vnode.state.store.update(`${PREFIX}lstStreet`))
                  },
                  vnode.state.store.params.data.streets.map(street => {
                    return m('option', {
                      value: street.value
                    }, street.name);
                  })
                )
              )
            )
          )
        )
      )
    );
  }
}
