import React from 'react';

class FitnessGoals extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  };
  render() {
    let { profile } = this.props;
    let title = ['Workouts/Week', 'Minutes/Workout'];
    let workouts = [...Array(29).keys()];
    console.log(workouts)
    return (
      <table>
        <tbody>
          { Object.entries(profile).slice(13,15).map((info, index) => 
            <tr key={index}>
              <td>{title[index]}</td>
              <td>{info[1]}</td>
              <td>
                <select>
                { workouts.map((freq) => 
                    <option value={freq}>{freq}</option>
                ) }
                </select>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  };
};

export default FitnessGoals;