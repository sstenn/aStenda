var Types = React.createClass({

    getInitialState: function(){
        return({
            types: [],
            ajaxUrl: './backend/index.php',
        })
    },

    componentWillMount: function(){
        var element = this;

        element.loadTypes();
    },

    loadTypes: function(){
        var element = this;

        var param = {
            'c'     : 'type',
            'a'     : 'getAllTypes',
            'param' : {
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.setState({types: data});
        }) 
    },

    render: function(){
        var element = this;

        const types = element.state.types.map((type, i) => {
            if(type){
                return(
                    <div>
                        <div className="panel-body">
                            <a href="#">{type.name}</a>
                            <i className="fa fa-times pull-right delete" aria-hidden="true" onClick={element.removeType}></i> 
                        </div>
                    </div>
                )
            }
        })

        return (
           <div>
                <h2>Employment types</h2>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Types</h3>
                        <div className="panel panel-default">{types}</div>
                    </div>    
                </div>
            </div>  
            )
}
});

module.exports = Types;