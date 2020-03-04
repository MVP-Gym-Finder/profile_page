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
    return (
      <table>
        <tbody>
          { Object.entries(profile).slice(9,13).map((info, index) => 
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

export default Goals;