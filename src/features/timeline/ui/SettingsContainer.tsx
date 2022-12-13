import { Checkbox, Row, Select } from "antd";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectOptions, selectType } from "../redux/selectors";
import { toggleFixed, toggleShowCanceled, toggleSimpliefied, toggleTranspose } from '../redux/slice';
import DateRange from "../../date-picker/ui/DateRange";

const { Option } = Select;

const SettingContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const type = useAppSelector(selectType);
    const options = useAppSelector(selectOptions);

    const isTranspose = useMemo(() => type === 'transposed', [type]);
    const isFixed = useMemo(() => options.isFixed, [options.isFixed]);
    const {isSimpliefied, isShowCanceled} = options;

    const handleTranspose = () => dispatch(toggleTranspose(isTranspose
        ? 'default'
        : 'transposed')
    );
    const handleFixed = () => dispatch(toggleFixed());
    const handleSimpliefied = () => dispatch(toggleSimpliefied());
    const handleShowCanceled = () => dispatch(toggleShowCanceled());

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
            <Checkbox
                checked={isSimpliefied}
                onChange={handleSimpliefied}>
                Упростить
            </Checkbox>
            <Checkbox
                checked={isShowCanceled}
                onChange={handleShowCanceled}>
                Показать отмененные
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