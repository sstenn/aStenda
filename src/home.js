var Home = React.createClass({

    getInitialState: function(){
        return({
            role : 0,

        })
    },

    componentWillMount: function(){
        this.setState({role: localStorage.getItem('userRole')})
    },

    logout: function(){
        //Maak de localstorage leeg en ga terug naar de login
        localStorage.setItem('userRole', 0);
        localStorage.setItem('userGoogleId', '');

        window.location = "http://localhost/aStenda/";
    },

    render: function(){
        //bouw het menu op, op basis van de rollen worden menu items wel of niet getoont

        var element = this;

        const role = this.state.role;

        return (
            <div>
                <div className="menu col-md-2">
                    <div className="sidebar-nav">
                        <div className="sidebar-nav">
                            <div className="sidebar-brand"><h1>aStenda</h1></div>
                            <div className="navbar navbar-default" role="navigation">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="logo-wrapper">
                                    <img className="logo" src="./data/logov2.png" />
                                </div>
                                <div className="navbar-collapse collapse sidebar-navbar-collapse">
                                    <ul className="nav navbar-nav">
                                        { role > 80 &&
                                                <li><ReactRouter.Link to="/users"><i className="fa fa-user-circle-o fa-fw" aria-hidden="true"></i> Users</ReactRouter.Link></li>
                                        }
                                        <li><ReactRouter.Link to="/agenda"><i className="fa fa-calendar fa-fw" aria-hidden="true"></i> Agenda</ReactRouter.Link></li>
                                        <li className="dropdown">
                                            <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-tasks fa-fw" aria-hidden="true"></i> Schedule<span className="caret"></span></a>
                                            <ul className="dropdown-menu">
                                                <li><ReactRouter.Link to="/schedule">Schedule</ReactRouter.Link></li>
                                                { role > 80 &&
                                                    <li><ReactRouter.Link to="/scheduleMaker">Make schedule</ReactRouter.Link></li>
                                                }
                                                { role > 80 &&
                                                    <li><ReactRouter.Link to="/template">Template</ReactRouter.Link></li>
                                                }
                                                { role > 80 &&
                                                    <li><ReactRouter.Link to="/types">Types</ReactRouter.Link></li>
                                                }
                                                <li><ReactRouter.Link to="/skipaday">Skip a day</ReactRouter.Link></li>
                                            </ul>
                                        </li>
                                        <li className="logout" onClick={element.logout}><a><i className="fa fa-sign-out fa-fw" aria-hidden="true"></i> Logout</a></li>
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