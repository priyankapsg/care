import React from 'react';

const HelpReceiverDashboard = () => {
  const profileDetails = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    location: 'City, Country',
    phone: '+9876543210',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };


  const handleAddRequest = () => {

    console.log('Adding a new request...');
  };

  return (
    <div className="help-receiver-dashboard">
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

      <section className="add-request">
        <button onClick={handleAddRequest}>Add New Request</button>
      </section>
    </div>
  );
};

export default HelpReceiverDashboard;
