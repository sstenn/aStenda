//var Agenda = require('./agenda.js');

var Home = React.createClass({

    getInitialState: function(){
        return({

        })
    },

    componentWillMount: function(){
    },

    render: function(){
        //console.log(sessionStorage.getItem('userRole'))

        const role = localStorage.getItem('userRole');

        const intRole = parseInt(role);

        return (
            <div>
                <div className="menu col-md-2">
                    <div class="sidebar-nav">
                        <div className="sidebar-nav">
                            <div className="navbar navbar-default" role="navigation">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="navbar-collapse collapse sidebar-navbar-collapse">
                                    <ul className="nav navbar-nav">
                                        { intRole > 80 &&
                                                <li><ReactRouter.Link to="/users">Users</ReactRouter.Link></li>
                                        }
                                        <li><ReactRouter.Link to="/agenda">Agenda</ReactRouter.Link></li>
                                        <li><ReactRouter.Link to="/schedule">Rooster</ReactRouter.Link></li>
                                        <li><ReactRouter.Link to="/logout">Logout</ReactRouter.Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content col-md-10">
                    {this.props.children}
                </div>
            </div>
            )
}
});

module.exports = Home;