import React from "react";
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class BestBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // books: []
  //     // showData:false
  //   }
  // }

  render() {
    // console.log(this.state.books);

    console.log(this.props.books);

    return (
      <>
      {/* ----------------*/}
      <button onClick={this.props.callApi}>
                call AUTH api               
            </button>
            {/* ------------------------- */}
        {this.props.books.length > 0 && (
          <Container>
            <Row>
              <Col>
                <Carousel>
                  {this.props.books.map((i) => {
                    return (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_813319932_383768.jpg"
                          alt="First slide"
                          variant="top"
                          width="90"
                          height="400"
                        />
                        <Carousel.Caption>
                          <h1>{i.title}</h1>
                          <h3>{i.description}</h3>
                          <h3>{i.status}</h3>
                          <h3>{i.email}</h3>
                          <br />
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              // e.preventDefault();
                              this.props.handleDelete(i._id);
                            }} >
                            Delete
                          </Button>
                      

                          <Button
                            variant="outline-info"
                            onClick={() => {
                              this.props.handleUpdate(
                                i.title,
                                i.email,
                                i.status,
                                i.description,
                                i._id
                              );
                            }}
                          >
                            Update
                          </Button>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Col>
            </Row>
          </Container>
        )}

        {this.props.books.length === 0 && <h1>NO BOOKS FOUND</h1>}
      </>
    );
  }
}

export default withAuth0(BestBooks);
