import { Popover, Row, Select } from "antd";
import React from "react";
import Arrow_icon from '../assets/arrow.svg';
import { useAppDispatch, useAppSelector } from "../store/store";
import BookingPopover from "./BookingPopover";
import CustomDatePicker from "./CustomDatePicker";
import DateRange from "./DateRange";

const { Option } = Select;

const SettingContainer: React.FC = () => {
    return (
        <Row style={{ margin: 0, gap: 8, marginBottom: '60px' }}>
            <DateRange />
            {/* <Select
                defaultValue='default'
                suffixIcon={<img src={Arrow_icon} />}
            >
                <Option hidden={true} value="default">Игра</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="sd">sfsf</Option>
            </Select> */}
        </Row>
    )
}

export default SettingContainer;