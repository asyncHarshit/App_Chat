import { useAuthStore } from "../store/useAuthStore"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginPage = () => {
  const [formData , setFormData] = useState({
    email : "",
    password : ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const {login , isLoggingIn} = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  }
  return (
    <div className="login-container" style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
        <label style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          Password
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete="new-password"
              style={{ flex: 1, padding: 8 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(s => !s)}
              style={{
                marginLeft: 8,
                padding: "8px 12px",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <span style={{ fontSize: 18 }}>🔒</span>
              ) : (
                <span style={{ fontSize: 18 }}>👁️</span>
              )}
            </button>
          </div>
        </label>
        <button type="submit" disabled={isLoggingIn} style={{ padding: 8, backgroundColor: "#007bff", color: "#fff", borderRadius: 4 }}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: 16 }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}


export default LoginPage