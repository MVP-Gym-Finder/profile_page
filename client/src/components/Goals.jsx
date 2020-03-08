import React from 'react';

const Goals = ({ profile }) => {
  let title = ['Current Weight', 'Goal Weight', 'Weekly Goal', 'Activity Level'];
  let dbTitle = ['weight', 'goal_w', 'weekly_goal', 'activity_lvl'];
  return (
    <table className="ct_table" id="ct_table_goals">
      <tbody>
        { title.map((title, index) => {
            return (
              <tr key={index}>
                <td>{title}</td>
                <td>{profile[dbTitle[index]]}</td>
              </tr>
            )
        })}
      </tbody>
    </table>
  );
};

export default Goals;