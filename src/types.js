var Failpage = require('./failpage.js');

var Types = React.createClass({

    getInitialState: function(){
        return({
            types: [],
            ajaxUrl: './backend/index.php',
            colors: ['#d20000', '#00509f', '#009f9f', '#009f50', '#9f5000', '#9f009f', '#9f9f00', '#f6fafd'],
            role: 0,
        })
    },

    componentWillMount: function(){
        var element = this;

        element.loadTypes();

        this.setState({role: localStorage.getItem('userRole')})

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

    chooseColor: function(e){
        e.preventDefault();

        var element = this;

        var id    = e.target.parentElement.parentElement.parentElement.parentElement.id;
        var color = e.target.getAttribute('data-value');
        var elem = e.target.parentElement.parentElement.parentElement;

        //e.target.parentElement.parentElement.parentElement.style.display = 'none';

        elem.className = 'colorInputChoose noHover';

        var param = {
            'c'     : 'type',
            'a'     : 'updateColor',
            'param' : {
                'id'    : id,
                'color' : color
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.loadTypes();
            elem.className = 'colorInputChoose';
        }) 
    },

    changeName: function(e){
        e.preventDefault();

        var element = this;

        var val = e.target.value;
        var id  = e.target.getAttribute('data-id');

        var param = {
            'c'     : 'type',
            'a'     : 'changeName',
            'param' : {
                'id'    : id,
                'name'  : val
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){

        }) 
    },

    handleSubmit: function(e){
        e.preventDefault();

        var element = this;

        var name  = element.refs.name.value;
        var color = element.refs.color.value;

        if(name == '' || color == ''){
            return false;
        }else{
            
            var param = {
                'c'     : 'type',
                'a'     : 'addType',
                'param' : {
                    'name'   : name,
                    'color'  : color
                }
            }

            $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
                element.loadTypes();
            })

            element.refs.name.value = '';
            element.refs.color.value = '';             
        }
    },

    removeType: function(e){
        e.preventDefault();

        var element = this;

        var id = e.target.getAttribute('data-id');
        
        var param = {
            'c'     : 'type',
            'a'     : 'removeType',
            'param' : {
                'id'   : id
            }
        }

        console.log(param);

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.loadTypes();
        })        

    },

    render: function(){
        var element = this;

        const selectColor = element.state.colors.map((color, i) => {
            if(color){
                return(
                    <option value={color} style={{background: color}}></option>
                )
            }
        })

        const colors = element.state.colors.map((color, i) => {
            if(color){
                return(
                    <div className="col-xs-3">
                        <div className="colorChooseColor" data-value={color} style={{background: color}} onClick={element.chooseColor}></div>
                    </div>
                )
            }
        })

        const types = element.state.types.map((type, i) => {
            if(type){
                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-8">
                                    <input className="form-control typeInput" type="text" maxLength="16" data-id={type.id} defaultValue={type.name} onChange={element.changeName} />
                                </div>
                                <div className="col-xs-3">
                                    <div id={type.id} className="colorInput" style={{background: type.color}}>
                                        <div className="colorInputChoose">
                                            <div className="row">
                                                {colors}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-1">
                                    { type.id == 1 ? (
                                        null
                                    ) : (
                                        <i className="fa fa-times pull-right delete" data-id={type.id} aria-hidden="true" onClick={element.removeType}></i>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        })

        return (
            <div>
            {element.state.role > 80 ? (
                <div>
                    <h2>Employment types</h2>
                        <div className="row">
                            <div className="col-xs-12 col-sm-10">
                            <h3>Add type</h3>
                                <form className="form-inline">
                                    <input className="form-control" placeholder="Name" type="text" ref="name" maxLength="16" />
                                    <select className="form-control" ref="color">{selectColor}</select>
                                    <input className="btn" type="button" value="Add" onClick={element.handleSubmit} />
                                </form>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Types</h3>
                            <div className="panel panel-default">{types}</div>
                        </div>    
                    </div>
                </div>
            ) : (
                <Failpage message="page" />
            )}
            </div>  
        )
    }
});

module.exports = Types;