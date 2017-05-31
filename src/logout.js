var GoogleLogin = require('./app.js');

var Logout = React.createClass({

	getInitialState: function(){
		return({

		})
	},

	componentWillMount: function(){
		localStorage.removeItem('userId');
		localStorage.removeItem('userRole');
	},

	render: function(){
		window.location = "http://localhost/aStenda/";
	}
});

module.exports = Logout;