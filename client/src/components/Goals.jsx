import React from 'react';

const Goals = ({ profile }) => {
  const title = ['Current Weight', 'Goal Weight', 'Weekly Goal', 'Activity Level'];
  const dbTitle = ['weight', 'goal_w', 'weekly_goal', 'activity_lvl'];
  return (
    <table className="ct_table" id="ct_table_goals">
      <tbody>
        { title.map((title, index) => (
          <tr key={index}>
            <td>{title}</td>
            <td>{profile[dbTitle[index]]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Goals;