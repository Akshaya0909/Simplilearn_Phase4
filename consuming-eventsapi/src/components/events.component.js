import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    getEvents() {
        axios.get(`http://localhost:3001/events`)
            .then(result => {
                const eventsList = result.data;
                this.setState({ events: eventsList });
                console.log(this.state.events);
            })
            .catch(error => console.log('There is some error : ', error));
    }

    componentDidMount() {
        this.getEvents();
    }

    render() {
        return (
            <div>
                <h4>One step solution to managing your events!</h4>
                <br />
                <Link to='/events-add' className="btn btn-secondary" >Add a New Event</Link>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue._id}</td>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.description}</td>
                                
                                    <td>{listValue.date}</td>
                                    <td>
                                        {/* <Link to={`/notes-detail/${listValue._id}`}>Show Details</Link> */}
                                        <Link to={'/events-detail/' + listValue._id}>Show Event Details</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}