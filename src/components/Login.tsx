import { useState } from "react";
import { loginUser } from "../utils/Authentication";
import { useNavigate } from "react-router-dom";

interface IFormSubmit {
  handleLogin : (token:string, username:string)=>void;
}

const Login = ({handleLogin}:IFormSubmit) => {
  
  const [formData,setFormData] = useState<{username : string, password: string}>({username: "",password : ""});
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const loginResponse = await loginUser(formData.username, formData.password);
  
      if (!loginResponse || !loginResponse.token) {
        alert("Invalid username or password");
        return;
      }
  
      handleLogin(loginResponse.token, formData.username);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  
  return <div className="d-flex justify-content-center mt-5">
  <div className="card p-4 shadow" style={{ width: "350px" }}>
    <h2 className="text-center mb-3">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={(e)=>{setFormData({...formData,username:e.target.value})}}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  </div>
  <div className="card p-4 shadow mx-3" style={{ width: "350px" }}>
    <h4 className="text-center mb-3">Test Credentials</h4>
    <div className="mb-2">
      <strong>Regular User:</strong>
      <p className="mb-0">Username: johnd</p>
      <p>Password: m38rmF$</p>
    </div>
    <div>
      <strong>Admin User:</strong>
      <p className="mb-0">Username: donero</p>
      <p>Password: ewedon</p>
    </div>
  </div>
</div>;
};

export default Login;
