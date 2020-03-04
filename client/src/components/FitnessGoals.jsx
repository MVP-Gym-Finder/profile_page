import React from 'react';
import axios from 'axios';
import Select from 'react-select';

class FitnessGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts_per_wk: props.profile.workouts_per_wk,
      min_per_workout: props.profile.min_per_workout
    };
    this.changeHandler = this.changeHandler.bind(this);
  };

  changeHandler(e) {
    let workout = {
      [e.target.name]: e.target.value
    };
    this.setState(workout)
    axios
      .put('/api', workout)
      .then(() => console.log('workout changed'))
      .catch(err => console.error(err));
  };

  render() {
    let weekly_workouts = [...Array(29).keys()];
    let workout_min = [...Array(361).keys()];
    // const options1 = weekly_workouts.map((qty) => ({ value: qty, label: qty }));
    // console.log(options1)
    return (
      <table className="ct_table">
        <tbody>
          <tr>
            <td>Workouts/Week</td>
            <td>
              <select onChange={(e) => this.changeHandler(e)} value={this.state.workouts_per_wk} name="workouts_per_wk">
                { weekly_workouts.map((freq, index) => 
                <option value={freq} key={index}>{freq}</option>
                ) }
              </select>
            </td>
          </tr>
          <tr>
            <td>Minutes/Workout</td>
            <td>
              <select onChange={(e) => this.changeHandler(e)} value={this.state.min_per_workout} name="min_per_workout">
                { workout_min.map((min, index) => 
                <option value={min} key={index}>{min}</option>
                ) }
              </select>
            </td>
          </tr>

        </tbody>
      </table>
    )
  };
};

export default FitnessGoals;