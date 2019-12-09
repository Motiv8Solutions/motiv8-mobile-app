import Button from './Button';
import * as renderer from 'react-test-renderer';
import * as React from 'react';

test('Button test', () => {
    const component = renderer.create(
        <Button/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});