import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserAccountData} from '../actions/getUserAccountAction';

export default (wrappedComponent, to = '/login', redirect = false) => {
    class Auth extends Component {
        state = {
            getUserAccountData: false
        };

        //on the load of the every wrapped component run this function
        componentWillMount () {
            this.checkAuth();
        }

        // check if the props are different after component updates
        componentDidUpdate(prevProps) {
            if(this.props != prevProps) {
                this.checkAuth();
            }
        }

        //function to grab and make all images accessible in every component
        importAll = (r) => {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        };

        checkAuth = () => {
            let token = localStorage.getItem('token');
            if(!token) {
                //if user is already on a page where auth isnt required dont do anything, otherwise push them to '/login'
                if(this.props.history.location.pathname !== '/login') {
                    this.props.history.push(to);
                }
            } else {
               //if user is already on a page where auth is required dont do anything, otherwise push them to '/'
               if(this.props.history.location.pathname === '/signUp' || this.props.history.location.pathname === '/signIn') {
                    this.props.history.push('/');
                }

                //check if username props are set, if not get it, username needed on all auth files.
                if(!this.props.username || this.props.username === '' || !this.state.getUserAccountData) {
                    this.props.getUserAccountData();
                    this.setState({
                        getUserAccountData: true,
                    })
                }

                //check if the images array are set, if not get the images
                if((!this.props.mediaImages || this.props.mediaImages === '') && !this.state.mediaImages) {
                    const mediaImages = this.importAll(require.context('../assets/', false, /\.(png|jpe?g|PNG|JPG|MOV|MP4|AVI)$/));
                    this.setState({
                        mediaImages: mediaImages,
                    })
                }

            }
        };


        render() {
            return <WrappedComponent mediaImages={this.state.mediaImages} profileImages={this.state.profileImages} generalImages={this.state.generalImages} {...this.props}/>
        }

    }

    function mapStateToProps(state) {
        return {

        }

    }

    return connect(mapStateToProps,{
        getUserAccountData,
    })(withRouter(Auth));
}