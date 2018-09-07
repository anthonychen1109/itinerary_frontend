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
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
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
    console.log(this.state.modalIsOpen);
    return (
      <div>
        <button className="btn btn-primary" onClick={this.openModal}>Select Dates</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Select your trip dates: </h2>
          <button onClick={this.closeModal} className="btn btn-danger">close</button>
          <div className="modalCalendar">
            <div>
              <Calendar />
            </div>
            <div>
              <Calendar />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default TripModal;
