import { Row, Col, Select, Button, Input, Form, AutoComplete, message } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { PHONE_PICKER_PATH, NAME_PATH, OrderFormState } from './OrderCreateForm';
import ADD_ICON from '../../../assets/add.svg';
import useDebounceSearch from '../../../common/hooks/useDebounceSearch';
import ClientMapper from '../../../common/mappers/ClientMapper';
import Client, { ClientValue, CreatedClient } from '../../../entities/Client';
import BookingModalService from '../../../services/BookingModalService';
import useHotRegister from '../../../common/hooks/useHotRegister';
import { ValidatorHelper } from '../../../common/helpers/ValidatorHelper';

interface PersonalDataGroupProps {
    globalForm: FormInstance,
    setClient: (client: Client | CreatedClient | null) => void,
}

const PersonalDataGroup: React.FC<PersonalDataGroupProps> = ({ globalForm, setClient }) => {
    const service = useMemo(() => new BookingModalService(), []);
    const { data, isEmpty, debounceFetcher } = useDebounceSearch<Client>({ fetchCallback: service.fetchClientsByPhone, timeout: 300 })
    const hotRegister = useHotRegister({
        onError: onHotRegError,
        onSuccessfull: onHotRegSuccessfull
    });
    
    const options = useMemo(() => ClientMapper.clientsToSelector(data), [data]);

    useEffect(() => {
        const phone = globalForm.getFieldValue(PHONE_PICKER_PATH);
        if (Boolean(phone)) {
            service.fetchClientsByPhone(phone).then(client => setPersonalData(client[0]))
        }
    }, [])


    function onHotRegSuccessfull(client: CreatedClient) {
        debounceFetcher(client.phone);
        setPersonalData(client);
        message.success('Клиент успешно зарегистрирован');
    }

    function onHotRegError(error: any) {
        globalForm.validateFields([PHONE_PICKER_PATH, NAME_PATH]);
        message.error('Не удалось зарегистрировать клиента');
    }

    function setPersonalData (client: Client | CreatedClient) {
        globalForm.setFieldValue(PHONE_PICKER_PATH, client.phone);
        globalForm.setFieldValue(NAME_PATH, client.name);
        globalForm.validateFields([PHONE_PICKER_PATH, NAME_PATH]);
        setClient(client);
    }

    const onChangePhone = (selectedOption: string, selectedClient: ClientValue | ClientValue[]) => {
        const currSelectedClient = selectedClient as ClientValue;
        setPersonalData(currSelectedClient.client);
    }


    const onAddBtnClick = () => {
        hotRegister([
            globalForm.getFieldValue(NAME_PATH),
            globalForm.getFieldValue(PHONE_PICKER_PATH)
        ]);
    }

    return (
        <>

            <Row gutter={[0, 20]} align='middle'>
                <Col span={12} style={{ marginRight: '20px' }}>
                    <Form.Item
                        name={PHONE_PICKER_PATH}
                        rules={[
                            { required: true, message: 'Это поле обязательно' },
                            { validator: ValidatorHelper.phoneValidator },
                        ]}
                    >
                        <AutoComplete
                            style={{ height: '46px' }}
                            showSearch
                            popupClassName={'first-plan-object'}
                            autoClearSearchValue={false}
                            onSelect={onChangePhone}
                            filterOption={false}
                            onSearch={debounceFetcher}
                            className="inverted-select"
                            value={globalForm.getFieldValue('phoneSelect')}
                            placeholder="Введите номер телефона"
                            options={options}
                        />
                    </Form.Item>
                </Col>
                {isEmpty ? <Col span={2}>
                    <div style={{
                        height: '46px',
                        width: '46px'
                    }} className="gradient-border">
                        <Button
                            onClick={onAddBtnClick}
                            className="add-btn">
                            <img src={ADD_ICON} />
                        </Button>
                    </div>
                </Col>
                    : null}
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item
                        name={NAME_PATH}
                        rules={[
                            { required: true, message: 'Это поле обязательно' }
                        ]}
                    >
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