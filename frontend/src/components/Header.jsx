import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      {/* link to support desk */}

      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {/* login link */}
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        {/* register link */}
        <li>
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>

        <li>
          <Link to='/signout'>
            <FaSignOutAlt /> signout
          </Link>
        </li>
      </ul>
    </header>
  )
}
export default Header
