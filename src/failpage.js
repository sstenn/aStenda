//var Agenda = require('./agenda.js');

var Fail = React.createClass({

    getInitialState: function(){
        return({

        })
    },

    componentWillMount: function(){
    },

    handleClick: function(){
        localStorage.setItem('userRole', 0);
        localStorage.setItem('userGoogleId', '');

        window.location = "http://localhost/aStenda/";
    },

    render: function(){

        return (
            <div>
                <div className="col-md-8 col-md-offset-2">
                    You are not allowed in this application,
                    click <a href="#" onClick={this.handleClick}>here</a> to go back to the home page
                </div>
            </div>
            )
    }
});

module.exports = Fail;