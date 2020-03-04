import React from 'react';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };
  render() {
    let { profile } = this.props;
    let title = ['Current Weight', 'Goal Weight', 'Weekly Goal', 'Activity Level'];
    let dbTitle = ['weight', 'goal_w', 'weekly_goal', 'activity_lvl'];
    return (
      <table>
        <tbody>
          { title.map((title, index) => {
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{profile[dbTitle[index]]}</td>
                </tr>
              )
          })}
        </tbody>
      </table>
    )
  };
};

export default Goals;