// Main React application entry point

import React from 'react';
import { LoginView } from 'motiv8-atoms';

class App extends React.Component {
    render () {
        return (
            <div>
                {/* <h1>Motiv8 Mobile App</h1> */}
                <LoginView/>
            </div>
        );
    }
}

export default App;