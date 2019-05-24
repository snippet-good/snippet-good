import React, { useState } from 'react'
import { connect } from 'react-router-dom'
import login from '../../redux/store/thunks'

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

const Login = ({ login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = ev => {
    ev.preventDefault()
    login(email, password)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
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
