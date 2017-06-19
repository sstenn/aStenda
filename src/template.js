var Failpage = require('./failpage.js');

var Template = React.createClass({
    
    getInitialState: function(){
        return({
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            types: [],
            ajaxUrl: './backend/index.php',
            template: [],
            role: 0,
        })
    },

    componentWillMount: function(){

        this.loadTemplate();
        this.loadTypes();

        this.setState({role: localStorage.getItem('userRole')})

    },

    loadTemplate: function(){
        var element = this;

        var param = {
            'c'     : 'template',
            'a'     : 'loadTemplate',
            'param' : {
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.setState({template: data});
        }) 
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

    addEmployment: function(day, from, till, type){
        var element = this;        

        var param = {
            'c'     : 'template',
            'a'     : 'addEmployment',
            'param' : {
                'day' : day,
                'from': from,
                'till': till,
                'type': type
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.loadTemplate();
        }) 


    },

    removeEmployment: function(e){
        e.preventDefault();

        var element = this;

        var day = e.target.getAttribute('data-day');
        var time = e.target.getAttribute('data-time');
        
        var param = {
            'c'     : 'template',
            'a'     : 'removeEmployment',
            'param' : {
                'day' : day,
                'time': time
            }
        } 

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.loadTemplate();
        }) 


    },

    handleSubmit: function(e){
        e.preventDefault();

        var element = this;

        var day  = element.refs.day.value;
        var type = element.refs.type.value;
        var from = element.refs.from.value;
        var till = element.refs.till.value;

        if(from == '' || till == ''){
            return false;
        }else{
            element.addEmployment(day, from, till, type);

            element.refs.from.value = '';
            element.refs.till.value = '';
        }

    },

    render: function(){
        var element = this;

        var template = element.state.template;

        const selectDay = element.state.weekDays.map((day, i) => {
            if(day){
                return(
                        <option value={day}>{day}</option>
                    )
            }
        })

        const selectType = element.state.types.map((type, i) => {
            if(type){
                return(
                        <option className="templateColorOption" value={type.id} style={{background: type.color}}>{type.name}</option>
                    )
            }
        })

        const days = element.state.weekDays.map((day, i) => {
                    if(day){

                        if(template[day]){
                            var times = template[day].map((val, i) => {
                                var time = val.split('|');
                                return(
                                    <div className="employment borderAll" style={{background: time[1]}}>
                                        {time[0]}
                                        <i className="fa fa-times delete pull-right" data-day={day} data-time={time[0]} onClick={element.removeEmployment} aria-hidden="true"></i>
                                    </div>
                                )   
                            })
                        }

                        return(
                                <div className="tableBody">
                                   <h4 className="borderBottom">{day}</h4>
                                   <div className="borderAll">
                                        {times ? times : ''}
                                   </div> 
                                </div>
                            )
                    }
                })


        return (
            <div>
                {element.state.role > 80 ? (
                    <div>
                        <h2>Template</h2>
                        <div className="row">
                            <div className="col-xs-12 col-sm-10">
                                <form className="form-inline">
                                    <select className="form-control" ref="day">{selectDay}</select>
                                    <select className="form-control" ref="type">{selectType}</select>
                                    <input className="form-control" type="time" ref="from" />
                                    <input className="form-control" type="time" ref="till" />
                                    <input className="btn" type="button" value="Add" onClick={element.handleSubmit} />
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-10">
                                {days}
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

module.exports = Template;