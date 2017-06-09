var Requests = require('./requests.js');
var Request = require('./request.js');

var Skip = React.createClass({

    getInitialState: function(){
        return({
            role: 0,
        })
    },

    componentWillMount: function(){
        this.setState({role: localStorage.getItem('userRole')})
    },

    render: function(){

        return (
           <div>
                <h2>Skip a day</h2>
                    {
                        this.state.role > 80 &&
                        <Requests />
                    }

                    <Request />
            </div>  
            )
}
});

module.exports = Skip;