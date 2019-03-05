import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { ThemeProvider } from 'styled-components';
import Theme from './src/Theme';

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <App/>
    </ThemeProvider>,
    document.body
);