import { DatePicker, Row, Select } from "antd";
import React from "react";
import locale from "antd/lib/date-picker/locale/ru_RU";
import Icon from "@ant-design/icons/lib/components/Icon";
import Arrow_icon from '../assets/arrow.svg';

const { RangePicker } = DatePicker;
const { Option } = Select;

const SettingContainer: React.FC = () => {


    return (
        <Row style={{ margin: 0 }} gutter={[8, 8]}>
            <RangePicker
                superNextIcon={null}
                superPrevIcon={null}
                format="DD.MM.YYYY"
                className="range-picker" locale={locale} />
            <Select
                defaultValue='default'
                suffixIcon={<img src={Arrow_icon} />}
            >
                <Option hidden ={true} value="default">Игра</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="sd">sfsf</Option>
            </Select>
        </Row>
    )
}

export default SettingContainer;