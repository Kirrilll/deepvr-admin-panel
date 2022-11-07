import { Checkbox, Row, Select } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleFixed, toggleTranspose } from "../store/timeline-slice/slice";
import DateRange from "./DateRange";

const { Option } = Select;

const SettingContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isFixed, isTranspose } = useAppSelector(state => state.timeLineReducer)


    const handleTranspose = () => dispatch(toggleTranspose(!isTranspose))
    const handleFixed = () => dispatch(toggleFixed());

    return (
        <Row style={{ margin: 0, gap: 8, marginBottom: '60px' }}>
            <DateRange />
            <Checkbox
                checked={isTranspose}
                onChange={handleTranspose}>
                Транспонировать
            </Checkbox>
            <Checkbox
                checked={isFixed}
                onChange={handleFixed}>
                Фиксировано
            </Checkbox>
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