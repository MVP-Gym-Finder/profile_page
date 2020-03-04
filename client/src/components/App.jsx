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
      editGoals: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  };

  componentDidMount() {
    axios
      .get('/api')
      .then((result) => this.setState({ profile: result.data }))
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
      <div>
        { Object.keys(profile).length && 
          <div>
            <h1>{profile.first_name}'s Profile</h1>
            <h2>Personal Details</h2>
            <PersonalDetails profile={profile}/>
            <button name="editDetails" onClick={(e) => this.clickHandler(e)}>edit</button>
            <h2>Goals</h2>
            <Goals profile={profile}/>
            <button name="editGoals" onClick={(e) => this.clickHandler(e)}>edit</button>
            <h2>Fitness Goals</h2>
            <FitnessGoals profile={profile}/>
            <ProfilePic profile={profile}/>
            <BMR profile={profile}/>
          </div>
        }
      </div>
    );
  };
};

export default App;