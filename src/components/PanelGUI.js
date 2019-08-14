import React from 'react'
import {Button, Form, Item, Message, Modal} from 'semantic-ui-react'
import axios from 'axios';

class PanelGUI extends React.Component {
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
                trigger={<Item.Image
                    size='medium'
                    src={`data:image/png;base64, ${panel.screenshot}`}
                    style={{position: 'absolute', zIndex: '2', width: "220px", marginLeft: "40px", marginTop: "20px", cursor: 'pointer'}}
                />}
            >
                <Modal.Header>PANEL GUI</Modal.Header>
                <Modal.Content>
                    <div class={"gui " + panel.hardware}>
                        <iframe height="480" width="800" src={"/novnc/vnc_auto.html?token=" + panel.name}></iframe>
                    </div>
                </Modal.Content>
            </Modal>

        )
    }
}

export default PanelGUI
