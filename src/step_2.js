import m from 'mithril'
import { findCityName } from './util.js'
import { Image, TextField } from './component.js'


// ctl00$cphMain$

let state = {
  txtTel1: null,
  txtTel2: null,
  txtTel3: null,
  txtName1: null,
  txtName2: null,
  txtKana1: null,
  txtKana2: null,
  lstStreet: null,
  cmdStreet: null,
  lstChome: null,
  txtBan: null,
  txtGo: null,
  txtBldg: null,
  txtRoom: null,
  lstOutPlace: null,
  txtMail1: null,
  txtMail2: null,
  hidMail: null,
  txtDayTel: null,
  hidRecStartDt: null,
  hidRecStartTm: null
};

for (var key in state) {
  state[`update_${key}`] = val => {
    state[key] = val;
    console.log(state[key]);
  };
}

export default {
  oninit: vnode => {
    vnode.state.data = state;
  },
  oncreate: () => {
    componentHandler.upgradeAllRegistered();
  },
  view: vnode => {
    const cityName = findCityName(/\d+/.exec(m.route.get())[0]);
    return m('div',
      m('h1', cityName),
      m(Image, { cityName: cityName }),
      m('table.mdl-data-table mdl-js-data-table mdl-shadow--2dp',
        m('thead',
          m('tr',
            m('th.mdl-data-table__cell--non-numeric', { style: 'text-align:center;' }, '項目'),
            m('th.mdl-data-table__cell--non-numeric', { style: 'text-align:center;' }, '値'),
          )
        ),
        m('tbody',
          m('tr',
            m('td.mdl-data-table__cell--non-numeric', '排出方法'),
            m('td', { style: 'text-align:center;' }, '収集(固定)')
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
                    vnode.state.data['update_txtTel1']
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
                    vnode.state.data['update_txtTel2']
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
                    vnode.state.data['update_txtTel3']
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
                  vnode.state.data['update_txtName1']
                ),
                label: '姓'
              }),
              m(TextField, {
                style: 'width:90px;',
                id: 'firstname',
                pattern: '[^\x20-\x7E]+',
                onchange: m.withAttr(
                  'value',
                  vnode.state.data['update_txtName2']
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
                pattern: '^[ぁ-ん]+$ , [\u3041-\u309F]+',
                onchange: m.withAttr(
                  'value',
                  vnode.state.data['update_txtKana1']
                ),
                label: 'せい'
              }),
              m(TextField, {
                style: 'width:90px;',
                id: 'firstname-kana',
                pattern: '^[ぁ-ん]+$ , [\u3041-\u309F]+',
                onchange: m.withAttr(
                  'value',
                  vnode.state.data['update_txtKana2']
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
                  onchange: m.withAttr('value', vnode.state.data['update_lstStreet'])
                })
              )
            )
          )
        )
      )
    );
  }
}
