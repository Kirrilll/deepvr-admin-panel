import { FormListFieldData, Row } from "antd";
import { BookingCreation } from "../../../entities/OrderCreation";
import REMOVE_ICON from '../../../assets/remove.svg';

interface BookingFormProps {
    booking: FormListFieldData,
    color: string,
    
}


const BookingForm: React.FC<BookingFormProps> = ({booking, color}) => {

    // console.log(booking);

    return (
        <div className="booking-form">
            <div style={{backgroundColor: color}} className="booking-form__header">
                <Row justify='space-between' align='middle'>
                    <div>affs</div>
                    <img src={REMOVE_ICON}/>
                </Row>
            </div>
            <div className="booking-form__wrapper">
                <div>чава</div>
                
            </div>
        </div>
    );
}

export default BookingForm;