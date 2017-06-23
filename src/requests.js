//var Agenda = require('./agenda.js');

var Requests = React.createClass({

    getInitialState: function(){
        return({
            ajaxUrl: './backend/index.php',
            pending: [],
            approved: [],
            rerender: false,
            user_id: 0,
            role: 0,
        })
    },

    componentWillReceiveProps: function(nextProps){
        this.loadRequests();
    },

    componentWillMount: function(){
        this.setState({
            user_id: localStorage.getItem('userGoogleId'),
            role: localStorage.getItem('userRole')
        })

        this.loadRequests();
    },

    loadRequests: function(){
        var element = this;

        var param = {
            'c'     : 'request',
            'a'     : 'allRequests',
            'param' : {
                'role'    : element.state.role,
                'user_id' : element.state.user_id
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.setState({pending: data['pending'], approved: data['approved']});
        })        

    },

    approveRequest: function(e){
        e.preventDefault();

        var element = this;

        var request = e.target.getAttribute('data-request');
        var user    = e.target.getAttribute('data-user');

        var param = {
            'c'     : 'request',
            'a'     : 'approveRequest',
            'param' : {
                'request' : request,
                'user'    : user
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.loadRequests();
        })

    },

    declineRequest: function(e){
        e.preventDefault();

        var element = this;

        var request = e.target.getAttribute('data-request');
        var user    = e.target.getAttribute('data-user');

        var param = {
            'c'     : 'request',
            'a'     : 'declineRequest',
            'param' : {
                'request' : request,
                'user'    : user
            }
        }

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.loadRequests();
        })
    },

    render: function(){
        var element = this;

        const pending = this.state.pending.map((request, i) => {
            if(request){

                //Zet de datums en tijd in een leesbare weergave
                var dateTimeFrom = request.time_from.split(" ");            
                var aDateFrom    = dateTimeFrom[0].split("-");
                var dateFrom     = aDateFrom[2] + '-' + aDateFrom[1] + '-' + aDateFrom[0];
                var aTimeFrom    = dateTimeFrom[1].split(":");
                var timeFrom     = aTimeFrom[0] + ':' + aTimeFrom[1];
                var datetimefrom = dateFrom + ' ' + timeFrom;

                var dateTimeTill = request.time_till.split(" ");            
                var aDateTill    = dateTimeTill[0].split("-");
                var dateTill     = aDateTill[2] + '-' + aDateTill[1] + '-' + aDateTill[0];
                var aTimeTill    = dateTimeTill[1].split(":");
                var timeTill     = aTimeTill[0] + ':' + aTimeTill[1];
                var datetimetill = dateTill + ' ' + timeTill;

                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-3">{request.naam}</div>
                                <div className="col-sm-4">{datetimefrom}</div>
                                <div className="col-sm-4">{datetimetill}</div>
                                <div className="col-sm-1">
                                {   element.state.role > 80 &&
                                    <i className="fa fa-check approve" data-request={request.req_id} data-user={request.usr_id} aria-hidden="true" onClick={element.approveRequest}></i>
                                }
                                    <i className="fa fa-times delete" data-request={request.req_id} data-user={request.usr_id} aria-hidden="true" onClick={element.declineRequest}></i>
                                </div>
                                <div className="col-sm-12">{request.reason}</div>
                            </div> 
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-12">No requests!</div>
                            </div>
                        </div>
                    </div>
                )
            }
        })
        
        const approved = this.state.approved.map((request, i) => {
            if(request){

                //Zet de datums en tijd in een leesbare weergave
                var dateTimeFrom = request.time_from.split(" ");            
                var aDateFrom    = dateTimeFrom[0].split("-");
                var dateFrom     = aDateFrom[2] + '-' + aDateFrom[1] + '-' + aDateFrom[0];
                var aTimeFrom    = dateTimeFrom[1].split(":");
                var timeFrom     = aTimeFrom[0] + ':' + aTimeFrom[1];
                var datetimefrom = dateFrom + ' ' + timeFrom;

                var dateTimeTill = request.time_till.split(" ");            
                var aDateTill    = dateTimeTill[0].split("-");
                var dateTill     = aDateTill[2] + '-' + aDateTill[1] + '-' + aDateTill[0];
                var aTimeTill    = dateTimeTill[1].split(":");
                var timeTill     = aTimeTill[0] + ':' + aTimeTill[1];
                var datetimetill = dateTill + ' ' + timeTill;

                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-3">{request.naam}</div>
                                <div className="col-sm-4">{datetimefrom}</div>
                                <div className="col-sm-4">{datetimetill}</div>
                                <div className="col-sm-1">
                                    <i className="fa fa-check approved" aria-hidden="true"></i>
                                </div>
                                <div className="col-sm-12">{request.reason}</div>
                            </div> 
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-12">No requests!</div>
                            </div>
                        </div>
                    </div>
                )
            }
        })

        return (
            <div>
                <div className="row">
                    <div className="col-md-5">
                        <h3>Pending requests</h3>
                        <div className="panel panel-default">{pending}</div>
                    </div>
                    <div className="col-md-5">
                        <h3>Approved requests</h3>
                        <div className="panel panel-default">{approved}</div>
                    </div>
                </div>
            </div>
            )
}
});

module.exports = Requests;