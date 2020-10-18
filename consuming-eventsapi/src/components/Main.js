import React,{Component} from "react";
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Home from './Home';
import Events from './events.component';
import EventsDetails from './events-detail.component';
import EventsAdd from './events-add.component';
import EventsEdit from './events-edit.component';



export default class Main extends Component {
  render() {
      
    
      return (
          <div>

              <Router>
                  <div className="container">
                      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                          <Link to={'/'} className="navbar-brand">Admin Portal</Link>
                          <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav mr-auto">
                                  <li className="nav-item">
                                      <Link to={'/'} className="nav-link">Home</Link>
                                  </li>
                                  
                                  <li className="nav-item">
                                      <Link to={'/events'} className="nav-link">Events</Link>
                                  </li>
                              </ul>
                          </div>
                      </nav> <br />
                      <Switch>
                          <Route exact path='/' component={Home} />
                          <Route path='/events' component={Events} />
                          <Route path='/events-add' component={EventsAdd} />
                          <Route path='/events-detail/:id' component={EventsDetails} />
                          <Route path='/events-edit/:id' component={EventsEdit} />
                      </Switch>
                  </div>
              </Router>
          </div>
      )
  }
}

 