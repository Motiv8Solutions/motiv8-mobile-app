import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, div#root {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;