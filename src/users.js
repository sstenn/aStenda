var Popup = require('./popup.js');


var Users = React.createClass({
    
    getInitialState: function(){
        return({
            users: [],
            pendingUsers: [],
            searchUsers: [],
            ajaxUrl: './backend/index.php',
            errorMessage: '',
            showConfirm: false,
            param: [],
        })
    },

    componentWillMount: function(){
        this.loadUsers();

    },

    shouldComponentUpdate: function(nextProps, nextState){
        //console.log(this.state, nextState);
        if(nextState != this.state || nextProps != this.props){
            return true
        }else{
            return false
        }

    },

    loadUsers: function(){
        var element = this;
        var ajaxUrl = './backend/index.php';

        var param = {
            'c'     : 'user',
            'a'     : 'allUsers',
            'param' : {
            }
        }

        $.post({url: ajaxUrl, data: param, dataType: 'json'}).done(function(data){

            element.setState({users: data['users'], pendingUsers: data['pending_users']})

        })
        
    },

    inviteNewUser: function(gmail){
        var element = this;
        
        var param = {
            'c'     : 'user',
            'a'     : 'inviteNewUser',
            'param' : {
                'gmail' : gmail
            }
        }

        $.post({url: this.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            //console.log(data);
            
            if(data){
                document.getElementById('addUserInput').value = '';
                element.setState({errorMessage: 'User invited!'})
                element.loadUsers();
            }else{
                element.setState({errorMessage: 'User already excists or invited!'})
            }
            
        })


    },

    handleUserClick: function(e){
        e.preventDefault();

        //console.log(e);
    },

    handlePendingUserClick: function(e){
        e.preventDefault();

        //console.log(e);
    },

    handleAddUserClick: function(e){
        e.preventDefault();

        var value = e.target.parentElement.parentElement.querySelector('input').value



        if(value != ''){
            //Add User
            var regex = /@gmail\.com$/
            if(regex.test(value)){
                //Valid gmail adres
                this.inviteNewUser(value);
            }else{
                //Geen gmail adres
                this.setState({errorMessage: 'Email is not a valid gmail account!'})
                return false;
            }
        }else{
            //Geen waarde ingevuld
            this.setState({errorMessage: 'Typ in a gmail account!'})
            return false;
        }

    },

    popup: function(e){
        e.preventDefault();

        var table = e.target.getAttribute('data-table');
        var id    = e.target.getAttribute('data-id');

        var param = {
            'table' : table,
            'id'    : id
        }

        this.setState({
            param: [param]
        })

        this.setState({showConfirm: true});

    },

    removeUser: function(action){
        var element = this;

        if(action == "Yes"){
            
            var param = {
                'c'     : 'user',
                'a'     : 'removeUser',
                'param' : {
                    'table' : element.state.param[0]['table'],
                    'id'    : element.state.param[0]['id']
                }
            }

            //console.log(param)

            $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
                element.setState({showConfirm: false});
                element.loadUsers();
            })

        }else{
            element.setState({showConfirm: false});
        }
    },

    render: function(){
        var element = this;

        //console.log(element.state.showConfirm);
    
        //activeUsers(){
                const activeUsers = this.state.users.map((user, i) => {
                    if(user){
                        return(
                                <div>
                                    <div className="panel-body">
                                        <a href="#" onClick={element.handleUserClick} >{user.naam}</a>
                                        { user.rol == 100 ? (
                                            null
                                        ) : (
                                            <i className="fa fa-times pull-right delete" data-table="users" data-id={user.id} aria-hidden="true" onClick={element.popup}></i>
                                        )} 
                                    </div>
                                </div>
                            )
                    }
                })
                const pendingUsers = this.state.pendingUsers.map((pUser, i) => {
                    if(pUser){
                        return(
                                <div>
                                    <div className="panel-body">
                                        <a href="#" onClick={element.handlePendingUserClick} >{pUser.gmail}</a>
                                        <i className="fa fa-times pull-right delete" data-table="pending_users" data-id={pUser.id} aria-hidden="true" onClick={element.popup}></i>
                                    </div>
                                </div>
                            )
                    }
                })
        //};
        return (
            <div>
                <h2>Users</h2>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Add user</h3>
                        <form>
                          <div className="input-group">
                            <input id="addUserInput" type="text" className="form-control" placeholder="Add user" />
                            <div className="input-group-btn">
                              <button className="btn" onClick={element.handleAddUserClick} >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                    </div>
                    <div className="errorMessage">{element.state.errorMessage}</div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                            <h3>Active users</h3>
                            <div className="panel panel-default">{activeUsers}</div>
                        </div>
                        <div className="col-md-4 col-md-offset-2">
                            <h3>Pending users</h3>
                            <div className="panel panel-default">{pendingUsers}</div>
                    </div>
                </div>
                {element.state.showConfirm ? (
                    <Popup message="Are you sure?" handleClick={element.removeUser} />
                ) : (
                    null
                )}
            </div>
        )
    }
});

module.exports = Users;