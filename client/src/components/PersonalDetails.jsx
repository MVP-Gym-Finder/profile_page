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
    return (
      <table>
        <tbody>
          { Object.entries(profile).slice(3,9).map((info, index) => {
            if (info[0] === 'height') {
              return (
              <tr key={index}>
                <td>{title[index]}</td>
                <td>{info[1].split('/')[0]}ft {info[1].split('/')[1]}in</td>
              </tr>
              )
            } else {
              return (
                <tr key={index}>
                  <td>{title[index]}</td>
                  <td>{info[1]}</td>
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