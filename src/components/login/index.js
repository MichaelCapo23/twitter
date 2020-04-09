import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import SignupModal from './signupModal';
import CreateAccountModal from './createAccountModal';
import {loginUserAction} from '../../actions/loginUserAction';

class Login extends Component {

	state = {
		loginDisabled: true,
	};

	colorChange = (e, flag) => {
		if(flag) {
			e.target.previousSibling.style.color = '#2AA0F2';
			e.target.parentElement.style.borderBottom = '2px solid #2AA0F2';
		} else {
			e.target.previousSibling.style.color = 'rgb(128, 144, 158)';
			e.target.parentElement.style.borderBottom = '2px solid rgb(128, 144, 158)';
		}
	}

	openSignupModal = (e) => {
		document.getElementById('signupModal').classList.remove('hide');
	}

	checkInputs = (e) => {
		let username = document.getElementById('username-input');
		let password = document.getElementById('password-input');

		if(username.value !== '' && password.value !== '') {
			this.setState({
				loginDisabled: false,
			})
		} else {
			this.setState({
				loginDisabled: true,
			})
		}
	}
	
	loginUser = (e) => {
		let username = document.getElementById('username-input');
		let password = document.getElementById('password-input');
		this.props.loginUserAction(username, password);
	}

	nextModal = (date, name, phone) => {
		document.getElementById('signupModal').classList.add("hide");
		document.getElementById('name-input-create').value = name
		document.getElementById('phone-input-create').value = phone
		document.getElementById('dob-input-create').value = date
        document.getElementById('createAccountModal').classList.remove("hide");
	}

	render() {
		return (
			<Fragment>
				<SignupModal nextModalfns={this.nextModal}/>
				<CreateAccountModal />
				<div className='login-container'>
					<div className="login-gutter">
						<div>
							<svg viewBox="0 0 24 24" className="twitter-logo">
								<g>
									<path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
								</g>
							</svg>
						</div>
						<div className="login-header">Log in to Twitter</div>

						<div className="input-container">
							<label className="label-styles" htmlFor="username">Phone, email, or username</label>
							<input onChange={this.checkInputs} autoComplete="off" onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="username" className="input-styles" target="username" id="username-input"/>
							<div className="error-msg hide"></div>
						</div>
						
						<div className="input-container">
							<label className="label-styles" htmlFor="password">Password</label>
							<input onChange={this.checkInputs} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="password" className="input-styles" type="password" target="password" id="password-input"/>
							<div className="error-msg hide"></div>
						</div>

						<div className="login-button-container">
							<button onClick={this.loginUser} disabled={this.state.loginDisabled} className="login-button">Log in</button>
						</div>

						<div className="forgot-container">
							<span className="forgot-styles">Forgot password?</span> · <span onClick={this.openSignupModal} className="forgot-styles">Sign up for Twitter</span>
						</div>
					</div>
				</div>		
			</Fragment>	
		)
	}
}

function mapStateToProps(state) {
	return {

	}
}

export default connect(mapStateToProps, {
	loginUserAction
})(Login);