export const Colors = {
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#286484',
    backgroundColor3: '#E9E7E7',
    backgroundBlue: '#E2EFFA',
    backgroundBlueSelected: '#2F79D1',
    graphColor1: '#4897C1',
    graphColor2: '#286484',
    graphColor3: '#0C6A65',
    graphColor4: '#D8D8D8',
    primaryText: '#4A4A4A',
    secondaryText: '#000000',
    alternateText: '#FFFFFF',
    linkText: '#FF7C00',
    textGrey200: '#8E8E94', // rgb(142,142,148)
    borderColor1: '#979797',
    magenta400: '#AB47BC',
    blue400: '#4897C1',
    cyan400: '#28B9B0',
    green400: '#2A7B2A',
    borderGrey300: '#E1E2E3;', // rgb(225, 226, 227)
    borderGrey400: '#EFF0F0', //rgb(239, 240, 240)
    backgroundGrey500: '#F7F8F9;' //rgb(247, 248, 249)
};
export const PrimaryFontFamily = 'Poppins';
export const Fonts = {
    heading1: {
        fontFamily: PrimaryFontFamily,
        fontSize: '4rem',
        fontWeight: 400,
        lineHeight: '5.5rem'
    },
    heading2: {
        fontFamily: PrimaryFontFamily,
        fontSize: '3rem',
        fontWeight: 400,
        lineHeight: '4.25rem'
    },
    heading3: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '2rem'
    },
    heading4: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1.375rem',
        fontWeight: 400,
        lineHeight: '3rem'
    },
    body1: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '1.5rem'
    },
    body2: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1rem'
    },
    body3: {
        fontFamily: PrimaryFontFamily,
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1.5rem'
    },
    body4: {
        fontFamily: PrimaryFontFamily,
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1rem'
    },
    body5: {
        fontFamily: PrimaryFontFamily,
        fontSize: '0.625rem',
        fontWeight: 400,
        lineHeight: '1rem'
    },
    textbox: {
        fontFamily: PrimaryFontFamily,
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1.5rem'
    },
    primaryButton: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1.25rem',
        fontWeight: 400,
        lineHeight: '1.75rem'
    },
    secondaryButton: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1rem'
    },
    linkButton: {
        fontFamily: PrimaryFontFamily,
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '1.5rem'
    }
};
const Theme = {
    colors: Colors,
    primaryFontFamily: PrimaryFontFamily,
    fonts: Fonts
};

export default Theme;