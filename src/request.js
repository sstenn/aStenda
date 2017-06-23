var Request = React.createClass({

    getInitialState: function(){
        return({
            ajaxUrl: './backend/index.php',
            user_id: 0,
        })
    },

    componentWillMount: function(){
        this.setState({user_id: localStorage.getItem('userGoogleId')});

    },

    doRequest: function(dateFrom, dateTill, timeFrom, timeTill, reason){

        var element = this;
        
        var param = {
            'c'     : 'request',
            'a'     : 'requestSkip',
            'param' : {
                'dateFrom' : dateFrom,
                'dateTill' : dateTill,
                'timeFrom' : timeFrom,
                'timeTill' : timeTill,
                'reason'   : reason,
                'user_id'  : element.state.user_id,
            }
        } 

        $.post({url: element.state.ajaxUrl, data: param, dataType: 'json'}).done(function(data){
            element.props.rerender();
        }) 

    },

    handleSubmit: function(e){
        e.preventDefault();

        var element = this;

        var dateFrom = element.refs.requestFromDate.value;
        var timeFrom = element.refs.requestFromTime.value;
        var dateTill = element.refs.requestTillDate.value;
        var timeTill = element.refs.requestTillTime.value;
        var reason   = element.refs.requestReason.value;

        if(dateFrom == '' || dateTill == '' || reason == ''){
            //Als een van de velden leeg is, doe niks
            return false;
        }else{
            //Als de juiste velden gevuld zijn, doe een request
            element.doRequest(dateFrom, dateTill, timeFrom, timeTill, reason);
            //Maak de input velden weer leeg na de request
            element.refs.requestFromDate.value = '';
            element.refs.requestFromTime.value = '';
            element.refs.requestTillDate.value = '';
            element.refs.requestTillTime.value = '';
            element.refs.requestReason.value   = '';
        }

    },

    checkFields: function(e){
        e.preventDefault();

        var target = e.target.id;

        if(target == 'dateFrom'){
            //Als de datum van word gezet moet de minimale datum van de datum tot de waarde van de datum van zijn
            document.getElementById('dateTill').setAttribute('min', e.target.value);
        }else{
            //En andersom
            document.getElementById('dateFrom').setAttribute('max', e.target.value);
        }
    },

    render: function(){
        var element = this;

        return (
           <div>
                <div className="row">
                    <div className="col-md-5">
                        <h3>Request a day off!</h3>
                        <form>
                            <div className="input-group">
                                <span className="input-group-addon">From</span>
                                <input id="dateFrom" type="date" className="form-control requestDate" ref="requestFromDate" onChange={element.checkFields} /> 
                                <input type="time" className="form-control requestTime" ref="requestFromTime" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">Till</span>
                                <input id="dateTill" type="date" className="form-control requestDate" ref="requestTillDate" onChange={element.checkFields} /> 
                                <input type="time" className="form-control requestTime" ref="requestTillTime" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">Reason</span>
                                <input type="text" className="form-control" ref="requestReason" /> 
                            </div>
                            <input className="btn pull-right" type="button" value="Request" onClick={element.handleSubmit} />
                        </form>
                    </div>
                </div> 
            </div>  
            )
    }
});

module.exports = Request;