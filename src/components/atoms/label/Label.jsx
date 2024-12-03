import './styles/label.scss';
import * as React from 'react';
import CN from "classnames";
import { labelTypes } from '../../../constants';

function Label({ type, text }) {

    // Appling relevant style class by checking the "type" prop
    const LabelClasses = CN({
        "label label__header": type === labelTypes.header,
        "label label__topHeader": type === labelTypes.topHeader,
        "label label__topLink": type === labelTypes.topLink,
        "label label__siteLink": type === labelTypes.siteLink,
        "label label__infoTitle": type === labelTypes.infoTitle,
        "label label__infoDesc": type === labelTypes.infoDesc,
        "label label__loginFormTitle": type === labelTypes.loginFormTitle,
        "label label__loginFormDesc": type === labelTypes.loginFormDesc,
        "label label__cardHeader": type === labelTypes.cardHeader,
        "label label__productPrice": type === labelTypes.productPrice,
        "label label__productDesc": type === labelTypes.productDesc,
        "label label__productCategory": type === labelTypes.productCategory,
        "label label__cartListHeader": type === labelTypes.cartListHeader,
        "label label__cartItemTitle": type === labelTypes.cartItemTitle,
        "label label__cartItemPrice": type === labelTypes.cartItemPrice,
        "label label__cartItemSubTotal": type === labelTypes.cartItemSubTotal,
        "label label__cartItemSubTotalPrice": type === labelTypes.cartItemSubTotalPrice,
        "label label__cartItemRemove": type === labelTypes.cartItemRemove,
        "label label__cartTotal": type === labelTypes.cartTotal,
        "label label__cartTotalPrice": type === labelTypes.cartTotalPrice,
    });

    return (
        <div className={LabelClasses}>
           {type ===  labelTypes.productPrice || type ===  labelTypes.cartItemPrice
           || type ===  labelTypes.cartItemSubTotalPrice || type ===  labelTypes.cartTotalPrice
            ? "LKR " : ""} {text}
        </div>
    );
}

export default Label;

