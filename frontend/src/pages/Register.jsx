import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
// useselector selects something from states
// useDispatch is used to dispatch an action like register, asyncthunk function, reset function,
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

// To store the data to send to the backend

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  //   Destructuring the formData
  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useSelector is used to select something from the state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  //   useEffect is used to run a function when a state changes
  useEffect(() => {
    if (isError) {
      toast.error(message)
      // dispatch(reset())
    }
    // Redirect when logged in
    if (isSuccess || user) {
      toast.success(message)
      dispatch(reset())
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //   onChange function
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  //   onSubmit function
  const onSubmit = (e) => {
    e.preventDefault()

    //password matching Validation
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      //   dispatching the register action
      //dispatch is used to dispatch an action
      dispatch(register(userData))
    }
  }
  //   is loading check
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create your account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your Name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Enter your confirm password'
              required
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register
