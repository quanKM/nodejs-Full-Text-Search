import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import Main from './components/main/Main'
const { Header, Footer, Content } = Layout;

class App extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    Chào mừng bạn đến với ứng dụng của chúng tôi
                </Header>
                <Content>
                    <Main />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}

export default App;
