var Popup = React.createClass({

    getInitialState: function(){
        return({
            message: '',
        })
    },

    componentWillMount: function(){
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            message: nextProps.message
        })
    },

    handleClick: function(e){
        e.preventDefault();

        var action = e.target.value;

        this.props.handleClick(action)
    },

    render: function(){

        return (
            <div className="confirm-bg">
               <div className="confirm col-md-2 col-md-offset-5">
                    <div className="row message">{this.props.message}</div>
                    <div className="row buttons">
                        <input className="btn btn-default" type="button" value="Yes" onClick={this.handleClick} />
                        <input className="btn btn-default" type="button" value="No" onClick={this.handleClick} />
                    </div>
               </div> 
            </div>
            )
    }
});

module.exports = Popup;