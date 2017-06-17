var Agenda = React.createClass({
    
    getInitialState: function(){
        return({
            ajaxUrl: './backend/index.php',
            weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            colors: ['#d20000', '#00509f', '#009f9f', '#009f50', '#9f5000', '#9f009f', '#9f9f00'],
            user_id: 0,
            activities: [],
            errorMessage: '',
        })
    },

    componentWillMount: function(){
        //this.setState({user_id: localStorage.getItem('userGoogleId')})



        this.loadActivities();
    },

    loadActivities: function(){
        var element = this;

        var param = {
            'c'     : 'schedule',
            'a'     : 'loadActivities',
            'param' : {
                'user'  : localStorage.getItem('userGoogleId'),
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.setState({activities: data});
            console.log(data);
        }) 
    },

    render: function(){

        var element  = this;
        var fullYear = '';

        const events = element.state.activities.map((event, i) => {
            if(event){
                
                var d = new Date(event.date);
                var day = element.state.weekDays[d.getDay()]
                var dayNr = d.getDate()
                var month = element.state.months[d.getMonth()]
                var year  = d.getFullYear()
                var color = element.state.colors[d.getDay()]
                var setYear = false;

                if(year != fullYear){
                    setYear = true;
                    fullYear = year;
                }

                return(
                    <div>
                        { setYear ? (
                            <div className="col-xs-12 col-md-10"><h3 className="pull-right">{year}</h3></div>
                        ) : (
                            null
                        )}
                        <div className="row">
                            <div className="col-xs-12 col-md-10 event borderBottom"> 
                                <div className="col-xs-4 col-sm-2">
                                    <div className="dateLabel" style={{background: color}}>
                                        <p>{day}</p>
                                        <p className="dayNr">{dayNr}</p>
                                        <p>{month}</p>
                                    </div>
                                </div>
                                <div className="col-xs-8 eventDetail">
                                    <span><h4>{event.naam}</h4>
                                    <p>{event.time_from}u - {event.time_till}u</p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                
            }
        })

        return (
            <div>
                <div className="errorMessage">{element.state.errorMessage}</div>
                <h2>Agenda</h2>
                {events}
            </div>
        )
    }
});

module.exports = Agenda;