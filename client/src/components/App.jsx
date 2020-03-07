import React from 'react';
import BMR from './BMR.jsx';
import PersonalDetails from './PersonalDetails.jsx';
import Goals from './Goals.jsx';
import FitnessGoals from './FitnessGoals.jsx';
import ProfilePic from './ProfilePic.jsx';
import EditDetails from './EditDetails.jsx';
import EditGoals from './EditGoals.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      editDetails: false,
      editGoals: false,
      dropdownOpen: false

    };
    this.clickHandler = this.clickHandler.bind(this);
  };

  componentDidMount() {
    const query = `
      {
          profiles(id:0) {
            username
            first_name
            last_name
            height
            weight
            age
            gender
            dob
            zip
            current_w
            goal_w
            weekly_goal
            activity_lvl
            workouts_per_wk
            min_per_workout
            image
        }
      }`;
    axios
      .post('/graphql', { query })
      .then((result) => this.setState({ profile: result.data.data.profiles[0] }))
      .catch(err => console.error(err));
  }

  clickHandler(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] })
  }

  render() {
    let { profile, editDetails, editGoals } = this.state;
    console.log(profile)
    if (editDetails) return <EditDetails profile={profile}/>;
    if (editGoals) return <EditGoals profile={profile}/>;


    return (
      <div className="ct_main">
        <div className="ct_top">{profile.first_name}'s Profile</div>
        { Object.keys(profile).length && 
          <div className="ct_profile">
            <div className="ct_pic_BMR">
              <ProfilePic profile={profile}/>
              <BMR profile={profile}/>
            </div>
            <hr className="ct_hr"/>
            <div className="ct_title">Personal Details</div>
            <PersonalDetails profile={profile}/>
            <button className="ct_edit_btn" name="editDetails" onClick={(e) => this.clickHandler(e)}>edit</button>
            <hr className="ct_hr"/>
            <div className="ct_title">Goals</div>
            <Goals profile={profile}/>
            <button className="ct_edit_btn" name="editGoals" onClick={(e) => this.clickHandler(e)}>edit</button>
            <hr className="ct_hr"/>
            <div className="ct_title">Fitness Goals</div>
            <FitnessGoals profile={profile}/>
            <hr className="ct_hr"/>
          </div>
        }
      </div>
    );
  };
};

export default App;