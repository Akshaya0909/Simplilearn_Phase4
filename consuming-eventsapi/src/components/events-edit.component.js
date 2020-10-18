import React,{Component} from "react";
import Axios from "axios";
const validateForm = (formErrors) => {
    let valid = true;
    Object.values(formErrors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
export default class EventsEdit extends Component{

    constructor(props){
        super(props);
        this.state = {
            title:null,
            description:null,
            date:null,
            formErrors: 
            {
                title:"",
                description:"",
                date:""
            }
        } 
    }

    
    componentDidMount()
    {
        
        Axios.get('http://localhost:3001/events/'+this.props.match.params.id)
        .then(result=>{
            this.setState({
                eve: result.data,
                title: result.data.title,
                description: result.data.description,
                location: result.data.location,
                date:result.data.date
            });
            console.log(this.state.log);
        })
        .catch(error=>console.log('There is some error : ',error));
    }

    

   
    handleChange = (event) => {
        event.preventDefault();
        const{name,value}=event.target;
        this.setState({
            [name]:value
        });
        console.log(this.state);
        let formErrors = this.state.formErrors;
        switch(name)
        {
            case "title":
              formErrors.title = value.length < 2 && value.length >0 ?"Title of the event cannot be empty":"";
              console.log('title edited...')
            break;
            case "description":
               formErrors.description = value.length < 6 && value.length >0 ?"Minimum 5 characters are required":"";
              console.log('description edited...')
            break;
            case "location":
               formErrors.location = value.length < 2 && value.length >0 ?"Location cannot be empty":"";
              console.log('description edited...')
            break;
            case "date":
                formErrors.date = value.length < 11 && value.length >0 ?"Minimum 10 characters are required for date":"";
               console.log('date  changed...')
            break;
            default:
           break;
        }
     this.setState({formErrors, [name]:value},()=>{console.log(formErrors)});
    }


       

    handleSubmit = (event)=>
    {
            event.preventDefault();
            const eve = {
                id: this.props.match.params.id,
                title : this.state.title,
                description : this.state.description,
                date:this.state.date
            };
            
            Axios.put('http://localhost:3001/events/'+ eve.id,eve)
            .then(result => {
                console.log('Successfully edited...')
                this.props.history.push('/events');
            })
            .catch(error => console.log('There is some error :', error));

            if(validateForm(this.state.formErrors)) {
                console.info('Valid Form')
              }else{
                console.error('Invalid Form')
              }
           
    }
       
   
    render()
    {
        const {formErrors}=this.state;
        return(
        <div>
            <h2>Edit Your Events Here</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input type="text" name="title" value={this.state.title} className={`form-control ${formErrors.title.length > 0 ? 'is-invalid' : null}`} onChange={this.handleChange}/>
                {formErrors.title.length>0 && <span>{formErrors.title}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={this.state.description} className={`form-control ${formErrors.description.length > 0 ? 'is-invalid' : null}`} onChange={this.handleChange}/>
                {formErrors.description.length>0 && <span>{formErrors.description}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="text" name="date" value={this.state.date} className={`form-control ${formErrors.date.length > 0 ? 'is-invalid' : null}`} onChange={this.handleChange}/>
                {formErrors.date.length>0 && <span>{formErrors.date}</span>}
                </div>
                <button className="btn btn-secondary">Submit</button>
            </form>
            </div>
        
        );
    }
}
