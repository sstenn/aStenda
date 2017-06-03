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
                                        { role > 80 &&
                                                <li><ReactRouter.Link to="/users">Users</ReactRouter.Link></li>
                                        }
                                        <li><ReactRouter.Link to="/agenda">Agenda</ReactRouter.Link></li>
                                        <li className="dropdown">
                                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Schedule<span className="caret"></span></a>
                                            <ul className="dropdown-menu">
                                                { role >80 &&
                                                    <li><ReactRouter.Link to="/template">Template</ReactRouter.Link></li>
                                                }
                                            </ul>
                                        </li>
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