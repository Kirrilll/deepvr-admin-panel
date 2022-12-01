import { Row, Col, Input, Button, Checkbox, Slider, Form, Switch } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useMemo, useState } from 'react';
import Client from '../../../entities/Client';
import BonusGroup from './BonusGroup';
import { PROMOCODE_PATH, IS_USE_BONUSES_PATH, BONUS_PATH, PHONE_PICKER_PATH } from './OrderCreateForm';

interface LoyaltyGroupProps {
    globalForm: FormInstance,
    clientId: number | null
}


const LoyaltyGroup: React.FC<LoyaltyGroupProps> = ({ globalForm, clientId }) => {

    const [isUsePromocode, setUsePromocode] = useState<boolean>(true);
    const onChangeToggle = (checked: boolean) => setUsePromocode(checked);



    return (
        <div style={{ marginTop: '20px' }}>
            <Col span={12} >
                <Row justify='space-between' >
                    <div className="creation-form-label" >Лояльность:</div>
                    <Switch
                        className='loyalty-switch'
                        onChange={onChangeToggle}
                        checkedChildren={'Промокод'}
                        unCheckedChildren={'Бонусы'}
                        checked={isUsePromocode}
                    />
                </Row>
            </Col>
            {
                isUsePromocode
                    ? <Form.Item
                        dependencies={[PHONE_PICKER_PATH]}
                        name={PROMOCODE_PATH}
                        label={<div className="creation-form-label">Введите промокоды: {globalForm.getFieldValue(PHONE_PICKER_PATH)}</div>}
                    >
                        <Row gutter={[20, 20]}>
                            <Col span={12}>
                                <Input
                                    className="default-input"
                                    bordered={false} />
                            </Col>
                            <Col span={6}>
                                <Button className="default-btn">
                                    Применить
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    : <BonusGroup />
            }
        </div>
    );
}

export default LoyaltyGroup;