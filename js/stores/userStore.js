var Reflux = require('reflux');
var Actions = require('../actions/UserAction');

var _userData = {};

function setUserData (userData) {
	_userData = userData;
}

var Store = Reflux.createStore({
	listenables: Actions,
	onReceive_user_data: function (userData) {
		setUserData(userData);
		this.output();
	},
	output: function() {
    this.trigger(_userData);
  }
});

module.exports = Store;