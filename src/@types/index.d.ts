interface Window {
    IS_MOCK: boolean;
    Intl: any;
    plugins: any;
}

interface Navigator {
    language: any;
    camera: any;
}

declare var navigator: Navigator;

declare module 'motiv8-atoms';

declare module 'json-logic-js';

declare module 'react-modal';

declare var FingerprintAuth: any;
declare var Camera: any;