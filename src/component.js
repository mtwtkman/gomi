import m from 'mithril'

const Image = {
  view: vnode => {
    return m('div#symbol',
      m('img', { src: `./images/${vnode.attrs.cityName}.png` })
    );
  }
}

const TextField = {
  view: vnode => {
    return m('div.mdl-textfield mdl-js-textfield', { style: vnode.attrs.style },
      m(`input#${vnode.attrs.id} .mdl-textfield__input`, {
        type: 'text',
        pattern: vnode.attrs.pattern,
        onchange: vnode.attrs.onchange
      }),
      m('label.mdl-textfield__label', { for: vnode.attrs.id }, vnode.attrs.label)
    );
  }
}

export {
  Image,
  TextField
}
