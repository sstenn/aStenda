var Users = React.createClass({
    
    getInitialState: function(){
        return({
            users: [],
            pendingUsers: [],
            searchUsers: [],
            ajaxUrl: './backend/index.php',
        })
    },

    componentWillMount: function(){
        this.loadUsers();
    },

    shouldComponentUpdate: function(nextProps, nextState){
        //console.log(nextProps, nextState);
        if(nextState != this.state){
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
            var users = element.state.users.concat([data['users']]);
            
            var pending_users = element.state.pendingUsers.concat([data['pending_users']]);
            element.setState({users: users, pendingUsers: pending_users})
            //console.log(element);

        })



        //console.log(element);
        
    },

    inviteNewUser: function(gmail){
        
        var param = {
            'c'     : 'user',
            'a'     : 'inviteNewUser',
            'param' : {
                'gamil' : gmail
            }
        }

        $.post({url: this.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            
        })


    },

    handleUserClick: function(e){
        e.preventDefault();

        console.log(e);
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
                //console.log(true);
            }else{
                //Geen gmail adres
                return false;
            }
        }else{
            //Geen waarde ingevuld
            return false;
        }

    },

    render: function(){
        var element = this;
    
        //activeUsers(){
                const activeUsers = this.state.users.map((user, i) => {
                    if(user){
                        return(
                                <div>
                                    <button className="list-group-item" onClick={element.handleClick} >{user.naam}<span className="badge">x</span></button>
                                </div>
                            )
                    }
                })
                const pendingUsers = this.state.pendingUsers.map((pUser, i) => {
                    if(pUser){
                        return(
                                <div>
                                    <a href="#" className="list-group-item" onClick={element.handleUserClick} >{pUser.rol}<span className="badge">x</span></a>
                                </div>
                            )
                    }
                })
        //};
        return (<div>
            <div className="row">
                <div className="col-md-4">
                    <h2>Add user</h2>
                        <form>
                          <div className="input-group">
                            <input type="text" className="form-control" placeholder="Add user" />
                            <div className="input-group-btn">
                              <button className="btn btn-default" onClick={element.handleAddUserClick} >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                        <h2>Active users</h2>
                        <div className="list-group">{activeUsers}</div>
                    </div>
                    <div className="col-md-6">
                        <h2>Pending users</h2>
                        <div className="list-group">{pendingUsers}</div>
                </div>
            </div>
            </div>)
    }
});

module.exports = Users;