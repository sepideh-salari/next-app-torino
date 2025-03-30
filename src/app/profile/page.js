import React from "react";
import AccountInfo from "src/components/templates/AccountInfo";
import BankAccountForm from "src/components/templates/BankAccountForm";
import PersonalInfo from "src/components/templates/PersonalInfo";

function ProfilePage() {
  return (
    <div>
      <AccountInfo />
      <PersonalInfo />
      <BankAccountForm />
    </div>
  );
}

export default ProfilePage;
