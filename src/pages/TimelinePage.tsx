import React from "react";
import {Layout, Space} from 'antd';
import Timeline from '../components/Timeline';
import { Content } from "antd/lib/layout/layout";
import SettingContainer from "../components/SettingsContainer";
 
const TimelinePage: React.FC = () => {
    return (
        <Layout style={{padding: 60}}> 
            <Content>
                <SettingContainer></SettingContainer>
                <Space/>
                <Timeline></Timeline>
            </Content>
        </Layout>
    )
}

export default TimelinePage;