import { Row, Select } from "antd";
import React from "react";
import Arrow_icon from '../assets/arrow.svg';
import DateRange from "./DateRange";

const { Option } = Select;

const SettingContainer: React.FC = () => {

    return (
        <Row style={{ margin: 0 }} gutter={[8, 8]}>
            <DateRange></DateRange>
            <Select
                defaultValue='default'
                suffixIcon={<img src={Arrow_icon} />}
            >
                <Option hidden={true} value="default">Игра</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="sd">sfsf</Option>
            </Select>
        </Row>
    )
}

export default SettingContainer;