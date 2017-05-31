//var Agenda = require('./agenda.js');

var Fail = React.createClass({

    getInitialState: function(){
        return({

        })
    },

    componentWillMount: function(){
    },

    handleClick: function(){
        window.location = "http://localhost/aStenda/";
    },

    render: function(){

        return (
            <div>
                <div className="col-md-8 col-md-offset-2">
                    You are not allowed in this app
                    Click here to go back to the home page <button onClick={this.handleClick}>Go back!</button>
                </div>
            </div>
            )
    }
});

module.exports = Fail;