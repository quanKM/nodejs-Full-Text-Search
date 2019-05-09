import React, { PureComponent } from 'react';
import './main.css';
import InputForm from '../input/InputForm';
import Result from '../result/Result';
import axios from '../../lib/axios';

class Main extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        };
    }

    handleSubmit = val => {
        axios
            .post('tfidf', { form: val })
            .then(data => this.setState({ results: data.data }));
    };

    render() {
        const hasResult = this.state.results.length > 0;

        return (
            <div className="main">
                {hasResult ? (
                    <Result results={this.state.results} />
                ) : (
                    <InputForm submit={this.handleSubmit} />
                )}
            </div>
        );
    }
}

export default Main;
