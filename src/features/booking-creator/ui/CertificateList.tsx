import React from 'react';
import { Button, Col, Form, FormInstance, Input, Row, Tag } from "antd";
import ADD_ICON from '../../../assets/add.svg';
import { QrcodeOutlined } from '@ant-design/icons';
import { useState } from "react";
import form, { FormListFieldData } from 'antd/lib/form';

interface CertificateListProps {
    globalForm: FormInstance
}

const CERTIFACATES_PATH = 'certificates';

type AddListCallback = (defaultValue?: any, insertIndex?: number | undefined) => void
type RemoveListCallback = (index: number | number[]) => void

const CertificatesList: React.FC<CertificateListProps> = ({ globalForm }) => {

    const [certificate, setCertificate] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCertificate(e.currentTarget.value);
    }

    const buildOnPlusClick = (add: AddListCallback) => {
        return (e: React.MouseEvent<HTMLElement, MouseEvent>) => addCertificate(add);
    }

    const addCertificate = (add: AddListCallback) => {
        setCertificate('');
        add(certificate);
    }



    return (
            <Form.List name={CERTIFACATES_PATH}>
                {
                    (fields, { add, remove }) => (
                        <>
                            <Row gutter={[0, 20]} align='middle'>
                                <Col span={12} style={{ marginRight: '20px' }}>
                                    <Form.Item name={'addInput'}>
                                        <Input
                                            value={certificate}
                                            onChange={(e) => setCertificate(e.target.value)}
                                            className="default-input"
                                            bordered={false} />
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{ marginRight: '20px' }}>
                                    <div style={{
                                        height: '46px',
                                        width: '46px'
                                    }} className="gradient-border">
                                        <Button
                                            onClick={buildOnPlusClick(add)}
                                            className="add-btn">
                                            <img src={ADD_ICON} />
                                        </Button>
                                    </div>
                                </Col>
                                <Col span={2}>
                                    <div style={{
                                        height: '46px',
                                        width: '46px'
                                    }} className="gradient-border">
                                        <Button className="add-btn">
                                            <QrcodeOutlined style={{ fontSize: '21px', color: '#2F80ED' }} />
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '20px' }} gutter={[0, 20]}>
                                {
                                    fields.map((field, index) => <Tag
                                        className='certificate-tag'
                                        closable
                                        onClose={(e) => remove(index)}
                                        key={field.key}>
                                        {field.key}
                                    </Tag>)
                                }
                            </Row>
                        </>
                    )
                }
            </Form.List>
    );
}

export default CertificatesList;