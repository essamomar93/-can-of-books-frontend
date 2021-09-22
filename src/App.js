import React from 'react';
import BestBooks from './components/BestBooks';
import axios from "axios";
import BookForm from './components/BookForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      title: "",
      description: "",
      status: "",
      email: "",
      id: "",
      showUpdate:false,
    }
  }
  componentDidMount = () => {

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
      .then((res) => {
        this.setState({
          books: res.data
        });
      })
  }
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
  tiltleHandle = (e) => {
    this.setState({
      title: e.target.value,
    })
  }
  descriptionHandle = (e) => {
    this.setState({
      description: e.target.value,
    })
  }
  statusHandle = (e) => {
    this.setState({
      status: e.target.value,
    })
  }
  emailHandle = (e) => {
    this.setState({
      email: e.target.value,
    })
  }
  submitHandle = (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: "/create-book",
      data: {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        email: this.state.email
      }
    };
    axios(config).then(res => {
      console.log(res.data)
      this.setState({
        books: res.data
      })
    })
  }
  handleDelete = (id) => {
    let config = {
      method: "DELETE",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/delet-book/${id}`,
    }
    axios(config)
      .then((res) => {
        this.setState({
          books: res.data,
        });
        console.log(res.data);
      })
  }
  handleUpdate = (id, username, email) => {
    this.setState({
      username: username,
      email: email,
      id: id,
      showUpdate: true
    })
  }
  handleUpdateForm = () => {
    let config = {
      method: "PUT",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/update-student/${this.state.id}`,
      data: {
        username: this.state.username,
        email: this.state.email
      }
    }
    axios(config).then(res => {
      this.setState({
        studentsList: res.data
      })
    });
  }
  render() {
    return (
      {
        !this.state.showUpdate ? <>
      <form onSubmit={this.handleSubmit}>
        <input type="texts" placeholder="username" onChange={this.handleUsername} />
        <input type="texts" placeholder="email" onChange={this.handleEmail} />
        <input type="submit" value="create" />
      </form>
    </> :
      // Update form
      <form onSubmit={this.handleUpdateForm}>
        <input
          type="texts"
          onChange={this.handleUsername}
          value={this.state.username}
        />
        <input
          type="texts"
          value={this.state.email}
          onChange={this.handleEmail} />
        <input type="submit" value="update" />
      </form>
  }
      <>
  <BookForm
    tiltleHandle={this.tiltleHandle}
    statusHandle={this.statusHandle}
    emailHandle={this.emailHandle}
    descriptionHandle={this.descriptionHandle}
    submitHandle={this.submitHandle}
  />
  <BestBooks
    books={this.state.books}
    id={this.id}
    handleDelete={this.handleDelete}
  />

</>
    )
  }
}
export default App;
