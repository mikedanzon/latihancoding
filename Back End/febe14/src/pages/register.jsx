import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { RegisterAction } from '../redux/actions';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    state = {
        username: createRef(),
        password: createRef(),
        confirmpass: createRef(),
        email: createRef()
    }

    componentDidMount() {
        if (!this.props.Auth.isLogin) {
            this.state.username.current.focus()
        }
    }

    onRegisterClick = (e) => {
        e.preventDefault()
        const { username, password, confirmpass, email } = this.state
        if (password.current.value !== confirmpass.current.value) {
            return alert('Check your password again!')
        }
        var data = {
            username: username.current.value,
            password: password.current.value,
            email: email.current.value
        }
        this.props.RegisterAction(data)
    }

    render() {
        if (this.props.Auth.isLogin) {
            return <Redirect to="/"/>
        }
        return (
            <div style={{ height: '90vh' }} className="d-flex justify-content-center align-items-center">
                <form onSubmit={this.onRegisterClick}>
                    <input type="text" ref={this.state.username} placeholder="Username" className="form-control mb-3" />
                    <input type="password" ref={this.state.password} placeholder="Password" className="form-control mb-3" />
                    <input type="password" ref={this.state.confirmpass} placeholder="Confirm Password" className="form-control mb-3" />
                    <input type="email" ref={this.state.email} placeholder="Email" className="form-control mb-3" />
                    <button disabled={this.props.Auth.isLoading} className="btn btn-primary" type="submit">
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

const Mapstatetoprops = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(Mapstatetoprops, { RegisterAction })(Register);