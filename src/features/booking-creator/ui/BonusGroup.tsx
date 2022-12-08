import { Button, Col, Form, Input, Row, Slider } from 'antd';
import React from 'react';
import { BONUS_PATH } from './OrderCreateForm';

const BonusGroup: React.FC = () => {
    return (
        <>
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
    )
}

export default BonusGroup;