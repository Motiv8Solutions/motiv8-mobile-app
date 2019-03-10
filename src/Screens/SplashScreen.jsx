import React from 'react';
import { SplashView } from 'motiv8-atoms';
import { withRouter } from 'react-router';

class SplashScreen extends React.Component {
    constructor (props) {
        super(props);
        this.countdownTimer = null;
    }

    componentDidMount () {
        this.countdownTimer = window.setTimeout(() => {
            this.props.history.push('/login');
        }, 2000);
    }

    componentWillUnmount () {
        window.clearTimeout(this.countdownTimer);
    }

    render () {
        return (
            <SplashView/>
        )
    }
}

export default withRouter(SplashScreen);