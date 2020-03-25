import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const goals = ['Lose 0.5 lbs per week', 'Lose 1 lb per week', 'Lose 1.5 lbs per week', 'Lose 2 lbs per week', 'Maintain weight', 'Gain 0.5 lbs per week', 'Gain 1 lb per week'];
const levels = ['Not Very Active', 'Lightly Active', 'Active', 'Very Active'];

class EditGoals extends React.Component {
  constructor(props) {
    super(props);
    const { weight, goal_w, weekly_goal, activity_lvl } = props.profile;
    this.state = {
      weight: weight.split(' ')[0],
      goal_w: goal_w.split(' ')[0],
      weekly_goal,
      activity_lvl,
      dropdownOpen1: false,
      dropdownOpen2: false
    };
  }

  saveChanges = () => {
    const { weight, goal_w } = this.state;
    if (!Number(weight) || !Number(goal_w)) {
      return alert('please enter valid input');
    } else {
      let goals = this.state;
      goals.weight = `${this.state.weight} lbs`;
      goals.goal_w = `${this.state.goal_w} lbs`;
      const { weight, goal_w, weekly_goal, activity_lvl } = goals;
      const mutation = `
      mutation updateProfile {
        updateProfile(
          id:0,
          weight:"${weight}",
          goal_w:"${goal_w}",
          weekly_goal:"${weekly_goal}",
          activity_lvl:"${activity_lvl}"
          ) { id } 
        }`;
      axios
        .post('/ct/graphql', {query: mutation})
        .then(() => console.log('goals updated'))
        .catch(err => console.error(err));
      window.location.reload();
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggle1 = () => {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  }

  toggle2 = () => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  };

  clickDropdown = (e) => {
    let goal = {
      [e.target.name]: e.target.innerText
    };
    this.setState(goal)
  }

  render() {
    const { weight, goal_w, weekly_goal, activity_lvl, dropdownOpen1, dropdownOpen2 } = this.state;
    const { profile } = this.props;
    return (
      <div className="ct_edit_goals">
        <div className="ct_top">{profile.first_name}'s Profile</div>
        <div className="ct_title">Edit Goals</div>
        <table className="ct_table">
          <tbody>
            <tr>
              <td>Current Weight: </td>
              <td>
                <input className="ct_input" value={weight} name="weight" onChange={(e) => this.changeHandler(e)}></input>&nbsp;lbs
              </td>
            </tr>
            <tr>
              <td>Goal Weight: </td>
              <td>
                <input className="ct_input" value={goal_w} name="goal_w" onChange={(e) => this.changeHandler(e)}></input>&nbsp;lbs
              </td>
            </tr>
            <tr>
              <td>Weekly Goal: </td>
              <td>
                <Dropdown isOpen={dropdownOpen1} toggle={this.toggle1} size="sm" direction="right">
                  <DropdownToggle outline color="secondary" caret>
                    {weekly_goal}
                  </DropdownToggle>
                  <DropdownMenu className="ct_dropdown">
                    { goals.map((goal, index) => <DropdownItem name="weekly_goal" key={index} onClick={(e) => this.clickDropdown(e)}>{goal}</DropdownItem>) }
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>Activity Level: </td>
              <td>
                <Dropdown isOpen={dropdownOpen2} toggle={this.toggle2} size="sm" direction="right">
                  <DropdownToggle outline color="secondary" caret>
                    {activity_lvl}
                  </DropdownToggle>
                  <DropdownMenu className="ct_dropdown">
                    { levels.map((level, index) =>  <DropdownItem name="activity_lvl" key={index} onClick={(e) => this.clickDropdown(e)}>{level}</DropdownItem>) }
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="ct_save_btn" name="editGoals" onClick={(e) => this.saveChanges(e)}>Save</button>
      </div>
    );
  }
}

export default EditGoals;