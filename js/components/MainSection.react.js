// 中间主要内容区域
var React = require('react');
var SideMenu = require('./menu/SideMenu.react');
var ContentProduct = require('./product/Content.react');
var ContentUser = require('./user/Content.react');

var MenuStore = require('../stores/menuStore');
var MenuAction = require('../actions/MenuAction');
var MainApis = require('../utils/MainApis');

var MainSection = React.createClass({
	getInitialState: function () {
		return {
			menuData: [],
    	curActive: "",
    	curPath: ""
		};
	},
	getHash: function () {
		var hash = window.location.hash.substring(1) || "productlist";
		return hash;
	},
	componentDidMount: function () {
		var _this = this;
		// menuStore事件监听
		this.unsubscribe = MenuStore.listen(this._onChange);

		// 监听hash改变事件
		window.addEventListener('hashchange', function () {
			var hash = window.location.hash.substring(1);
			var path = _this.getPath(_this.state.menuData, hash);
			if (path != '') {
				MenuAction.set_menu_item(path, hash);
			}
		});

		// 获取菜单数据
		MainApis.getMenuData(function (menuData) {			
			MenuAction.receive_menu_data(menuData);
			//第一次进入页面时带有hash
			var hash = window.location.hash.substring(1);
			if (hash) {
				var path = _this.getPath(menuData, hash);
				if (path) {
					MenuAction.set_menu_item(path, hash);
				}
			}
		});
	},
	componentWillUnmount: function() {
		this.unsubscribe();
	},
	render: function () {
		var Xcontent;
		switch (this.state.curActive) {
			case 'productlist': Xcontent = ContentProduct; break;
			case 'productsale': Xcontent = ContentProduct; break;
			case 'userlist': Xcontent = ContentUser; break;
			default:			Xcontent = ContentProduct;
		}

		return (
			<div id="mainSection" className="mainSection">
				<SideMenu 
					curPath={this.state.curPath}
					curActive={this.state.curActive}
					menuData={this.state.menuData} />
				<Xcontent curRoute={this.state.curActive} />
			</div>
		);
	},
	// 获取菜单路径
	getPath: function (menuData, curActive, startLevel, startStr) {
		var key = startStr || "";
		var level = startLevel || 1;
		var i, childKey;
		for (i = 0; i < menuData.length; i++) {
			if (menuData[i].child) {
				childKey = this.getPath(menuData[i].child, curActive, level+1, key);
				if (key != childKey) {
					key = 'level'+level+'-'+i+childKey;
					break;
				}
			} else {
				if (menuData[i].route == curActive) {
					key = key+'level'+level+'-'+i;
					return key;
				}
			}
		}
		return key;
	},
	_onChange: function(status) {
		this.setState(status);
	}
});
module.exports = MainSection;