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
            <input type="text" placeholder={"Please Enter Location Name"} name="tripName" value={'France'} onChange={this.props.onAddTrip}/>
            <input type="text" placeholder={"Please Enter Location City"} name="tripCity" value={'France'}
              onChange={this.props.onAddTrip}/>
            <input type="text" placeholder={"Please Enter Location State"} name="tripState" value={'France'} onChange={this.props.onAddTrip}/>
            <input type="text" placeholder={"Please Enter Location Country"} name="tripCountry" value={'France'} onChange={this.props.onAddTrip}/>
          </div>
          <div className="addTripModalActionButtons">
            <button className="btn btn-success">Add</button>
            <button onClick={this.closeModal} className="modalCloseBtn btn btn-success">Done</button>
          </div>
          </form>
        </Modal>

      </div>
    )
  }
}

export default AddTripModal;
