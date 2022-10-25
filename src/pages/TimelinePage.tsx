import React from "react";
import { Layout, Space } from 'antd';
import Timeline from '../components/Timeline';
import { Content } from "antd/lib/layout/layout";
import SettingContainer from "../components/SettingsContainer";

const TimelinePage: React.FC = () => {
    return (
        <Layout style={{ padding: 60 }}>
            <Content>
                <Space size= {86} direction='vertical'> 
                    <SettingContainer />
                    <Timeline />
                </Space>
            </Content>
        </Layout>
    )
}

export default TimelinePage;