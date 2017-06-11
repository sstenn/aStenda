var Requests = require('./requests.js');
var Request = require('./request.js');

var Skip = React.createClass({

    getInitialState: function(){
        return({
            role: 0,
            rerender: 'false',
        })
    },

    componentWillMount: function(){
        this.setState({role: localStorage.getItem('userRole')})
    },

    rerender: function(){
        this.setState({rerender: 'true'})
    },

    render: function(){

        return (
           <div>
                <h2>Skip a day</h2>
                    <Request rerender={this.rerender} />

                    <Requests rerender={this.state.rerender} />
            </div>  
            )
}
});

module.exports = Skip;