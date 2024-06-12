import { useSelector } from "react-redux";

const ProfileComponent = () => {
  const currentUser = useSelector((state) => state.userReducer.user);

  return (
    <div className="p-5">
      {!currentUser && <div>You must login before accessing your profile.</div>}
      {currentUser && (
        <div>
          <h2>Here is your profile:</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Username：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>User ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Role: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
