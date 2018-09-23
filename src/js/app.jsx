import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import _ from 'lodash';
import Header from './components/Header';
import Table from './components/Table';

import '../scss/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Members: []
    };
    this.getBackendData = this.getBackendData.bind(this);
    this.sendBackendData = this.sendBackendData.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.kickMember = this.kickMember.bind(this);
  }

  getBackendData() {
    fetch('/api/members')
      .then(response => response.json())
      .then(response => {
        this.setState({
          Members: response
        });
      })
      .catch(error => {
        alert('There is something wront with the connection to the backend!');
      });
  }

  sendBackendData(formdata) {
    var request = new Request('/api/members', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    });
    fetch(request)
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        this.setState({
          Members: [...this.state.Members, response]
        });
      })
      .catch(error => {
        //handle error
      });
  }

  updateMember(id, formdata) {
    console.log(id + ' ' + formdata);
    var request = new Request('/api/members/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    });
    fetch(request)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.getBackendData();
        // this.setState({
        //   Members: [...this.state.Members, response]
        // });
      })
      .catch(error => {
        //handle error
      });
  }

  kickMember(id) {
    var request = new Request('/api/members/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: ''
    });
    fetch(request)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.getBackendData();
      })
      .catch(error => {
        alert('whoops');
      });

    console.log(id);
  }

  componentDidMount() {
    this.getBackendData();
  }

  render() {
    return (
      <div>
        <Header />
        <Table
          Members={this.state.Members}
          sendBackendData={this.sendBackendData}
          updateMember={this.updateMember}
          kickMember={this.kickMember}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
