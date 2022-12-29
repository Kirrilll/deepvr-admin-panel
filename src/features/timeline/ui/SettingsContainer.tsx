import { Button, Checkbox, Col, Popover, Row, Select } from "antd";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectOptions, selectType } from "../redux/selectors";
import { changeCellView, toggleFixed, toggleShowCanceled, toggleTranspose } from '../redux/slice';
import DateRange from "../../date-picker/ui/DateRange";
import { SettingOutlined } from "@ant-design/icons";
import { Column } from "rc-table";
import { CellContentType } from "../../../entities/Cell";

const { Option } = Select;

const SettingContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const type = useAppSelector(selectType);
    const options = useAppSelector(selectOptions);

    const isTranspose = useMemo(() => type === 'transposed', [type]);
    const isFixed = useMemo(() => options.isFixed, [options.isFixed]);
    const { isShowCanceled } = options;

    const handleTranspose = () => dispatch(toggleTranspose(isTranspose
        ? 'default'
        : 'transposed')
    );
    const handleFixed = () => dispatch(toggleFixed());
    const handleShowCanceled = () => dispatch(toggleShowCanceled());
    const onSelectCellView = (type: string) => dispatch(changeCellView(type as CellContentType))

    return (
        <Row style={{ margin: 0, gap: 8, marginBottom: '60px' }}>

            <DateRange />

            <Select
                onSelect={onSelectCellView}
                style={{ width: '200px', height: '42px' }}
                defaultValue='default' >
                <Option value="default">Обычный</Option>
                <Option value='simplified'>Упрощенный</Option>
                <Option value="simplified-spaced">Упрощенный с телом</Option>
            </Select>


            <Popover
                trigger='click'
                content={
                    <div>
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
                            checked={isShowCanceled}
                            onChange={handleShowCanceled}>
                            Показать отмененные
                        </Checkbox>
                    </div>
                }
            >
                <div style={{
                    height: '46px',
                    width: '46px'
                }}>
                    <Button className="add-btn">
                        <SettingOutlined style={{ fontSize: '30px', color: '#2F80ED' }} />
                    </Button>
                </div>
            </Popover>
        </Row >
    )
}

export default SettingContainer;