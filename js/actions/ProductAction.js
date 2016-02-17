var Reflux = require('reflux');

var Actions = Reflux.createActions([
	'receive_product_data',
	'receive_sale_data'
]);
module.exports = Actions;