import React from 'react';

const VolunteerDashboard = () => {
  const profileDetails = {
    name: 'John Doe',
    email: 'john@example.com',
    location: 'City, Country',
    phone: '+1234567890',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  const requestDetails = [
    { id: 1, title: 'Request 1', status: 'Pending' },
    { id: 2, title: 'Request 2', status: 'Completed' },
    { id: 3, title: 'Request 3', status: 'Pending' },
  ];

  const creditsEarned = 50;

  const feedback = [
    { id: 1, user: 'User A', comment: 'Great volunteer, highly recommended!' },
    { id: 2, user: 'User B', comment: 'Very helpful, thank you!' },
  ];

  return (
    <div className="volunteer-dashboard">
      <section className="profile-details">
        <h2>Profile Details</h2>
        <div>
          <p>Name: {profileDetails.name}</p>
          <p>Email: {profileDetails.email}</p>
          <p>Location: {profileDetails.location}</p>
          <p>Phone: {profileDetails.phone}</p>
          <p>Bio: {profileDetails.bio}</p>
        </div>
      </section>

      <section className="request-details">
        <h2>Request Details</h2>
        <ul>
          {requestDetails.map(request => (
            <li key={request.id}>
              {request.title} - {request.status}
            </li>
          ))}
        </ul>
      </section>


      <section className="credits-earned">
        <h2>Credits Earned</h2>
        <p>Total Credits: {creditsEarned}</p>
      </section>

      <section className="feedback">
        <h2>Feedback</h2>
        <ul>
          {feedback.map(entry => (
            <li key={entry.id}>
              <p>User: {entry.user}</p>
              <p>Comment: {entry.comment}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default VolunteerDashboard;
