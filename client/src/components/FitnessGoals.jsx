import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class FitnessGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts_per_wk: props.profile.workouts_per_wk,
      min_per_workout: props.profile.min_per_workout,
      dropdownOpen1: false,
      dropdownOpen2: false
    };
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.clickDropdown = this.clickDropdown.bind(this);
    this.updateData = this.updateData.bind(this);
  };

  toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  };

  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  };

  clickDropdown(e) {
    let workout = {
      [e.target.name]: e.target.innerText
    };
    this.setState(workout, () => this.updateData());
  };

  updateData() {
    const { workouts_per_wk, min_per_workout } = this.state;
    console.log('state:', this.state)
    const mutation = `
        mutation updateProfile {
          updateProfile(
            id:0,
            workouts_per_wk:${workouts_per_wk},
            min_per_workout:${min_per_workout}
          ) { id } 
        }`;
    axios
      .post('/graphql', {query: mutation})
      .then(() => console.log('workout changed'))
      .catch(err => console.error(err));
  };

  render() {
    let weekly_workouts = [...Array(29).keys()];
    let workout_min = [...Array(361).keys()];
    let { min_per_workout,  workouts_per_wk, dropdownOpen1, dropdownOpen2 } = this.state;

    return (
      <table className="ct_table" id="ct_table_fitness_goals">
        <tbody>
          <tr>
            <td>Workouts/Week</td>
            <td>
              <Dropdown isOpen={dropdownOpen1} toggle={this.toggle1} size="sm" direction="right">
                <DropdownToggle outline color="secondary" caret>
                  {workouts_per_wk}
                </DropdownToggle>
                <DropdownMenu className="ct_dropdown">
                  { weekly_workouts.map((qty, index) =>  <DropdownItem name="workouts_per_wk" key={index} onClick={(e) => this.clickDropdown(e)}>{qty}</DropdownItem>) }
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
          <tr>
            <td>Minutes/Workout</td>
            <td>
              <Dropdown isOpen={dropdownOpen2} toggle={this.toggle2} size="sm" direction="right">
                <DropdownToggle outline color="secondary" caret>
                  {min_per_workout}
                </DropdownToggle>
                <DropdownMenu className="ct_dropdown">
                  { workout_min.map((min, index) =>  <DropdownItem name="min_per_workout" key={index} onClick={(e) => this.clickDropdown(e)}>{min}</DropdownItem>) }
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    )
  };
};

export default FitnessGoals;