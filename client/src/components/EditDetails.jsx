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
    console.log(this.state)
  };

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  };

  saveChanges(e) {
    let { heightFt, heightIn, weight, age, dob, zip } = this.state;
    let monthArr = [ ...Array(12).keys() ].map( i => i+1);
    let dayArr = [ ...Array(31).keys() ].map( i => i+1);
    if (!Number(heightFt) || !Number(heightIn) || !Number(weight) || typeof age !== 'number' || typeof zip !== 'number'
    || !monthArr.includes(Number(dob.split('/')[0])) || !dayArr.includes(Number(dob.split('/')[1])) || dob.split('/')[2].length !== 4 
    || !Number(dob.split('/')[2])) {
      alert('please enter valid input');
    } else {
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
  }

  render() {
    let { heightFt, heightIn, weight, age, gender, dob, zip } = this.state;
    let { profile } = this.props;
    return (
      <div className="ct_edit_details">
        <div className="ct_top">{profile.first_name}'s Profile</div>
        <div className="ct_title">Edit Personal Details</div>
        <table className="ct_table">
          <tbody>
            <tr>
              <td>Height:</td>
              <td>
                <input className="ct_ht_input" value={heightFt} name="heightFt" onChange={(e) => this.changeHandler(e)}></input>&nbsp;ft&nbsp;
                <input className="ct_ht_input" value={heightIn} name="heightIn" onChange={(e) => this.changeHandler(e)}></input>&nbsp;in
              </td>
            </tr>
            <tr>
              <td>Weight:</td>
                <td>
                  <input className="ct_input" value={weight} name="weight" onChange={(e) => this.changeHandler(e)}></input>&nbsp;lbs
                </td>
            </tr>
            <tr>
              <td>Age:</td>
                <td>
                  <input className="ct_input" value={age} name="age" onChange={(e) => this.changeHandler(e)}></input>
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
                  <input className="ct_input" value={dob} placeholder="MM/DD/YYYY" name="dob" onChange={(e) => this.changeHandler(e)}></input>
                </td>
            </tr>
            <tr>
              <td>Zip Code:</td>
                <td>
                  <input className="ct_input" value={zip} name="zip" onChange={(e) => this.changeHandler(e)}></input>
                </td>
            </tr>
          </tbody>
        </table>
      <button className="ct_save_btn" name="editDetails" onClick={(e) => this.saveChanges(e)}>Save</button>
      </div>
    )
  };
};

export default EditDetails;