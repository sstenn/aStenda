var Navbar = require('./navbar.js');
var Failpage = require('./failpage.js');


var Auth = React.createClass({

	getInitialState: function(){
		return({
			userId: this.props.id,
			userName: this.props.name,
			active: ''
		})
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			userId: nextProps.id,
			userName: nextProps.name,
		})
	},

	componentWillMount: function(){
		this.checkUser();
	},

	checkUser: function(){
		var element = this;
		var ajaxUrl = './backend/index.php';

		var param = {
			'c' 	: 'user',
			'a'		: 'activeUser',
			'param'	: {
				'id'	: this.props.id,
			}
		}

		//console.log(element);

		$.post({url: ajaxUrl, data: param, dataType: 'json'}).done(function(data){

		//console.log(data);	
			

			if(data['active']){
				//Bestaande gebruiker
				element.setState({'active': true});
				element.setSession(data['active']['rol']);
			}else if(data['new']){
				//Nieuwe gebruiker op aanvraag van beheerder
				element.setState({'active': true});
				element.setNewUser();
				element.setSession(data['new']['rol']);
			}else{
				//Nieuwe gebruiker die niet word toegelaten op de app
				//element.setState({'active': false});
				<Failpage />
			}

		});


	},

	setNewUser: function(){
		var ajaxUrl = './backend/index.php';

		var param = {
			'c' 	: 'user',
			'a'		: 'setNewUser',
			'param'	: {
				'id'	: this.props.id,
				'name'	: this.props.name,
			}
		}

		$.post({url: ajaxUrl, data: param, dataType: 'json'}).done(function(data){

		});

		
	},

	setSession: function(role){

		//console.log(role);

		localStorage.setItem('userRole', role);
		localStorage.setItem('userId', this.state.userId);

	},

	render: function(){

		//const loggedIn = this.state.active;
		//const loggedIn = localStorage.getItem('userId');

			return (
				<div>
						<Navbar />
		
				</div>	
				)
	


		
	}
});

module.exports = Auth;