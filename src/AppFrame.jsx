import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import routes from './Constants/Routes';
import { withRouter } from 'react-router';
import Header from './Components/Header';

/**
 * The AppFrame component houses the Header and the routes that display the various screens.
 */
class AppFrame extends React.Component {
    constructor () {
        super();
        this.renderHeader = this.renderHeader.bind(this);
    }

    render () {
        return (
            <div id='appFrame' className={this.props.className}>
                {this.renderHeader()}
                {
                    routes.map((route, index) => {
                        return (
                            <Route key={`route${index}`} exact={route.exact} path={route.path} render={route.renderFn}/>
                        );
                    })
                }
            </div>
        );
    }

    renderHeader () {
        console.log(`location.path = ${this.props.location.pathname}`);
        if (this.props.location.pathname === '/' || this.props.location.pathname === '/login') {
            return null;
        }
        return <Header/>;
    }
};

export default styled(withRouter(AppFrame))`
    // display: flex;
    flex-direction: column;
    // flex: 1;
    // align-items: flex-start;
`;