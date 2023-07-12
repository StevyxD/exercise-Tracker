import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {
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

  componentDidMount() {
    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
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
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
    this.setState({
      username: "",
    });
    console.log(exercise);
    window.location = "/";
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
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </>
    );
  }
}

// const CreateExercise = () => {
//   const [exercise, setExercise] = useState({
//     username: "",
//     description: "",
//     duration: 0,
//     date: new Date(),
//   });
//   let name, value;

//   const handleInputs = (e) => {
//     console.log(e);
//     name = e.target.name;
//     value = e.target.value;
//     setExercise({ ...exercise, [name]: value });
//   };

//   const PostData = async (e) => {
//     e.preventDefault();

//     const { username, description, duration, date } = exercise;

//     const res = await fetch("/createexercise", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         description,
//         duration,
//         date,
//       }),
//     });

//     const data = await res.json();
//     if (data.status === 422 || !data) {
//       window.alert("Invalid Registration");
//       console.log("Invalid Registration");
//     } else {
//       window.alert("Registration Successfull");
//       console.log("Registration Successfull");
//       window.location = "/";
//     }
//   };
// };

// return (
//   <>
//     <form onSubmit={this.onSubmit}>
//       <div class="form-row">
//         <div class="form-group col-md-6">
//           <label for="username">Username</label>
//           <select
//             ref="userInput"
//             required
//             class="form-control"
//             value={exercise.username}
//             onChange={handleInputs}
//             placeholder="username"
//           >
//             {this.state.users.map(function (user) {
//               return (
//                 <option key={user} value={user}>
//                   {user}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//       </div>
//       <div class="form-group">
//         <label for="description">Description</label>
//         <input
//           type="text"
//           class="form-control"
//           value={exercise.description}
//           onChange={handleInputs}
//           placeholder="description"
//         />
//       </div>
//       <div class="form-group">
//         <label for="description">Duration</label>
//         <input
//           type="number"
//           class="form-control"
//           value={exercise.duration}
//           onChange={handleInputs}
//           placeholder="Duration"
//         />
//       </div>
//       {/* <div class="form-row">
//             <div class="form-group col-md-6">
//               <label for="inputCity">Date</label>
//               <DatePicker
//                 selected={exercise.date}
//                 onChange={this.onChangeDate}
//               />
//             </div>
//           </div> */}
//       <input
//         type="submit"
//         value="Create Exercise Log"
//         className="btn btn-primary"
//       />
//     </form>
//   </>
// );

/*
  class bassed component
  constructor is used to initialize the state
  onChangeUsername is used to change the state of username 
  onChangeDescription is used to change the state of description
  onChangeDate is used to change the state of date
  onSubmit is used to submit the form
*/
