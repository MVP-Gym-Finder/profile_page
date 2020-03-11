import React from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

const Months = Array.from(Array(12)).map(i => i + 1)
const Days = Array.from(Array(31)).map(i => i + 1)

class EditDetails extends React.Component {
  constructor(props) {
    super(props)
    let { height, weight, age, gender, dob, zip } = props.profile

    const [heightFt, heightIn] = height.split('/')

    this.state = {
      age,
      dob,
      gender,
      heightFt,
      heightIn,
      zip,
      dropdownOpen: false,
      weight: weight.split(' ')[0],
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state),
    )
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  clickDropdown = e => {
    this.setState({ gender: e.target.innerText })
  }

  saveChanges = e => {
    let { heightFt, heightIn, weight, age, dob, zip } = this.state

    console.log('typeof:', Number(heightIn))

    if (this.isInvalidInput()) {
      return alert('please enter valid input')
    }

    let details = this.state

    details.height = `${heightFt}/${heightIn}`
    details.weight = `${weight} lbs`

    const { height, weight, age, gender, dob, zip } = details

    const mutation = `
        mutation updateProfile {
          updateProfile(
            id:0,
            height:"${height}",
            weight:"${weight}",
            age:${age},
            gender:"${gender}",
            dob:"${dob}",
            zip:${zip}
          ) { id }
        }`

    axios
      .post('/ct/graphql', { query: mutation })
      .then(() => {
        console.log('details editted')
        window.location.reload()
      })
      .catch(err => console.error(err))
  }

  render() {
    let { heightFt, heightIn, weight, age, gender, dob, zip } = this.state
    let { profile } = this.props
    return (
      <div className='ct_edit_details'>
        <div className='ct_top'>{profile.first_name}'s Profile</div>
        <div className='ct_title'>Edit Personal Details</div>
        <table className='ct_table'>
          <tbody>
            <tr>
              <td>Height:</td>
              <td>
                <input
                  className='ct_ht_input'
                  value={heightFt}
                  name='heightFt'
                  onChange={e => this.changeHandler(e)}
                ></input>
                &nbsp;ft&nbsp;
                <input
                  className='ct_ht_input'
                  value={heightIn}
                  name='heightIn'
                  onChange={e => this.changeHandler(e)}
                ></input>
                &nbsp;in
              </td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>
                <input
                  className='ct_input'
                  value={weight}
                  name='weight'
                  onChange={e => this.changeHandler(e)}
                ></input>
                &nbsp;lbs
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input
                  className='ct_input'
                  value={age}
                  name='age'
                  onChange={e => this.changeHandler(e)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>
                <Dropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                  size='m'
                  direction='right'
                >
                  <DropdownToggle outline color='secondary' caret>
                    {gender}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={e => this.clickDropdown(e)}>
                      Female
                    </DropdownItem>
                    <DropdownItem onClick={e => this.clickDropdown(e)}>
                      Male
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>Date of Birth:</td>
              <td>
                <input
                  className='ct_input'
                  value={dob}
                  placeholder='MM/DD/YYYY'
                  name='dob'
                  onChange={e => this.changeHandler(e)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Zip Code:</td>
              <td>
                <input
                  className='ct_input'
                  value={zip}
                  name='zip'
                  onChange={e => this.changeHandler(e)}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className='ct_save_btn'
          name='editDetails'
          onClick={e => this.saveChanges(e)}
        >
          Save
        </button>
      </div>
    )
  }

  isInvalidInput() {
    const { heightFt, heightIn, weight, age, dob, zip } = this.state

    const [birthMonth, birthDay, birthYear = 0] = dob.split('/')

    return (
      Number(heightFt) === NaN ||
      Number(heightIn) === NaN ||
      Number(weight) === NaN ||
      Number(age) === NaN ||
      Number(zip) === NaN ||
      !Months.includes(birthMonth) ||
      !Days.includes(birthDay) ||
      birthYear < 1000
    )
  }
}

export default EditDetails
