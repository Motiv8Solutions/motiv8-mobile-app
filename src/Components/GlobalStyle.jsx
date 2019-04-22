import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, div#root, div#appFrame {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: Poppins;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;