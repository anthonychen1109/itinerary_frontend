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
          <div>
            <input type="text" placeholder={"Please Enter Location Name"} name="tripName" value={this.props.tripName} onChange={this.props.onAddTrip}/>
            <input type="text" placeholder={"Please Enter Location City"} name="tripCity" value={this.props.tripCity}
              onChange={this.props.onAddTrip}/>
            <input type="text" placeholder={"Please Enter Location State"} name="tripState" value={this.props.tripState} onChange={this.props.onAddTrip}/>
            <input type="text" placeholder={"Please Enter Location Country"} name="tripCountry" value={this.props.tripCountry} onChange={this.props.onAddTrip}/>
          </div>
          <button className="modalSubmitBtn btn btn-success" onClick={this.props.handleAddTrip}>Submit</button>
        </Modal>
      </div>
    )
  }
}

export default AddTripModal;
