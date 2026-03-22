import { ProfileNav } from "../profile/components/profile-nav/profile-nav";
import ProfileForm from "./components/profile-form/profile-form";
import styles from "./profile.module.css";

function ProfilePage() {
  return (
    <div className={`${styles.containerProfile} mb-6`}>
      <ProfileNav />
      <div className={`${styles.content}`}>
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfilePage;
