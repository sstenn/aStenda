//var Agenda = require('./agenda.js');

var Home = React.createClass({

    getInitialState: function(){
        return({
            role : 0,

        })
    },

    componentWillMount: function(){
        this.setState({role: localStorage.getItem('userRole')})
    },

    render: function(){
        //console.log(sessionStorage.getItem('userRole'))

        const role = this.state.role;

        //console.log(role);

        //const intRole = parseInt(role);

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
                                        <li><ReactRouter.Link to="/logout"><i className="fa fa-sign-out fa-fw" aria-hidden="true"></i> Logout</ReactRouter.Link></li>
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