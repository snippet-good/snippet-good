import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/auth/actions'

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

const Login = ({ login, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = ev => {
        ev.preventDefault()
        login(email, password)
            .then(() => history.push('/home'))
            .catch(({ response: { data } }) => setError(data))
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
                {error && <div>{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    mapDispatchToProps
)(Login)
