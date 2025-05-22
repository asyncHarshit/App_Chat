import {useState} from 'react'
import { useAuthStore } from "../store/useAuthStore.js"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })  

  const {signUp , isSigningUp} = useAuthStore();
  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(!formData.fullName.trim()) return toast.error("fullName is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid");
    return true;
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const sucess = validateForm();
    if(sucess === true){
      signUp(formData)
    }
  }

  return (
    <div className="signup-container" style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          FullName
          <input
            type="text"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            required
            autoComplete="fullName"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            autoComplete="email"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
        <label>
          Password
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ flex: 1, padding: 8, marginTop: 4 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(s => !s)}
              style={{ marginLeft: 8, padding: "8px 12px" }}
              tabIndex={-1}
            >
              {showPassword ? (
                <span style={{ fontSize: 16 }}>👁️</span>
              ) : (
                <span style={{ fontSize: 16 }}>🔒</span>
              )}
            </button>
          </div>
        </label>
        <button
          type="submit"
          disabled={isSigningUp}
          style={{
            padding: 10,
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: isSigningUp ? "not-allowed" : "pointer"
          }}
        >
          {isSigningUp ? "Signing Up..." : "Sign Up"}
        </button>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpPage