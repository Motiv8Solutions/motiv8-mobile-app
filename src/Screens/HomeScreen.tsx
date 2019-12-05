import * as React from 'react';
import { Card } from 'motiv8-atoms';
import Header from '../Components/Header';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { withRouter } from 'react-router';

/**
 * Displays the content of the Home Screen. This is the first screen shown to the user when they log in.
 */
class HomeScreen extends React.Component<any, any> {
    fuzzyFridaysConfig: any = null;
    denimDaysConfig: any = null;
    constructor (props: any) {
        super(props);
        this.fuzzyFridaysConfig = {
            content: {
                rows: [
                    {
                        columns: [
                            {
                                title: 'Fuzzy Fridays',
                                paragraphs: [
                                    'Add a pair of fuzzy dice to your sales every Friday this month, sell 30 pairs to earn a $20 bonus!',
                                    'Would you like to play?'
                                ]
                            },
                            {
                                image: {
                                    src: 'http://www.acedux.com/assets/product-images/69384/1500.jpg',
                                    width: 96,
                                    height: 116
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                buttons: [
                                    {
                                        type: 'icon-button',
                                        icon: faThumbsUp,
                                        text: 'Count me in!'
                                    },
                                    {
                                        type: 'icon-button',
                                        icon: faThumbsDown,
                                        text: 'Not today'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };

        this.denimDaysConfig = {
            content: {
                rows: [
                    {
                        columns: [
                            {
                                title: 'Denim Days',
                                paragraphs: [
                                    "Women's denim is 50% off this weekend, sell 100 pairs to earn a $50 bonus!"
                                ]
                            },
                            {
                                image: {
                                    src: 'https://www.brighthorizonsne.org/wp-content/uploads/2018/01/BH_DenimDaysLoopLogo2015_LR.png',
                                    width: 88,
                                    height: 112
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                graph: {
                                    type: 'bullet',
                                    measure: 0,
                                    title: '100 Pairs to go'
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }

    render () {
        return (
            <div className={this.props.className}>
                <div className='cardHolder'>
                    <Card className='card' config={this.fuzzyFridaysConfig} template='contest-enter'/>
                    <Card config={this.denimDaysConfig} template='contest-enter'/>
                </div>
            </div>
        );
    }
}

export default styled(withRouter(HomeScreen))`
    div.cardHolder {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: flex-start;
        justify-content: center;
        padding: 16px 12px 16px 12px;

        div.card {
            margin-bottom: 28px;
        }
    }
`;