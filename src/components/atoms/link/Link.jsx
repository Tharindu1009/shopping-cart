import './styles/link.scss';
import * as React from 'react';
import Label from '../label/Label';
import VerticalSeperator from '../seperator/VerticalSeperator';

function Link({ labelType, labelText, isSeperator, onClick }) {

    return (
        <div className="link" onClick={onClick}>
            <Label type={labelType} text={labelText}/>
            { isSeperator && <VerticalSeperator/> }
        </div>
    );
}

export default Link;

