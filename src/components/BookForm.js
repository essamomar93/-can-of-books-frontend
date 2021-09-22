import React, { Component } from "react";

import Accordion from "react-bootstrap/Accordion";

class BookForm extends Component {
  render() {
    return (
      <div>
        {!this.props.showUpdate ? (
          <>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add a new BOOK </Accordion.Header>
                <Accordion.Body>
                  <form onSubmit={this.props.submitHandle}>
                    <input
                      type="text"
                      variant="success"
                      placeholder="Enter the book title"
                      onChange={this.props.tiltleHandle}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      onChange={this.props.descriptionHandle}
                    />
                    <input
                      type="text"
                      placeholder="status"
                      onChange={this.props.statusHandle}
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={this.props.emailHandle}
                    />
                    <input type="submit" value="Add a new BOOK " />
                  </form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* -----------------update */}
          </>
        ) : (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Update BOOK </Accordion.Header>
              <Accordion.Body>
                <form
                  onSubmit={(e) => {
                    this.props.handleUpdateForm(e);
                  }}
                >
                  <input
                    type="text"
                    value={this.props.title}
                    onChange={this.props.tiltleHandle}
                  />
                  <input
                    type="text"
                    value={this.props.description}
                    onChange={this.props.descriptionHandle}
                  />
                  <input
                    type="text"
                    value={this.props.status}
                    onChange={this.props.statusHandle}
                  />
                  <input
                    type="text"
                    value={this.props.email}
                    onChange={this.props.emailHandle}
                  />

                  <input type="submit" value="update" />
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    );
  }
}
export default BookForm;
