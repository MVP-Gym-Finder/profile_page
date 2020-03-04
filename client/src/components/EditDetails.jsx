import React from 'react';
import axios from 'axios';

class EditDetails extends React.Component {
  constructor(props) {
    super(props);
    let { height, weight, age, gender, dob, zip } = props.profile;
    this.state = {
      heightFt: height.split('/')[0],
      heightIn: height.split('/')[1],
      weight: weight.split(' ')[0],
      age,
      gender,
      dob,
      zip
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  };

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  };

  saveChanges(e) {
    window.location.reload();
    let details = this.state;
    details.height = `${this.state.heightFt}/${this.state.heightIn}`;
    delete details.heightFt;
    delete details.heightIn;
    details.weight = `${this.state.weight} lbs`;
    axios
      .put('/api', details)
      .then(() => console.log('details editted'))
      .catch(err => console.error(err));
  }

  render() {
    let { heightFt, heightIn, weight, age, gender, dob, zip } = this.state;
    return (
      <div>
        <h2>Edit Personal Details</h2>
        <table>
          <tbody>
            <tr>
              <td>Height:</td>
              <td>
                <input value={heightFt} name="heightFt" onChange={(e) => this.changeHandler(e)}></input>ft
                <input value={heightIn} name="heightIn" onChange={(e) => this.changeHandler(e)}></input>in
              </td>
            </tr>
            <tr>
              <td>Weight:</td>
                <td>
                  <input value={weight} name="weight" onChange={(e) => this.changeHandler(e)}></input>lbs
                </td>
            </tr>
            <tr>
              <td>Age:</td>
                <td>
                  <input value={age} name="age" onChange={(e) => this.changeHandler(e)}></input>
                </td>
            </tr>
            <tr>
              <td>Gender:</td>
                <td>
                  <select value={gender} name="gender" onChange={(e) => this.changeHandler(e)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </td>
            </tr>
            <tr>
              <td>Date of Birth:</td>
                <td>
                  <input value={dob} placeholder="MM/DD/YYYY" name="dob" onChange={(e) => this.changeHandler(e)}></input>
                </td>
            </tr>
            <tr>
              <td>Zip Code:</td>
                <td>
                  <input value={zip} name="zip" onChange={(e) => this.changeHandler(e)}></input>
                </td>
            </tr>
          </tbody>
        </table>
      <button name="editDetails" onClick={(e) => this.saveChanges(e)}>Save Changes</button>
      </div>
    )
  };
};

export default EditDetails;