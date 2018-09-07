import React, { Component } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';

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

class TripModal extends Component {

  state = {
    modalIsOpen: false,
    startDate: new Date(),
    endDate: new Date()
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

  startDate = (startDate) => {
    this.setState({ startDate })
  }

  endDate = (endDate) => {
    this.setState({ endDate })
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.openModal}>Select Trip Dates</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >

          <h2 className="modalTripHeader">Select Your Trip Dates: </h2>
          <button onClick={this.closeModal} className="modalCloseBtn btn btn-danger">X</button>
          <div className="modalCalendar">
            <div className="modalCalendarDivs">
              <h2>Start Date</h2>
              <Calendar
                onChange={this.startDate}
                value={this.state.startDate}
                />
            </div>
            <div className="modalCalendarDivs">
              <h2>End Date</h2>
              <Calendar
                onChange={this.endDate}
                value={this.state.endDate}
                />
            </div>
          </div>
          <button className="modalSubmitBtn btn btn-success">Submit</button>
        </Modal>
      </div>
    )
  }
}

export default TripModal;
