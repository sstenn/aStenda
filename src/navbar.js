var Home = require('./home.js');
var Agenda = require('./agenda.js');
var Users = require('./users.js');
var Template = require('./template.js');
var Types = require('./types.js');
var ScheduleMaker = require('./scheduleMaker.js');
var Schedule = require('./schedule.js');
var Skip = require('./skipaday.js');

var { Router,
  Route,
  IndexRoute,
  IndexLink,
  hashHistory,
  Link } = ReactRouter;

  var Navbar = React.createClass({

    getInitialState: function(){
      return({
          role: 0
      })
    },

    componentWillMount: function(){

    },

    componentWillReceiveProps: function(nextProps){
      this.setState({
        role: nextProps.role,
      })
    },

    render: function(){
      //De routes van het menu naar de juiste componenten
      return (
        <Router history={hashHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={Agenda}/> // Default page
            <Route path="users" component={Users} />
            <Route path="agenda" component={Agenda} />
            <Route path="schedule" component={Schedule} />
            <Route path="scheduleMaker" component={ScheduleMaker} />
            <Route path="template" component={Template} />
            <Route path="types" component={Types} />
            <Route path="skipaday" component={Skip} />
          </Route>
        </Router>
      )
    }
  });

  module.exports = Navbar;
