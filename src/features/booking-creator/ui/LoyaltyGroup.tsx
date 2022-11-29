import { Row, Col, Input, Button, Checkbox, Slider, Form, Switch } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useMemo, useState } from 'react';
import { PROMOCODE_PATH, IS_USE_BONUSES_PATH, BONUS_PATH, PHONE_PICKER_PATH } from './OrderCreateForm';

interface LoyaltyGroupProps {
    globalForm: FormInstance,
    isIdentified: boolean
}



const LoyaltyGroup: React.FC<LoyaltyGroupProps> = ({ globalForm, isIdentified }) => {

    const [isUsePromocode, setUsePromocode] = useState<boolean>(true);
    const onChangeToggle = (checked: boolean) => setUsePromocode(checked);


    return (
        <div style={{marginTop: '20px'}}>
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
                                <Button className="default-btn">
                                    Применить
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    : <>
                        <div className="creation-form-label">
                            На эту бронь можно потратить не более 600 бонусов из 2300 доступных Бонусных
                        </div>
                        <Row gutter={[20, 20]}>
                            <Col span={12}>
                                <Form.Item name={BONUS_PATH}>
                                    <Input
                                        className="default-input"
                                        bordered={false} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Button className="default-btn">
                                    Применить
                                </Button>
                            </Col>
                        </Row>
                        <Form.Item name={BONUS_PATH}>
                            <Slider
                                className="bonus-slider"
                                tooltip={{ formatter: null }}
                                min={0}
                                max={100}
                            />
                        </Form.Item>
                        <Row justify='space-between'>
                            <div>0</div>
                            <div>100</div>
                        </Row>
                    </>
            }
        </div>
    );
}

export default LoyaltyGroup;