import React from "react";

const Profile = () => {
  return (
    <div style={styles.profileContainer}>
      <h2>Your Profile</h2>
      <p>View and edit your profile information here.</p>
      {/* Add more profile details or editable form if necessary */}
    </div>
  );
};

const styles = {
  profileContainer: {
    padding: "20px",
    textAlign: "center",
  },
};

export default Profile;
