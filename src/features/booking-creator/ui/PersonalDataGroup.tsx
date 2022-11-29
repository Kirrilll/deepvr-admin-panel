import { Row, Col, Select, Button, Input, Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useMemo } from 'react';
import { PHONE_PICKER_PATH, NAME_PATH } from './OrderCreateForm';
import ADD_ICON from '../../../assets/add.svg';
import useDebounceSearch from '../../../common/hooks/useDebounceSearch';
import ClientMapper from '../../../common/mappers/ClientMapper';
import { LabeledValue } from 'antd/lib/select';
import Client, { ClientValue } from '../../../entities/Client';
import BookingModalService from '../../../services/BookingModalService';

interface PersonalDataGroupProps {
    globalForm: FormInstance,
    client: Client | null
    setClient: (client: Client | null) => void
}

const PersonalDataGroup: React.FC<PersonalDataGroupProps> = ({ globalForm, setClient, client }) => {

    const service = useMemo(() => new BookingModalService(), []);
    const { data,
        isLoading,
        isEmpty,
        debounceFetcher
    } = useDebounceSearch<Client>({ fetchCallback: service.fetchClientsByPhone, timeout: 300 })
    const options = useMemo(() => ClientMapper.clientsToSelector(data), [data]);

    const onChangePhone = (selectedOption: LabeledValue, selectedClient: ClientValue | ClientValue[]) => {
        const currSelectedClient = selectedClient as ClientValue;
        globalForm.setFieldValue(PHONE_PICKER_PATH, selectedOption.value);
        globalForm.setFieldValue(NAME_PATH, currSelectedClient.client.name);
    }

    return (
        <>
            <Form.Item name={PHONE_PICKER_PATH}>
                <Row gutter={[0, 20]} align='middle'>
                    <Col span={12} style={{ marginRight: '20px', height: '45px' }}>
                        <Select
                            showSearch
                            popupClassName={'first-plan-object'}
                            labelInValue
                            onChange={onChangePhone}
                            filterOption={false}
                            loading={isLoading}
                            onSearch={debounceFetcher}
                            className="inverted-select"
                            suffixIcon={<div className="inverted-suffix">suffix</div>}
                            value={globalForm.getFieldValue('phoneSelect')}
                            placeholder="Введите номер телефона"
                            options={options}
                        />
                    </Col>
                    {isEmpty ? <Col span={2}>
                        <div style={{
                            height: '46px',
                            width: '46px'
                        }} className="gradient-border">
                            <Button className="add-btn">
                                <img src={ADD_ICON} />
                            </Button>
                        </div>
                    </Col>
                        : null}
                </Row>
            </Form.Item>
            <Row>
                <Col span={12}>
                    <Form.Item name={NAME_PATH}>
                        <Input
                            placeholder="Имя"
                            bordered={false}
                            className="default-input" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}

export default PersonalDataGroup;