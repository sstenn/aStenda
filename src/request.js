var Request = React.createClass({

    getInitialState: function(){
        return({
        })
    },

    componentWillMount: function(){
    },

    handleSubmit: function(e){
        e.preventDefault();



    },

    render: function(){
        var element = this;

        return (
           <div>
                <div className="row">
                    <div className="col-md-5">
                        <h3>Request a day off!</h3>
                    </div>
                </div> 
            </div>  
            )
    }
});

module.exports = Request;