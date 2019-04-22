// Main React application entry point

import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import messages_en from './Locales/en.json';
import messages_it from './Locales/it.json';
import messages_de from './Locales/de.json';
import messages_es from './Locales/es.json';
import en from 'react-intl/locale-data/en';
import it from 'react-intl/locale-data/it';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import AppFrame from './AppFrame';

addLocaleData([...en, ...it, ...de, ...es]);
window.IS_MOCK = true;

const messages = {
    'en': messages_en,
    'it': messages_it,
    'de': messages_de,
    'es': messages_es
};

class App extends React.Component {
    render () {
        let language = 'en-US';
        let locale = 'en';
        // ECMA Internationalization API, get the language
        if (window.Intl && typeof window.Intl === 'object') {
            console.log(`Intl API found, language = ${navigator.language}`);
            language = navigator.language;
        } else {
            console.log('Intl API not supported');
        }
        // get the locale from the language. two characters before the hyphen.
        if (language.indexOf('-') > -1) {
            locale = language.substring(0, language.indexOf('-'));
        }
        console.log(`locale = ${locale}`);
        return (
            <IntlProvider locale={locale} messages={messages[locale]}>
                <AppFrame/>
            </IntlProvider>
        );
    }
}

export default App;