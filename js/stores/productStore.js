var Reflux = require('reflux');
var Actions = require('../actions/ProductAction');

var _productData = {};
var _saleData = {};

function setProductData (productData) {
	_productData = productData;
}
function setSaleData (saleData) {
	_saleData = saleData;
}

var Store = Reflux.createStore({
	listenables: Actions,
	onReceive_product_data: function (productData) {
		setProductData(productData);
		this.output();
	},
	onReceive_sale_data: function (saleData) {
		setSaleData(saleData);
		this.output();
	},
	output: function() {
    var status = {
    	productData: _productData,
    	saleData: _saleData
    };
    this.trigger(status);
  }
});

module.exports = Store;