var Popup = require('./popup.js');

var ScheduleMaker = React.createClass({

    getInitialState: function(){
        return({
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            days: [],
            weeks: [],
            daysInWeek: 7,
            ajaxUrl: './backend/index.php',
            template: [],
            errorMessage: '',
            users: [],
            schedule: [],
            types: [],
        })
    },

    componentWillMount: function(){
        var element = this;

        element.loadTemplate();
        element.loadUsers();
        element.loadSchedule();
        element.loadWeeks();
        element.loadTypes();

    },

    loadWeeks: function(){
        var element = this;

        var param = {
            'c'     : 'schedule',
            'a'     : 'loadWeeks',
            'param' : {
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.setState({weeks: data});
        }) 

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

    loadUsers: function(){
        var element = this;

        var param = {
            'c'     : 'user',
            'a'     : 'allUsers',
            'param' : {
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){

            element.setState({users: data['users']})

        })
        
    },

    loadSchedule: function(){
        var element = this;

        var param = {
            'c'     : 'schedule',
            'a'     : 'getSchedule',
            'param' : {
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){

            element.setState({schedule: data})

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

    getFirstDayOfWeek: function(w, y) {
        var today = new Date(y, 0, 1 + (w - 1) * 7);
        var dayOfWeekStartingSundayZeroIndexBased = today.getDay(); // 0 : Sunday ,1 : Monday,2,3,4,5,6 : Saturday
        var mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+1);

        return mondayOfWeek;
    },

    handleWeekClick: function(e){
        e.preventDefault();

        var element = this;

        var values = e.target.value.split("|");
        var week = values[0];
        var year = values[1];
            

        var startDate = element.getFirstDayOfWeek(week, year);

        var thisWeek = [];
        element.setState({days: []});

        for(var i=0 ; i<element.state.daysInWeek ; i++){
            var day = new Date(startDate);
            var next = day.setDate(day.getDate() +i);
            var dateObject = new Date(next);
            
            var dd = dateObject.getDate();
            var mm = dateObject.getMonth() +1;
            var Y  = dateObject.getFullYear();

            var date = dd + '-' + mm + '-' + Y;
               
            thisWeek.push(date);
        }

        element.setState({days: thisWeek});

    },

    render: function(){
        var element = this;

        var template = element.state.template;
        var schedule = element.state.schedule;

        const legenda = element.state.types.map((t, i) => {
            if(t){

                return(
                        <div className="col-md-3">
                            <div className="legenda" style={{background: t.color}}>{t.name}</div>
                        </div>
                    )
            }
        })

        const weekButtons = element.state.weeks.map((w, i) => {
            if(w){

                var value = w.week + '|' + w.year;

                return(
                        <button className="btn btn-default" value={value} onClick={element.handleWeekClick}>{w.week}</button>
                    )
            }
        })

        const week = element.state.days.map((day, i) => {
                    if(day){

                        var fullDay = element.state.weekDays[i];

                        if(template[fullDay]){
                            var times = template[fullDay].map((val, i) => {
                                var time = val.split('|');

                                var key = time[0] + day + time[2];
                                var employee = schedule[key];

                                return(
                                    <div>
                                        { typeof employee != 'undefined' ? (
                                            <div className="employment borderAll" data-unique={time[2]} data-time={time[0]} data-date={day} style={{background: time[1]}} >
                                                {time[0]}
                                                <div className="employee">{employee}</div>
                                            </div>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                )   
                            })
                        }

                        return(
                                <div className="tableBody">
                                   <h4 className="borderBottom dateDay">{day}</h4>
                                   <div className="fullDay">{fullDay}</div>
                                   <div className="borderAll">
                                        {times ? times : ''}
                                   </div> 
                                </div>
                            )
                    }
                })

        return (
            <div>
                <div className="errorMessage">{element.state.errorMessage}</div>
                <h2>Schedule</h2>
                <div className="row">
                    <div className="col-md-5 col-md-offset-5">
                        <div className="row">{legenda}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-5 col-sm-5">Weeks 
                        {weekButtons}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-10">
                        {week}
                    </div>  
                </div>
            </div>  
            )
    }
});

module.exports = ScheduleMaker;