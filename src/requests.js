//var Agenda = require('./agenda.js');

var Requests = React.createClass({

    getInitialState: function(){
        return({
            ajaxUrl: './backend/index.php',
            pending: [],
            approved: [],
        })
    },

    componentWillMount: function(){
        this.loadRequests();
    },

    loadRequests: function(){
        var element = this;

        var param = {
            'c'     : 'request',
            'a'     : 'allRequests',
            'param' : {
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
                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-3">{request.naam}</div>
                                <div className="col-md-4">{request.time_from}</div>
                                <div className="col-md-4">{request.time_till}</div>
                                <div className="col-md-1">
                                    <i className="fa fa-check approve" data-request={request.req_id} data-user={request.usr_id} aria-hidden="true" onClick={element.approveRequest}></i>
                                    <i className="fa fa-times delete" data-request={request.req_id} data-user={request.usr_id} aria-hidden="true" onClick={element.declineRequest}></i>
                                </div>
                            </div> 
                        </div>
                    </div>
                )
            }
        })
        
        const approved = this.state.approved.map((request, i) => {
            if(request){
                return(
                    <div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-3">{request.naam}</div>
                                <div className="col-md-4">{request.time_from}</div>
                                <div className="col-md-4">{request.time_till}</div>
                                <div className="col-md-1">
                                    <i className="fa fa-check approved" aria-hidden="true"></i>
                                </div>
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