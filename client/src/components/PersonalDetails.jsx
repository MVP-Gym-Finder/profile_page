import React from 'react';

const PersonalDetails = ({ profile }) => {
  let title = ['Height', 'Weight', 'Age', 'Gender','DOB', 'Zip Code'];
  let dbTitle = ['height', 'weight', 'age', 'gender','dob', 'zip'];
  return (
    <div className="ct_personal_details">
      <table className="ct_table" id="ct_table_personal_details">
        <tbody>
          { title.map((title, index) => (
            <tr key={index}>
                <td>{title}</td>
            {dbTitle[index] === 'height' ? (
              <td>{profile[dbTitle[index]].split('/')[0]}ft {profile[dbTitle[index]].split('/')[1]}in</td>
            ) : (
              <td>{profile[dbTitle[index]]}</td>
            )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalDetails;