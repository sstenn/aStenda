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
        })
    },

    componentWillMount: function(){
        var element = this;

        element.loadTemplate();
        element.loadUsers();
        element.loadTempSchedule();

        for(var i=0 ; i<=52 ; i++){

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

        var week = element.refs.week.value;
        var year = element.refs.year.value;

        var current = element.getCurrentWeekAndYear();

        if(week < current[0] || year < current[1])
        {
            element.setState({errorMessage: 'This week is in the past'});
        }
        else
        {
            element.setState({errorMessage: ''});

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
        var user_id = element.state.selectedUser;

        if(user_id == ''){
            return false;
        }else{

            var param = {
                'c'     : 'schedule',
                'a'     : 'setTempEmployment',
                'param' : {
                    'times'  : times,
                    'date'   : date,
                    'user_id': user_id
                }
            }

            $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){

                

            })
        }

        element.setState({selectedUser: ''});
    },

    render: function(){
        var element = this;

        var template = element.state.template;

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

                                //tempSchedule[{day}{time[0]}{time[1]]}]

                                return(
                                    <div className="employment borderAll" data-time={time[0]} data-date={day} style={{background: time[1]}} onClick={element.setUserToEmployment}>
                                        {time[0]}
                                        <div className="employee"></div>
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
                <h2>Schedule maker</h2>
                <div className="row">
                    <div className="col-xs-12 col-sm-10">
                        <form className="form-inline">
                            <select className="form-control" ref="week">{selectWeek}</select>
                            <select className="form-control" ref="year">{selectYear}</select>
                            <input className="btn" type="button" value="Select" onClick={element.handleSubmit} />
                        </form>
                        <div className="col-md-8">{element.state.errorMessage}</div>
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
            </div>  
            )
}
});

module.exports = ScheduleMaker;