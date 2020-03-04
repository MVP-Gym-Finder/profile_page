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
    return (
      <table>
        <tbody>
          { Object.entries(profile).slice(13,15).map((info, index) => 
            <tr key={index}>
              <td>{title[index]}</td>
              <td>{info[1]}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  };
};

export default FitnessGoals;