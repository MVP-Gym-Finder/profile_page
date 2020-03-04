import React from 'react';
import BasicInfo from './BasicInfo.jsx';
import axios from 'axios';

class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
}
onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post('/api/upload',formData,config)
        .then(() => {
            alert("The file is successfully uploaded");
        })
        .catch(err => console.error(err));
}
onChange(e) {
    this.setState({file:e.target.files[0]});
}

render() {
  let { profile } = this.props;
    return (
      <div>
        <img src={profile.image} height={300}/>
        <BasicInfo profile={profile}/>
        <form onSubmit={this.onFormSubmit}>
            <input type="file" name="myImage" onChange= {this.onChange} />
            <button type="submit">Upload</button>
        </form>
      </div>
    )
}
}

export default ProfilePic;