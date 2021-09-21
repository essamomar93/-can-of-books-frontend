import React from 'react';
// import Header from './Header';
// import Footer from './Footer';
import BestBooks from'./components/BestBooks';
import axios from "axios";
import BookForm from './components/BookForm'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
            books: [],

      title:"",
      description:"",
      status:"",
      email:"",

    }
  }
  componentDidMount = () => {

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
    .then((res) => {
        this.setState({
         books: res.data
    

        });
        // console.log(res.data)

      })
      
    console.log(`${process.env.REACT_APP_BACKEND_URL}/books`)  
  }
  // -----------------------------------
  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }
  tiltleHandle=(e)=>{
    this.setState({
      title:e.target.value,
    })
  }
  descriptionHandle=(e)=>{
    this.setState({
      description:e.target.value,
    })
  }
  statusHandle=(e)=>{
    this.setState({
      status:e.target.value,
    })
  }
  emailHandle=(e)=>{
    this.setState({
      email:e.target.value,
    })
  }
  submitHandle=(e)=>{
    e.preventDefault();
    let config={
      method:"POST",
      baseURL:process.env.REACT_APP_BACKEND_URL,
      url:"/create-book",
      data:{
        title:this.state.title,
        description:this.state.description,
        status:this.state.status,
        email:this.state.email

      }
     
    };
    axios(config).then(res=>{
      console.log(res.data)
      this.setState({
        books:res.data
      })
    })
  }
  handleDelete=(id)=>{
    let ID = id;

    let config={
      method:"DELETE",
      baseURL:process.env.REACT_APP_BACKEND_URL,
      url:`/delet-book/${ID}`,
    }
    axios(config)
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
    }
  render() {
    return (
      <>
       
          <BookForm tiltleHandle={this.tiltleHandle}
          statusHandle={this.statusHandle}
          emailHandle={this.emailHandle}
          descriptionHandle={this.descriptionHandle} 
          submitHandle={this.submitHandle}
          handleDelete={this.handleDelete}/>


          <BestBooks books={this.state.books}  />
         
       
      </>
    )
  }
}

export default App;
