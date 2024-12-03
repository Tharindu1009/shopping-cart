import './styles/infoCard.scss';
import Label from '../../atoms/label/Label';
import { labelTypes } from '../../../constants';

function InfoCard({imgUrl, title, description}) {

    return (
        <div className='info-card'>
            <img src={imgUrl} alt="info" />
            <div className='info-card-detail'>
                <div className='info-title'>
                    <Label type={labelTypes.infoTitle} text={title}/>
                </div>
                <Label type={labelTypes.infoDesc} text={description}/>
            </div>
        </div>
    );
}

export default InfoCard;