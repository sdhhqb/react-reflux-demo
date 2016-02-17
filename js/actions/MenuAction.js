var Reflux = require('reflux');

var Actions = Reflux.createActions([
	'receive_menu_data',
	'set_initial_active',
	'set_menu_path',
	'set_menu_item'
]);
module.exports = Actions;