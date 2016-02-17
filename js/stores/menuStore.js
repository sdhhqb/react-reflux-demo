var Reflux = require('reflux');
var Actions = require('../actions/MenuAction');

var _menuData = [];
var _curActive = "";
var _curPath = "";

function setMenuData (menuData) {
	_menuData = menuData;
}
function setCurActive (curActive) {
	_curActive = curActive;
}
function setCurPath (curPath) {
	_curPath = curPath;
}

var Store = Reflux.createStore({
	listenables: Actions,
	onReceive_menu_data: function (menuData) {
		setMenuData(menuData);
		this.output();
	},
	onSet_menu_path: function (curPath) {
		setCurPath(curPath);
		this.output();
	},
	onSet_menu_item: function (curPath, curActive) {
		setCurPath(curPath);
		setCurActive(curActive);
		this.output();
	},
	output: function() {
    var status = {
    	menuData: _menuData,
    	curActive: _curActive,
    	curPath: _curPath
    };
    this.trigger(status);
  }
});

module.exports = Store;