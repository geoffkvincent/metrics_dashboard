import React from 'react'
import {Button, Form, Message, Modal} from 'semantic-ui-react'
import axios from 'axios';

class LogForm extends React.Component {
    state = {email: '', open: false};

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`v1/kv/panel/${this.props.selected_panel.name}/action`, `get-logs ${this.state.email}`)
            .then(this.setState({email: '', open: false}))
    };

    open = () => this.setState({open: true});
    close = () => this.setState({open: false});

    render() {
        return (
            <Modal
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                trigger={<Button size='small' style={{backgroundColor: 'orange', color: 'white'}}>Logs</Button>}
            >
                <Modal.Header>Please enter your email.</Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <Message success header='Form Completed' content="Logs have been sent to your email."/>
                </Form>
            </Modal>

        )
    }
}

export default LogForm
