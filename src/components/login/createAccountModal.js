import React, { Component } from 'react';
import moment from "moment";
import {signupUserAction} from '../../actions/signupUserAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class CreateAccountModal extends Component {
    constructor(props) {
        super(props);
        this.name_input = React.createRef();
        this.password_input = React.createRef();
        this.phone_input = React.createRef();
        this.dob_input = React.createRef();

        this.state = {
            loginDisabled: true,
        }
      }

     
    

    closeModal = (e) => {
        if(e.target.classList[0] === 'create-account-modal-overall-container') {
            document.getElementById('createAccountModal').classList.add("hide");
        }
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
    
    checkInputs2 = (e) => {
        let isValid = true;
        let name = this.name_input.current.value;
        let password = this.password_input.current.value;
        let phone = this.phone_input.current.value;
        let dob = moment(this.dob_input.current.value);

        if(name.length > 50 || name.length < 5) {
            this.name_input.current.parentElement.nextElementSibling.classList.remove('hide');
            isValid = false;
        } else {
            this.name_input.current.parentElement.nextElementSibling.classList.add('hide');
        }
        if(password.length > 50 || password.length < 5) {
            this.password_input.current.parentElement.nextElementSibling.classList.remove('hide');
            isValid = false;
        } else {
            this.password_input.current.parentElement.nextElementSibling.classList.add('hide');
        }
        if(phone.length !== 10) {
            this.phone_input.current.parentElement.nextElementSibling.classList.remove('hide');
            isValid = false;
        } else {
            this.phone_input.current.parentElement.nextElementSibling.classList.add('hide');
        }
        if(!dob.isValid()) {
            this.dob_input.current.parentElement.nextElementSibling.classList.remove('hide');
            isValid = false;
        } else {
            this.dob_input.current.parentElement.nextElementSibling.classList.add('hide');
        }

        if(isValid) {
            this.setState({
				loginDisabled: false,
			})
        } else {
            this.setState({
				loginDisabled: true,
			})
        }
    }

    signupUser = () => {
        let name = this.name_input.current.value;
        let password = this.password_input.current.value;
        let phone = this.phone_input.current.value;
        let dob = this.dob_input.current.value;
        this.props.signupUserAction(name, password, phone, dob);
    }

    componentDidUpdate() {
        if(this.props.token && this.props.token != '') {
            localStorage.setItem('token', this.props.token);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div onClick={this.closeModal} id="createAccountModal" className="create-account-modal-overall-container hide">
                <div className="signup-modal-content">
                    <div className="signup-header-container">
                        <div>
                            <svg className="create-account-back"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg><span></span>
                        </div>
                        <div className="step-text">Step 2 of 2</div>
                    </div>
                    <div className="create-account-modal-body-container">
                        <div className="create-text">Create your account</div>

                        <div>
                            <div className="input-container-create-account">
                                <label className="label-styles hide" htmlFor="name">Name</label>
                                <input ref={this.name_input} onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="name" className="input-styles-create-account" target="name" id="name-input-create"/>
                            </div>
                            <div className="error-msg hide">Name must be under 50 characters</div>
                        </div>


                        <div>
                            <div className="input-container-create-account">
                                <label className="label-styles hide" htmlFor="name">Password</label>
                                <input ref={this.password_input} placeholder="Enter Account Password" onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="password" className="input-styles-create-account" target="password" id="password-input-create"/>
                            </div>
                            <div className="error-msg hide">Password must be under 50 characters</div>
                        </div>

                        <div>
                            <div className="input-container-create-account">
                                <label className="label-styles hide" htmlFor="phone">phone</label>
                                <input ref={this.phone_input} onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="phone" className="input-styles-create-account" target="phone" id="phone-input-create"/>
                            </div>
                            <div className="error-msg hide">Phone number must be numbers Only</div>
                        </div>

                        <div>
                            <div className="input-container-create-account">
                                <label className="label-styles hide" htmlFor="date">date of Birth</label>
                                <input ref={this.dob_input} onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="phone" className="input-styles-create-account" target="phone" id="dob-input-create"/>
                            </div>
                            <div className="error-msg hide">Must be a valid date</div>
                        </div>
                    </div>

                    <div className="create-account-footer-container">
                        <div className="terms-text">
                        By signing up, you agree to the <span className="terms-text-span">Terms of Service</span> and <span className="terms-text-span">Privacy Policy</span>, including <span className="terms-text-span">Cookie Use</span>. Others will be able to find you by email or phone number when provided · <span className="terms-text-span">Privacy Options</span>
                        </div>
                    </div>

                    <div className="create-account-button-container">
                        <button onClick={this.signupUser} disabled={this.state.loginDisabled} className="signup-button">Sign up</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.add_new_user_reducer.token,
    }
}

export default connect(mapStateToProps, {
    signupUserAction
})(withRouter(CreateAccountModal));