import React, { Component } from 'react';



class BookForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={this.props.submitHandle}>
                    <input type="text" placeholder="Enter the book title" onChange={this.props.tiltleHandle} />
                    <input type="text" placeholder="Description" onChange={this.props.descriptionHandle} />
                    <input type="text" placeholder="status" onChange={this.props.statusHandle} />
                    <input type="text" placeholder="Email" onChange={this.props.emailHandle} />

                    <input type="submit" value="add a new BOOK " />

                </form>
            </>
        )
    }
}

export default BookForm