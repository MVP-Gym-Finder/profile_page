import React from 'react';
import zipcodes from 'zipcodes';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };
  render() {
    let { profile } = this.props;
    return (
      <div className="ct_basic_info">
        <div id="ct_info_name">{profile.first_name} {profile.last_name}</div>
        <div>{profile.age} years old</div>
        <div>{zipcodes.lookup(profile.zip).city}, {zipcodes.lookup(profile.zip).state}</div>
      </div>
    )
  };
};

export default BasicInfo;