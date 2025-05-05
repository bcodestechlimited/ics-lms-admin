import Shell from "../../components/shell";
import UpdatePasswordForm from "../../components/update-password-shell";

const SettingsPage = () => {
  return (
    <Shell pageHeader="View and Edit Settings" pageTitle="Settings">
      <div>
        <UpdatePasswordForm />
      </div>
    </Shell>
  );
};

export default SettingsPage;
