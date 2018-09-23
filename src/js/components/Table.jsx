import React from 'react';
//import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSurprise } from '@fortawesome/free-solid-svg-icons';

const TableHead = () => (
  <div className="thead">
    <div className="tr">
      <span className="th name">Name</span>
      <span className="th id">ID</span>
      <span className="th date">Date</span>
      <span className="th age">Age</span>
      <span className="th gender">Gender</span>
      <span className="th edit" />
    </div>
  </div>
);

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showUpdate: false
    };
  }
  render() {
    return (
      <div>
        <div className="tr">
          <span className="td name">{this.props.member.name}</span>
          <span className="td id">{this.props.member.id}</span>
          <span className="td date">{this.props.member.date}</span>
          <span className="td age">{this.props.member.age}</span>
          <span className="td gender">{this.props.member.gender}</span>
          <span className="td edit">
            <FontAwesomeIcon
              onClick={() =>
                this.setState(prevState => ({
                  showUpdate: !prevState.showUpdate
                }))
              }
              icon={faEdit}
            />
            <FontAwesomeIcon
              onClick={() =>
                this.setState(prevState => ({
                  showDelete: !prevState.showDelete
                }))
              }
              icon={faTrash}
            />
          </span>
        </div>
        {this.state.showDelete && (
          <div className="tr_delete">
            <button onClick={() => this.props.kickMember(this.props.member.id)}>
              ya, kill em!
            </button>
            <span>sure u wanna delete?</span>
            <div className="clear" />
          </div>
        )}
        {this.state.showUpdate && (
          <TableRowEdit
            id={this.props.id}
            updateMember={this.props.updateMember}
          />
        )}
      </div>
    );
  }
}

class TableRowAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      gender: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const newMember = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender
    };
    this.props.sendBackendData(newMember);
    this.setState({
      name: '',
      age: '',
      gender: ''
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="tr_add">
          <span className="td name">
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </span>
          <span className="td id" />
          <span className="td date" />
          <span className="td age">
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </span>
          <span className="td gender">
            <input
              type="text"
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            />
          </span>
        </div>
        <button type="submit">submit</button>
      </form>
    );
  }
}

class TableRowEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      gender: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const updatedMember = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender
    };
    this.props.updateMember(this.props.id, updatedMember);
    this.setState({
      name: '',
      age: '',
      gender: ''
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="tr_edit">
          <span className="td name">
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </span>
          <span className="td id" />
          <span className="td date" />
          <span className="td age">
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </span>
          <span className="td gender">
            <input
              type="text"
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            />
          </span>
        </div>
        <button type="submit">submit</button>
      </form>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="table">
        <TableHead />
        <div className="tbody">
          {this.props.Members.map(member => (
            <TableRow
              key={member.id}
              id={member.id}
              member={member}
              updateMember={this.props.updateMember}
              kickMember={this.props.kickMember}
            />
          ))}
          <TableRowAdd sendBackendData={this.props.sendBackendData} />
        </div>
      </div>
    );
  }
}

export default Table;
