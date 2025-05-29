import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const { user, logout: userLogout } = useUser();
  const { admin, logout: adminLogout } = useAdmin();
  const navigate = useNavigate();

  const isAdmin = !!admin;
  const profile = isAdmin ? admin : user;

  // console.log("User:", user);
 

  // console.log("Profile:", profile.image);
  

  if (!profile) {
    return <p>Please <a href="/login">login</a> to view your profile.</p>;
  }
  
  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
    } else {
      userLogout();
    }
    navigate("/");
  };

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <img
        src={profile.image || "https://via.placeholder.com/100"}
        alt="Profile"
        className="profile-pic"
      />
      <p><strong>Name:</strong> {profile.firstname} {profile.lastname || ""}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}
