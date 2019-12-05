import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import { ThemeProvider } from 'styled-components';
import Theme from './src/Theme';
import GlobalStyle from './src/Components/GlobalStyle';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <React.Fragment>
            <GlobalStyle/>
            <HashRouter>
                <App/>
            </HashRouter>
        </React.Fragment>
    </ThemeProvider>,
    document.getElementById('root')
);