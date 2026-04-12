import { ProfileNav } from "../profile/components/profile-nav/profile-nav";
import ProfileForm from "./components/profile-form/profile-form";
import styles from "./profile.module.css";
import { Helmet } from "react-helmet-async";

function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>Личный кабинет</title>
        <meta
          name="description"
          content="Управляйте своим профилем, смотрите историю заказов и изменяйте персональные данные в личном кабинете."
        />
        <meta
          name="keywords"
          content="профиль, личный кабинет, настройки, история заказов"
        />
      </Helmet>
      <div className={`${styles.containerProfile} mb-6`}>
        <ProfileNav />
        <div className={`${styles.content}`}>
          <ProfileForm />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
