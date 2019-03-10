import React from 'react';
import { AppHeader } from 'motiv8-atoms';
import { faBars, faHome, faCarrot, faTrophy, faCalculator, faQuestion, faHandsHelping, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.config = {
            toggle: {
                icon: faBars
            },
            menu: [
                { 
                    icon: faHome,
                    text: 'Home' 
                },
                {
                    icon: faCarrot,
                    text: 'Programs'
                },
                {
                    icon: faTrophy,
                    text: 'Rewards'
                },
                {
                    icon: faCalculator,
                    text: 'Estimator'
                },
                {
                    icon: faQuestion,
                    text: 'Disputes'
                },
                {
                    icon: faHandsHelping,
                    text: 'Help'
                },
                {
                    icon: faSignOutAlt,
                    text: 'Sign out'
                }
            ]
        };
    }
    render () {
        return (
            <AppHeader title='Motiv8' avatarText='SA' contextMenuConfig={this.config} />
        );
    }
}

export default Header;