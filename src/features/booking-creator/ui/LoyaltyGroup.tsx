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

    const isIdentified = useMemo(() => clientId != null, [clientId]);

    const onPromocodeApply = () =>{
        globalForm.validateFields([PROMOCODE_PATH]);
    }

    return (
        isIdentified
            ? <div style={{ marginTop: '20px' }}>
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
                            name={PROMOCODE_PATH}
                            label={<div className="creation-form-label">Введите промокоды:</div>}
                        >
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Input
                                        className="default-input"
                                        bordered={false} />
                                </Col>
                                <Col span={6}>
                                    <Button onClick={onPromocodeApply} className="default-btn" >
                                        Применить
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        : <BonusGroup />
                }
            </div>
            : null
    );
}

export default LoyaltyGroup;