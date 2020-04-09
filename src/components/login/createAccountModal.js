import React, { Component } from 'react';
import {signupUserAction} from '../../actions/signupUserAction';
import {connect} from 'react-redux';

class CreateAccountModal extends Component {

    state = {
        nextDisabled: true,
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
        let month = document.getElementById('month-select');
        let day = document.getElementById('day-select');
        let year = document.getElementById('year-select');
        let name = document.getElementById('name-input');
        let phone = document.getElementById('phone-input');

        if(month.value !== '' && day.value !== '' && year.value !== '' && name.value !== '' && phone.value !== '') {
            this.setState({
				nextDisabled: false,
			})
        } else {
            this.setState({
				nextDisabled: true,
			})
        }
    }

    signupUser = () => {
        //give this action values for service
        this.props.signupUserAction();
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

                        <div className="input-container-create-account">
							<label className="label-styles hide" htmlFor="name">Name</label>
							<input onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="name" className="input-styles-create-account" target="name" id="name-input-create"/>
                            <div className="error-msg hide"></div>
						</div>

                        <div className="input-container-create-account">
							<label className="label-styles hide" htmlFor="phone">phone</label>
							<input onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="phone" className="input-styles-create-account" target="phone" id="phone-input-create"/>
                            <div className="error-msg hide"></div>
						</div>

                        <div className="input-container-create-account">
							<label className="label-styles hide" htmlFor="date">date</label>
							<input onChange={this.checkInputs2} onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="phone" className="input-styles-create-account" target="phone" id="dob-input-create"/>
                            <div className="error-msg hide"></div>
						</div>
                    </div>

                    <div className="create-account-footer-container">
                        <div className="terms-text">
                        By signing up, you agree to the <span className="terms-text-span">Terms of Service</span> and <span className="terms-text-span">Privacy Policy</span>, including <span className="terms-text-span">Cookie Use</span>. Others will be able to find you by email or phone number when provided · <span className="terms-text-span">Privacy Options</span>
                        </div>
                    </div>

                    <div className="create-account-button-container">
                        <button onClick={this.signupUser} disabled={this.state.loginDisabled} className="login-button">Sign up</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, {
    signupUserAction
})(CreateAccountModal);