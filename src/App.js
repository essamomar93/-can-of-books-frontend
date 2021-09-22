import React from 'react';
import Header from './components/Header';
// import Footer from './Footer';
import BestBooks from './components/BestBooks';
import axios from "axios";
import BookForm from './components/BookForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';
// ===============================
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Button from './components/Button';
import { withAuth0 } from '@auth0/auth0-react';


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
      showUpdate: false
    }
  }
  callApi = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(res => {
          const jwt = res.__raw;
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/auth'
          }
          axios(config)
            .then(result => console.log(result.data))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    } else {
      console.log("user is not authenticated")
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
      // this.setState({
      //   books: res.data
      // })
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
        .then((res) => {
          this.setState({
            books: res.data
          });
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

  // ------------------
  handleUpdate = (title, email, status, description, id) => {
    this.setState({
      showUpdate: true,
      title: title,
      status: status,
      description: description,
      email: email,
      id: id,
    });
  };


  handleUpdateForm = (e) => {
    e.preventDefault();
    let config = {
      method: "PUT",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/update-book/${this.state.id}`,
      data: {
        title: this.state.title,
        status: this.state.status,

        description: this.state.description,
        email: this.state.email,
      },
    };

    axios(config).then((res) => {
      this.setState({
        books: res.data,

      });
      console.log(res.data)
    })

  };
  render() {
    return (
      <>
        <Header />
        <br />
        <br />
        {
          this.props.auth0.isAuthenticated ?
            <>
              <LogoutButton />
              <h1>{this.props.auth0.user.name}</h1>
              <img src={this.props.auth0.user.picture} alt="" />\
              <BestBooks
                books={this.state.books}
                id={this.id}
                handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
              />
              <BookForm
                tiltleHandle={this.tiltleHandle}
                statusHandle={this.statusHandle}
                emailHandle={this.emailHandle}
                descriptionHandle={this.descriptionHandle}
                submitHandle={this.submitHandle}
                // ---------update
                showUpdate={this.state.showUpdate}
                id={this.state.id}
                title={this.state.title}
                status={this.state.status}
                description={this.state.description}
                email={this.state.email}
                handleUpdateForm={this.handleUpdateForm}

              />
              <Button callApi={this.callApi} />
            </> :
            <LoginButton />
        }
        <br />
        <br />
        <Footer />
      </>
    )
  }
}
export default withAuth0(App);