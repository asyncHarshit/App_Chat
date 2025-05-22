import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const {logout , authUser} = useAuthStore();
  return (
    <header>
      <nav className="navbar bg-base-100 pb-1">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">My App</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li><a href="/">Home</a></li>
            {authUser ? (
              <>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><button onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign Up</a></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar