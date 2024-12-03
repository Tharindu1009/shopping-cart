import './styles/verticalSeperator.scss';
import * as React from 'react';
import CN from "classnames";

function VerticalSeperator({color}) {

    // Appling relevant style class by checking the "color" prop
    const VerticalSeperatorClasses = CN({
        "vertical-seperator vertical-seperator__dark": color === "black",
        "vertical-seperator": color == undefined
    });

    return (
        <div className={VerticalSeperatorClasses}></div>
    );
}

export default VerticalSeperator;

