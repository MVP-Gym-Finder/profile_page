import React from 'react';
import axios from 'axios';

class EditGoals extends React.Component {
  constructor(props) {
    super(props);
    let { weight, goal_w, weekly_goal, activity_lvl } = props.profile;
    this.state = {
      weight: weight.split(' ')[0],
      goal_w: goal_w.split(' ')[0],
      weekly_goal,
      activity_lvl
    };
    this.saveChanges = this.saveChanges.bind(this);
  };

  saveChanges() {
    let { weight, goal_w } = this.state;
    if (!Number(weight) || !Number(goal_w)) {
      alert('please enter valid input');
    } else {
      window.location.reload();
      let goals = this.state;
      goals.weight = `${this.state.weight} lbs`;
      goals.goal_w = `${this.state.goal_w} lbs`;
      axios
        .put('/api', goals)
        .then(() => console.log('goals updated'))
        .catch(err => console.error(err));
    }
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  }

  render() {
    let { weight, goal_w, weekly_goal, activity_lvl } = this.state;
    let goals = ['Lose 0.5 lbs per week', 'Lose 1 lb per week', 'Lose 1.5 lbs per week', 'Lose 2 lbs per week', 'Maintain weight', 'Gain 0.5 lbs per week', 'Gain 1 lb per week'];
    let levels = ['Not Very Active', 'Lightly Active', 'Active', 'Very Active'];
    let { profile } = this.props;
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
                <select value={weekly_goal} name="weekly_goal" onChange={(e) => this.changeHandler(e)}>
                  { goals.map((goal, index) => 
                    <option value={goal} key={index}>{goal}</option>
                  ) }
                </select>
              </td>
            </tr>
            <tr>
              <td>Activity Level: </td>
              <td>
                <select value={activity_lvl} name="activity_lvl" onChange={(e) => this.changeHandler(e)}>
                  { levels.map((level, index) => 
                    <option value={level} key={index}>{level}</option>
                  ) }
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      <button className="ct_save_btn" name="editGoals" onClick={(e) => this.saveChanges(e)}>Save</button>
      </div>
    )
  };
};

export default EditGoals;