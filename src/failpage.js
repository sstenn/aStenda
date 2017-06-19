//var Agenda = require('./agenda.js');

var Fail = React.createClass({

    getInitialState: function(){
        return({
            message: 'app',

        })
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            message: nextProps.message,
        })
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
                {this.state.message == 'app' &&
                    <div>
                        You are not allowed in this application,
                        click <a href="#" onClick={this.handleClick}>here</a> to go back to the home page
                    </div>
                }
                {this.state.message == 'page' &&
                    <div>
                        You are not allowed on this page
                    </div>
                }
                </div>
            </div>
            )
    }
});

module.exports = Fail;