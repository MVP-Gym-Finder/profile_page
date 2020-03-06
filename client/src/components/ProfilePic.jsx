import React from 'react';
import axios from 'axios';

class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedFile: null,
      image: props.profile.image
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  fileChangedHandler(e) {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  fileUploadHandler() {
    const data = new FormData();
    // If file selected
    if ( this.state.selectedFile ) {
      data.append('profileImage', this.state.selectedFile, this.state.selectedFile.name);
      axios
        .post('/api/upload', data, {
          headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        })
        .then( ( response ) => {
          if ( 200 === response.status ) {
            // If file size is larger than expected.
            if( response.data.error ) {
              if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                alert('Max size: 2MB');
              } else {
                console.log( response.data );
                // If not the given file type
                alert( response.data.error);
              }
            } else {
              // Success
              let fileName = response.data;
              console.log( 'fileName', fileName );
              this.setState({ image: fileName.location })
              alert('Image Uploaded');
            }
          }
        })
        .catch( ( error ) => {
          // If another error
          alert(error);
        });
    } else {
      // if file not selected throw error
      alert('Please upload file');
    }
  }

  render() {
    let { image } = this.state;
      return (
        <div className="ct_profile_pic">
          <img src={image} height={300}/>
          <div>Upload Size: 250px x 250px ( Max 2MB )</div>
          <input type="file" onChange={this.fileChangedHandler}/>
          <button onClick={this.fileUploadHandler}>Upload!</button>
        </div>
      )
  }
}

export default ProfilePic;