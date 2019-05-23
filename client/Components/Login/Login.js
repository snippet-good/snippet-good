import React, { useState } from 'react'
import { connect } from 'react-router-dom'
import login from '../../redux/store/thunks'

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) => dispatch(login(userName, password))
  }
}

const Login = ({ login }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = ev => {
    ev.preventDefault()
    login(userName, password)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={userName}
            onChange={ev => setUserName(ev.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
