import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Select from 'react-select'; 
// import {tagsOptionsMonth, tagsOptionsDay, tagsOptionsYear} from '../jscript';
import {tagsOptionsMonth, tagsOptionsDay, tagsOptionsYear} from '../../jscript';

class SignupModal extends Component {

    state = {
        selectedOption: [],
    }

    closeModal = (e) => {
        if(e.target.classList[0] === 'signup-modal-overall-container') {
            document.getElementById('signupModal').classList.add("hide");
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

    render() {
        return (
            <div onClick={this.closeModal} id="signupModal" className="signup-modal-overall-container">
                <div className="signup-modal-content">
                    <div className="signup-header-container">
                        <div>
                            <svg viewBox="0 0 24 24" className="twitter-logo2">
                                <g>
                                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                                </g>
                            </svg>
                        </div>
                        <button className="next-btn">Next</button>
                    </div>
                    <div className="signup-modal-body-container">
                        <div className="create-text">Create your account</div>

                        <div className="input-container-signup">
							<label className="label-styles" htmlFor="name">Name</label>
							<input onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="name" className="input-styles" type="text" target="name"/>
                            <div className="error-msg hide"></div>
						</div>

                        <div className="input-container-signup">
							<label className="label-styles" htmlFor="name">Name</label>
							<input onFocus={e => this.colorChange(e, true)} onBlur={e => this.colorChange(e, false)} name="name" className="input-styles" type="text" target="name"/>
                            <div className="error-msg hide"></div>
						</div>

                        <div className="email-text">Use email instead</div>
                        <div className="date-text">Date of birth</div>
                        <div className="public-text">This will not be shown publicly. Confirm your age to receive the appropriate experience.</div>

                        <div className="dob-container">
                            <div className="month select-container">
                                <label className="label-styles" htmlFor="Month">Month</label>
                                <select className="month select-styles" name="Month" id="Month">
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <div className="error-msg hide"></div>
                            </div>

                            <div className="day select-container">
                                <label className="label-styles" htmlFor="Day">Day</label>
                                <select className="day select-styles" name="Day" id="Day">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                </select>
                                <div className="error-msg hide"></div>
                            </div>

                            <div className="year select-container">
                                <label className="label-styles" htmlFor="Year">Year</label>
                                <select className="year select-styles" name="Year" id="Year">
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                </select>
                                <div className="error-msg hide"></div>
                            </div>




                            {/* <Select id="month" isMulti onChange={this.props.addTagsFns} options={tagsOptionsMonth}/>
                            <Select id="day" isMulti onChange={this.props.addTagsFns} options={tagsOptionsDay}/>
                            <Select id="year" isMulti onChange={this.props.addTagsFns} options={tagsOptionsYear}/> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupModal;