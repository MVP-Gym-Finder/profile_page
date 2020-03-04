import React from 'react';
import App from './App.jsx';

class EditGoals extends React.Component {
  constructor(props) {
    super(props);
    let { weight, goal_w, weekly_goal } = props.profile;
    this.state = {
      weight: weight.split(' ')[0],
      goal_w: goal_w.split(' ')[0],
      weekly_goal
    };
    this.saveChanges = this.saveChanges.bind(this);
  };

  saveChanges() {
    window.location.reload();
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  }

  render() {
    let { weight, goal_w, weekly_goal } = this.state;
    console.log(weekly_goal)
    return (
      <div>
        <h2>Edit Goals</h2>
        <table>
          <tbody>
            <tr>
              <td>Current Weight: </td>
              <td>
                <input value={weight} name="weight" onChange={(e) => this.changeHandler(e)}></input>lbs
              </td>
            </tr>
            <tr>
              <td>Goal Weight: </td>
              <td>
                <input value={goal_w} name="goal_w" onChange={(e) => this.changeHandler(e)}></input>lbs
              </td>
            </tr>
            <tr>
              <td>Weekly Goal: </td>
              <td>
                <select value={weekly_goal} name="weekly_goal" onChange={(e) => this.changeHandler(e)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      <button name="editGoals" onClick={(e) => this.props.saveChanges(e)}>Save Changes</button>
      </div>
    )
  };
};

export default EditGoals;