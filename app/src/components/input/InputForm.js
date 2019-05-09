import React, { PureComponent } from 'react';
import {Button} from 'antd'
import TextArea from 'antd/lib/input/TextArea'

class InputForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            loading: false
        };
    }

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };
    handleSubmit = () => {
        this.setState({ loading: true });
        this.props.submit(this.state.inputValue)
    };

    render() {
        return (
            <div>
                <TextArea
                    className="input"
                    placeholder="Nhập đoạn văn"
                    rows={25}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <Button
                    type="primary"
                    size="large"
                    className="submit-btn"
                    loading={this.state.loading}
                    onClick={this.handleSubmit}
                >
                    Search
                </Button>
            </div>
        );
    }
}

export default InputForm;
