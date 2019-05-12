import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import Main from './components/main/Main'
const { Header, Content } = Layout;

class App extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    Bài tập lớn Hệ Cơ Sở Dữ Liệu Đa Phương Tiện
                </Header>
                <Content>
                    <Main />
                </Content>
            </Layout>
        );
    }
}

export default App;
