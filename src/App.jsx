// Main React application entry point

import React from 'react';
import { Route } from 'react-router-dom';
import routes from './Constants/Routes';
import { withRouter } from 'react-router';

class App extends React.Component {
    render () {
        console.log(`location = ${this.props.location.pathname}`);
        return (
            <React.Fragment>
            {
                routes.map((route, index) => {
                    return (
                        <Route key={`route${index}`} exact={route.exact} path={route.path} render={route.renderFn}/>
                    );
                })
            }
            </React.Fragment>
        );
    }
}

export default withRouter(App);