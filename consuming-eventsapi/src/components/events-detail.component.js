import Axios from "axios";
import React,{Component} from "react";
import {BrowserRouter as Router,Switch,Link} from "react-router-dom";
export default class EventsDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            eve : {}
        }
    }
    deleteEvent(id){
        console.log(id);
        Axios.delete('http://localhost:3001/events/'+ id)
        .then(result => {
            console.log('Event deleted with id :'+ id);
            this.props.history.push('/events');
        })
        .catch(error=>console.log('There is some error : ',error));
   

    }

    componentDidMount(){
        Axios.get('http://localhost:3001/events/'+this.props.match.params.id)
        .then(result=>{
            this.setState({eve:result.data});
            console.log(this.state.eve);
        })
        .catch(error=>console.log('There is some error : ',error));
    }

    render(){
        return(
            <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Details of {this.state.eve.title}
                    </h3>
                    <br />
                </div>
                <div className="panel-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Events Title</th>
                                <td>{this.state.eve.title}</td>
                            </tr>
                            <tr>
                                <th>Events Description</th>
                                <td>{this.state.eve.description}</td>
                            </tr>
                            
                            <tr>
                                <th>Events Date</th>
                                <td>{this.state.eve.date}</td>
                            </tr>
 
                            <tr>
                                <td>
                                    <Link className="btn btn-info" to='/events'>Back to List</Link>

                                    <Link to={`/events-edit/${this.state.eve._id}`} className="btn btn-secondary">Edit</Link>
                                    <button onClick={this.deleteEvent.bind(this,this.state.eve._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}
