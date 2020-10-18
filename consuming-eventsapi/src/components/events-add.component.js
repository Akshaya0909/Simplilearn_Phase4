
import Axios from "axios";
import React,{Component} from "react";
const validateForm = (formErrors) => {
    let valid = true;
    Object.values(formErrors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export default class EventsAdd extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            title:null,
            description:null,
            date:null,
            formErrors: {
                title:"",
                description:"",
                date:""
               }
          
        }

    }

    
      
    handleSubmit = (event)=>{
        event.preventDefault();
        const eve = {
            title : this.state.title,
            description : this.state.description,
            date : this.state.date
        };
    
        Axios.post('http://localhost:3001/events/',eve)
        .then(result => {
            console.log('Successfully added...')
            this.props.history.push('/events');
        })
        .catch(error => console.log('There is some error :', error));
        
        if(validateForm(this.state.formErrors)) {
            console.info('Valid Form')
          }else{
            console.error('Invalid Form')
          }
       
    
    }

    submitForm(event){
        alert('You have entered credentials...')

   
        event.preventDefault();
      }
     

    handleChange = (event)=>{
        event.preventDefault();
        const{name,value}=event.target;
        this.setState({
            [name]:value
        });
        console.log(this.state);

        let formErrors = this.state.formErrors;
   
        switch(name){
          case "title":
            formErrors.title = value.length < 2 && value.length >0 ?"Title of the event cannot be empty":"";
            console.log('title changed...')
            break;
            case "description":
             formErrors.description = value.length < 6 && value.length >0 ?"Minimum 5 characters are required":"";
            console.log('description  changed...')
            break;
           
            case "date":
             formErrors.date = value.length < 11 && value.length >0 ?"Minimum 10 characters are required for date":"";
            console.log('date  changed...')
            break;
            default:
            break;
   }
   this.setState({formErrors, [name]:value},()=>{console.log(this.state)});
         
    }
    render(){
        const {formErrors}=this.state;
        return(
        <div>
            <h2>Add Events Component</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input type="text" name="title" className={`form-control ${formErrors.title.length > 0 ? 'is-invalid' : null}`} placeholder="Enter title"onChange={this.handleChange} noValidate/>
        {formErrors.title.length>0 && <span>{formErrors.title}</span>}
   
              {/*  <input type="text" className="form-control"name="title" onChange={this.handleChange}/>*/}
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" name="description" className={`form-control ${formErrors.description.length > 0 ? 'is-invalid' : null}`} placeholder="Enter description"onChange={this.handleChange} noValidate/>
        {formErrors.description.length>0 && <span>{formErrors.description}</span>}
                 {/*  <input type="text" className="form-control"name="title" onChange={this.handleChange}/>*/}
                 </div>
                <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="text" name="date" className={`form-control ${formErrors.date.length > 0 ? 'is-invalid' : null}`} placeholder="Enter date"onChange={this.handleChange} noValidate/>
        {formErrors.date.length>0 && <span>{formErrors.date}</span>}
   
                {/*<input type="text" className="form-control"name="content"onChange={this.handleChange}/>*/}
                </div>
                <button className="btn btn-secondary">Submit</button>
            </form>
            </div>
        
        );
    }
}
