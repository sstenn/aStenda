var Template = React.createClass({
    
    getInitialState: function(){
        return({
            weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Suterday', 'Sunday']

        })
    },

    componentWillMount: function(){
    },

    render: function(){

        const tableHead = this.state.weekDays.map((day, i) => {
                    if(day){
                        return(
                                <div className="col-md-1 borderAll">
                                   <h4>{day}</h4> 
                                </div>
                            )
                    }
                })

        const tableBody = this.state.weekDays.map((day, i) => {
                    if(day){
                        return(
                                <div className="col-md-1 borderAll">
                                    <button className="btn">Add +</button>
                                </div>
                            )
                    }
                })

        return (
            <div>
                <div className="row">
                    <h2>Template</h2>
                    <div className="text-center">
                        <div className="row">
                            {tableHead}    
                        </div>
                        <div className="row">
                            {tableBody}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Template;