import React from 'react';
import { AppHeader } from 'motiv8-atoms';
import { faBars, faCarrot, faTrophy, faCalculator, faQuestion, faHandsHelping, faSignOutAlt, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';

function action (index, item) {
    console.log(`index shown ${index}, item shown ${item.text}`);
};

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.config = {
            toggle: {
                icon: faBars
            },
            backAction: function () {
                props.history.push('/home');
            },
            menu: [
                {
                    icon: faCarrot,
                    text: 'Programs',
                    back: true,
                    action: function () {
                        props.history.push('/programs');
                    }
                },
                {
                    icon: faTrophy,
                    text: 'Rewards',
                    back: true,
                    action: action
                },
                {
                    icon: faCalculator,
                    text: 'Estimator',
                    back: true,
                    action: action
                },
                {
                    icon: faQuestion,
                    text: 'Disputes',
                    back: true,
                    action: action
                },
                {
                    icon: faHandsHelping,
                    text: 'Help',
                    back: true,
                    action: function () {
                        props.history.push('/contact');
                    }
                },
                {
                    icon: faUserPlus,
                    text: 'Sign up',
                    back: true,
                    action: function () {
                        props.history.push('/signup');
                    }
                },
                {
                    icon: faSignInAlt,
                    text: 'Sign in',
                    back: true,
                    action: function () {
                        props.history.push('/signin');
                    }
                },
                {
                    icon: faSignOutAlt,
                    text: 'Sign out',
                    action: action
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

export default withRouter(Header);