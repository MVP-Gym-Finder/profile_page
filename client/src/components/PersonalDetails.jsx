import React from 'react';

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };
  render() {
    let { profile } = this.props;
    let title = ['Height', 'Weight', 'Age', 'Gender','DOB', 'Zip Code'];
    let dbTitle = ['height', 'weight', 'age', 'gender','dob', 'zip'];
    return (
      <table>
        <tbody>
          { title.map((title, index) => {
            if (dbTitle[index] === 'height') {
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{profile[dbTitle[index]].split('/')[0]}ft {profile[dbTitle[index]].split('/')[1]}in</td>
                </tr>
              )
            } else {
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{profile[dbTitle[index]]}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    )
  }
}

export default PersonalDetails;