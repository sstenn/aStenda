var Navbar = require('./navbar.js');
var Failpage = require('./failpage.js');


var Auth = React.createClass({

	getInitialState: function(){
		return({
			userId: this.props.id,
			userName: this.props.name,
			userMail: this.props.mail,
			failed: false,
			role: false,
		})
	},
    
    shouldComponentUpdate: function(nextProps, nextState){
        if(nextState != this.state){
            return true
        }else{
            return false
        }

    },

	componentWillReceiveProps: function(nextProps){
		this.setState({
			userId: nextProps.id,
			userName: nextProps.name,
			userMail: nextProps.mail
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
				'mail'	: this.props.mail,
			}
		}


		$.post({url: ajaxUrl, data: param, dataType: 'json'}).done(function(data){			

			if(data['active']){
				//Bestaande gebruiker
				element.setSession(data['active'][0]['rol']);
				element.setState({'role': data['active'][0]['rol']});
			}else if(data['new']){
				//Nieuwe gebruiker op aanvraag van beheerder
				element.setNewUser();
				element.setSession(data['new'][0]['rol']);
				element.setState({'role': data['new'][0]['rol']});
			}else{
				//Nieuwe gebruiker die niet word toegelaten op de app
				element.setState({'failed': true});
			}

		});


	},

	setNewUser: function(){
		//Zet een nieuwe gebruiker van pending naar user
		var ajaxUrl = './backend/index.php';

		var param = {
			'c' 	: 'user',
			'a'		: 'setNewUser',
			'param'	: {
				'id'	: this.props.id,
				'name'	: this.props.name,
				'gmail' : this.props.mail,
			}
		}

		$.post({url: ajaxUrl, data: param, dataType: 'json'}).done(function(data){
		});

		
	},

	setSession: function(role){		
		//Bewaar in de localstorage de rol en het id
		localStorage.setItem('userRole', role);
		localStorage.setItem('userGoogleId', this.state.userId);

	},

	render: function(){
			

			return (
				<div>
					{this.state.failed ? (
						<Failpage message="app" />
					) : (
						<div>
							{this.state.role ? (
								<Navbar role={this.state.role} />
							) : (
								null
							)}	  

				
						</div>
					)}
				</div>	
			)
	}
});

module.exports = Auth;