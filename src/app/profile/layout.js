import AuthProvider from "src/providers/AuthProvider.js";
function ProfileLayout({ children }) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}

export default ProfileLayout;
