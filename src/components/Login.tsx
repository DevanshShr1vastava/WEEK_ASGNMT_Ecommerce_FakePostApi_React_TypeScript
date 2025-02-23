import { useState } from "react";
import { loginUser } from "../utils/Authentication";
import { useNavigate } from "react-router-dom";

interface IFormSubmit {
  handleLogin : (token:string, username:string)=>void;
}

const Login = ({handleLogin}:IFormSubmit) => {
  
  const [formData,setFormData] = useState<{username : string, password: string}>({username: "",password : ""});
  const navigate = useNavigate();
  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();
    const loginResponse = await loginUser(formData.username,formData.password);
    handleLogin(loginResponse.token, formData.username);
    navigate('/');
  }
  return <div className="container d-flex justify-content-center align-items-center vh-100">
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
</div>;
};

export default Login;
