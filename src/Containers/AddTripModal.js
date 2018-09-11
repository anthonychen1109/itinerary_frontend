import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AddTripModal extends Component {

  state = {
    modalIsOpen: false
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  openModal = (e) => {
    e.preventDefault()
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.openModal}>+</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >

        <button onClick={this.closeModal} className="modalCloseBtn btn btn-danger">X</button>
          <h2 className="modalTripHeader">Add Another Destination: </h2>
            <form onSubmit={this.props.findTrip}>
          <div>
            <input type="text" placeholder={"Please Enter Location Name"} name="tripName" value={this.props.tripName} onChange={this.props.onAddTrip}/>
          </div>
          <div className="addTripModalActionButtons">
            <input type="submit" className="addTripModalButton btn btn-success" />
            <input type="submit" onClick={this.closeModal} className="addTripModalButton modalCloseBtn btn btn-success" value="Done" />
          </div>
          </form>
        </Modal>

      </div>
    )
  }
}

export default AddTripModal;
