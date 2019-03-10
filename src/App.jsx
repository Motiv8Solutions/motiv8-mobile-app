// Main React application entry point

import React from 'react';
import { Route } from 'react-router-dom';
import routes from './Constants/Routes';
import { IntlProvider, addLocaleData } from 'react-intl';
import messages_en from './Locales/en.json';
import messages_it from './Locales/it.json';
import messages_de from './Locales/de.json';
import messages_es from './Locales/es.json';
import en from 'react-intl/locale-data/en';
import it from 'react-intl/locale-data/it';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';

addLocaleData([...en, ...it, ...de, ...es]);

const messages = {
    'en': messages_en,
    'it': messages_it,
    'de': messages_de,
    'es': messages_es
};

class App extends React.Component {
    render () {
        let locale = 'en';
        return (
            <IntlProvider locale={locale} messages={messages[locale]}>
                <React.Fragment>
                {
                    routes.map((route, index) => {
                        return (
                            <Route key={`route${index}`} exact={route.exact} path={route.path} render={route.renderFn}/>
                        );
                    })
                }
                </React.Fragment>
            </IntlProvider>
        );
    }
}

export default App;