import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setRegisterData({
      ...registerData,
      username: e.target.value,
    });
  };
  const handleEmail = (e) => {
    setRegisterData({
      ...registerData,
      email: e.target.value,
    });
  };
  const handlePassword = (e) => {
    setRegisterData({
      ...registerData,
      password: e.target.value,
    });
  };
  const handleRole = (e) => {
    setRegisterData({
      ...registerData,
      role: e.target.value,
    });
  };

  const handleRegister = () => {
    let { username, email, password, role } = registerData;
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("register successfully and redirect to login page.");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div className="col-md-12 p-5">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="at least 6 characters"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Role：</label>
          <input
            onChange={handleRole}
            type="text"
            className="form-control"
            placeholder="only use student or instructor"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
