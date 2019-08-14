import React from 'react'
import {Button, Form, Item, Message, Modal} from 'semantic-ui-react'
import axios from 'axios';

class SSH extends React.Component {
    state = {open: false};

    open = () => this.setState({open: true});
    close = () => this.setState({open: false});

    render() {
        const {panel} = this.props;
        return (
            <Modal
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
                trigger={<Button size='small' style={{backgroundColor: 'orange', color: 'white'}}>SSH to Panel</Button>}
                style={{width: "80%"}}
            >
                <Modal.Header>SSH</Modal.Header>
                <Modal.Content>
                    <div>
                        <iframe style={{width: "100%", height: "800px"}} src={"/ssh-web-term/host/" + panel.ip}></iframe>
                    </div>
                </Modal.Content>
            </Modal>

        )
    }
}

export default SSH
