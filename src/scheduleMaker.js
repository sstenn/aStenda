var Popup = require('./popup.js');

var ScheduleMaker = React.createClass({

    getInitialState: function(){
        return({
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            days: [],
            yearCount: 10,
            weeks: [],
            years: [],
            daysInWeek: 7,
            ajaxUrl: './backend/index.php',
            template: [],
            errorMessage: '',
            users: [],
            selectedUser: '',
            tempSchedule: [],
            param: [],
            activeWeek: 0,
            activeYear: 0,
        })
    },

    componentWillMount: function(){
        var element = this;

        element.loadTemplate();
        element.loadUsers();
        element.loadTempSchedule();

        for(var i=1 ; i<53 ; i++){

            //if week nr nog niet voorkomt in roosters die klaar zijn dan  || Bij het selecteren of er al een rooster bestaat
            element.state.weeks.push(i);
        }

        var date = new Date();
        var year = date.getFullYear();

        for(var i=0 ; i<=element.state.yearCount ; i++){
            element.state.years.push(year+i);
        }
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

    loadTempSchedule: function(){
        var element = this;

        var param = {
            'c'     : 'schedule',
            'a'     : 'getTempSchedule',
            'param' : {
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){

            element.setState({tempSchedule: data})

        })
    },

    getCurrentWeekAndYear: function(){
        var now = new Date();
        var oneJan = new Date(now.getFullYear(), 0, 1);
        var week = Math.ceil( (((now - oneJan) / 86400000) + oneJan.getDay() + 1) / 7 );
        var year = now.getFullYear();

        var weekYear = [];

        weekYear.push(week, year)

        return weekYear;
    },

    getFirstDayOfWeek: function(w, y) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dd = simple.getDate();
        var mm = simple.getMonth() +1;
        var Y  = simple.getFullYear();

        var weekStart = simple;
        
        if (dd <= 4)
            weekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            weekStart.setDate(simple.getDate() + 8 - simple.getDay());


        return weekStart;
    },

    handleSubmit: function(e){
        e.preventDefault();

        var element = this;

        var week = (element.refs.week.value);
        var year = element.refs.year.value;

        var current = element.getCurrentWeekAndYear();

        if((week < current[0] && year == current[1]) || year < current[1])
        {
            element.setState({errorMessage: 'This week is in the past'});
        }
        else
        {
            element.setState({errorMessage: '', activeWeek: week, activeYear: year});

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
        }
    },

    handleUserClick: function(e){
        e.preventDefault();

        var element = this;

        var selected = e.target.getAttribute('data-user');

        element.setState({selectedUser: selected});
    },

    setUserToEmployment: function(e){
        e.preventDefault();

        var element = this;

        var times   = e.target.getAttribute('data-time');
        var date    = e.target.getAttribute('data-date');
        var unique  = e.target.getAttribute('data-unique');
        var user_id = element.state.selectedUser;


        element.setState({errorMessage: ''});

        if(user_id == ''){
            return false;
        }else{

            var param = {
                'c'     : 'schedule',
                'a'     : 'setTempEmployment',
                'param' : {
                    'times'  : times,
                    'date'   : date,
                    'user_id': user_id,
                    'unique' : unique
                }
            }

            $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){

                if(!data){
                    element.setState({errorMessage: 'You approved a day off request on this date for this user!'});
                }else{
                    element.loadTempSchedule();
                }
            })
        }

        element.setState({selectedUser: ''});
    },

    popup: function(e){
        e.preventDefault();

        var element = this;

        if(element.state.days.length > 0){
            this.setState({showConfirm: true});
        }else{
            return false;
        }

        

    },

    sendSchedule: function(action){
        var element = this;

        if(action == "Yes"){
            
            var param = {
                'c'     : 'schedule',
                'a'     : 'sendSchedule',
                'param' : {
                    'first'   : element.state.days[0],
                    'last'    : element.state.days[6],
                    'week'    : element.state.activeWeek,
                    'year'    : element.state.activeYear
                }
            }

            $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
                element.setState({errorMessage: 'Schedule sent!'});
            })

        }
        
        element.setState({showConfirm: false});

    },

    render: function(){
        var element = this;

        var template = element.state.template;
        var tempSchedule = element.state.tempSchedule;

        const selectWeek = element.state.weeks.map((w, i) => {
            if(w){
                return(
                        <option value={w}>{w}</option>
                    )
            }
        })

        const selectYear = element.state.years.map((y, i) => {
            if(y){
                return(
                        <option value={y}>{y}</option>
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
                                var employee = tempSchedule[key];

                                return(
                                    <div className="employment borderAll" data-unique={time[2]} data-time={time[0]} data-date={day} style={{background: time[1]}} onClick={element.setUserToEmployment}>
                                        {time[0]}
                                        <div className="employee">{employee}
                                        { typeof employee != 'undefined' ? (
                                            <i className="fa fa-check fa-fw" aria-hidden="true"></i>
                                        ) : (
                                            null
                                        )}
                                        </div>
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

        const users = element.state.users.map((user, i) => {
            if(user){

                var classes  = "col-xs-12 col-sm-6 col-md-2";
                classes += user.id == element.state.selectedUser ? " selectedUser" : "";

                return(
                    <div className={classes}>
                        <div className="panel-body">
                            <a href="#" data-user={user.id} onClick={element.handleUserClick} >{user.naam}</a> 
                        </div>
                    </div>
                )
            }
        })

        return (
            <div>
                <div className="errorMessage">{element.state.errorMessage}</div>
                <h2>Schedule maker</h2>
                <div className="row">
                    <div className="col-xs-6 col-sm-6">
                        <form className="form-inline">
                            <select className="form-control" ref="week">{selectWeek}</select>
                            <select className="form-control" ref="year">{selectYear}</select>
                            <input className="btn" type="button" value="Select" onClick={element.handleSubmit} />
                        </form>
                    </div>
                    <div className="col-xs-6 col-sm-6">
                        <input className="btn" type="button" value="Send!" onClick={element.popup} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-10">
                        {week}
                    </div>  
                </div>
                <div className="row scheduleMakerUsers">
                    <div className="col-xs-12 col-md-10">
                        <div className="panel panel-default"><div className="row">{users}</div></div>
                    </div>
                </div>
                {element.state.showConfirm ? (
                    <Popup message="Send this schedule?" handleClick={element.sendSchedule} />
                ) : (
                    null
                )}
            </div>  
            )
    }
});

module.exports = ScheduleMaker;