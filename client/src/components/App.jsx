import React from 'react';
import example from '../../example.js';
import BMR from './BMR.jsx';
import PersonalDetails from './PersonalDetails.jsx';
import Goals from './Goals.jsx';
import FitnessGoals from './FitnessGoals.jsx';
import BasicInfo from './BasicInfo.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  };

  componentDidMount() {
    axios
      .get('/api')
      .then((result) => this.setState({ profile: result.data }))
      .catch(err => console.error(err));
  }

  render() {
    let { profile } = this.state;
    console.log(profile)
    return (
      <div>
        { Object.keys(profile).length && 
          <div>
            <h1>{profile.first_name}'s Profile</h1>
            <h2>Personal Details</h2>
            <PersonalDetails profile={profile}/>
            <h2>Goals</h2>
            <Goals profile={profile}/>
            <h2>Fitness Goals</h2>
            <FitnessGoals profile={profile}/>
            <BMR profile={profile}/>
            <BasicInfo profile={profile}/>
          </div>
        }
      </div>
    );
  };
};

export default App;