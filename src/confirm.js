var Confirm = React.createClass({

    getInitialState: function(){
        return({

        })
    },

    componentWillMount: function(){

    },

    render: function(){
        console.log('confirm')


        return (
            <div className="confirm-bg">
               <div className="confrim col-md-2 col-md-offset-5">
                    Weet je het zeker?
               </div> 
            </div>
            )
}
});

module.exports = Confirm;