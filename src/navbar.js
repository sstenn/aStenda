var Home = require('./home.js');
var Agenda = require('./agenda.js');
var Users = require('./users.js');
var Template = require('./template.js');
var Logout = require('./logout.js');

var { Router,
  Route,
  IndexRoute,
  IndexLink,
  hashHistory,
  Link } = ReactRouter;

  var Navbar = React.createClass({

    getInitialState: function(){
      return({
          render: ''
      })
    },

    componentWillMount: function(){

    },

    render: function(){

      return (
        <Router history={hashHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={Agenda}/> // Default page
            <Route path="users" component={Users} />
            <Route path="agenda" component={Agenda} />
            <Route path="template" component={Template} />
            <Route path="logout" component={Logout} />
          </Route>
        </Router>
      )
    }
  });

  module.exports = Navbar;

/*
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
 	  <IndexRoute component={Agenda}/> // Default page
 	    <Route path="agenda" component={Agenda} />
      <Route path="schedule" component={Schedule} />
    </Route>
  </Router>, document.getElementById('app'));*/