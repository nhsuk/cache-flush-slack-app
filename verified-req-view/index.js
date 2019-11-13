const view = require('./views/open.json');

module.exports = async function buildView(context, text) {
  view.blocks[1].element.initial_value = text;
  return view;
};
