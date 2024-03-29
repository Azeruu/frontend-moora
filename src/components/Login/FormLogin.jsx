import "./Login.css";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser, reset } from "../../features/authSlice";
import axios from '../../lib/axios'; 
import {
  User,
  Mail,
  Key,
} from "feather-icons-react/build/IconComponents";

const Login = () => {
  const [toggle, setToggle] = useState(false);

  const tuker = () => {
    setToggle(!toggle);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useLayoutEffect(() => {
    if (user || isSuccess) {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLoginEmail('');
      setLoginPassword('');
      navigate("/dashboard");
    }
    if(isError){
      alert(`pesan error : ${message}`);
    }
    dispatch(reset());
  }, [user]);

  const saveUser = async (e) => {
    e.preventDefault();
    dispatch(RegisterUser({ username, email, password, confirmPassword, role}));
    tuker();
  };
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ LoginEmail, LoginPassword }));
  };
  
  return (
    <div className="body-login">
      <div className="login-row">
        <div className="hero">
          <h1>
              Website Sistem Penunjang Keputusan <span>Dengan metode </span>Multi-Objective Optimization by Ratio Analysis (MOORA)
          </h1>
          <p>
            Website untuk membantu panitia dalam seleksi penerimaan
            peserta didik baru di SMPN 1 CISOKA
          </p>
        </div>
      </div>
      <div className="login-row">
        {/* Bagian Box Form Loginnya */}
        <div className={`wrap ${toggle ? "active" : ""}`}>
          <div className="form-box login">
            {isError && <p className="pesan-error">{message}</p>}
            <h1 className="judul">Login</h1>
            {/* <img className='logo' src={logo} alt=''/> */}
            <form onSubmit={Auth}>
              <div className="input-box">
                <span>
                  <Mail className="icon" />
                </span>
                <input
                  name="email"
                  type="email"
                  value={LoginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span>
                  <Key className="icon" />
                </span>
                <input
                  name="password"
                  type="password"
                  value={LoginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <div className="remember">
                <label>
                  <input type="checkbox" /> Ingat Saya
                </label>
                <a href="/">Lupa Password</a>
              </div>
              <button type="submit" className="btn-login">
                {isLoading ? "Loading" : "Login"}
              </button>
              <div className="login-register">
                <p>
                  Belum Punya akun?
                  <a href="#regis" className="register-link" onClick={tuker}>
                    {" "}
                    Daftar Sekarang
                  </a>
                </p>
              </div>
            </form>
          </div>
          
          {/* Bagian Register */}
          <div className="form-box register">
            {isError && <p className="pesan-error">{message}</p>}
            <h1 className="judul">Register</h1>
            <form onSubmit={saveUser}>
              <div className="input-box">
                <span>
                  <User className="icon" />
                </span>
                <input
                  name="username"
                  type="text"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span>
                  <Mail className="icon" />
                </span>
                <input
                  name="registerEmail"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span>
                  <Key className="icon" />
                </span>
                <input
                  name="registerPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <div className="input-box">
                <span>
                  <Key className="icon" />
                </span>
                <input
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label>Konfirmasi Password</label>
              </div>
              <div className="input-box">
                <input
                  name="status"
                  type="text"
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                  readOnly
                />
                <label className="label-role">Role</label>
              </div>
              <div className="remember">
                <label>
                  <input type="checkbox" autoComplete="on" required/> Saya setuju sengan
                  Persyaratan dan Ketentuan
                </label>
              </div>
              <button type="submit" className="btn-login">
                {isLoading ? "Loading" : "Register"}
              </button>
              <div className="login-register">
                <p>
                  Sudah Punya akun?
                  <a href="#login" className="login-link" onClick={tuker}>
                    {" "}
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
