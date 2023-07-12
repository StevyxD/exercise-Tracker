import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";

export default class EditExercises extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }
  // this.props.match.params.id--> Getting id directly from url
  componentDidMount() {
    const { id } = useParams();
    axios.get("http://localhost:5000/exercises/" + id).then((res) => {
      this.setState({
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date),
      }).catch((err) => console.log(err));
    });

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="username">Username</label>
              <select
                ref="userInput"
                required
                class="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                placeholder="username"
              >
                {this.state.users.map(function (user) {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text"
              class="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              placeholder="description"
            />
          </div>
          <div class="form-group">
            <label for="description">Duration</label>
            <input
              type="number"
              class="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              placeholder="Duration"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Date</label>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </form>
      </>
    );
  }
}
