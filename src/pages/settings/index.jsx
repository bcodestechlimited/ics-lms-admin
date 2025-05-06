import CreateAdminForm from "../../components/create-admin-account";
import Shell from "../../components/shell";
import UpdatePasswordForm from "../../components/update-password-shell";

const SettingsPage = () => {
  return (
    <Shell pageHeader="View and Edit Settings" pageTitle="Settings">
      <div className="space-y-12">
        <div>
          <UpdatePasswordForm />
        </div>

        <div>
          <CreateAdminForm />
        </div>
      </div>
    </Shell>
  );
};

export default SettingsPage;
