import React from 'react'
import Device from './Device'
import {Card} from 'semantic-ui-react'

class DeviceStatus extends React.Component {
    state = {online: [], offline: []};

    updateDeviceStatusHeader(props, state, first) {
        let online = [];
        let offline = [];
        props.devices.map(d => {
            if (d.status === 'online') {
                return online.push(d)
            } else {
                return offline.push(d)
            }
        });
        if (first) {
            this.setState({online: online, offline: offline});
        } else {
            state.online = online;
            state.offline = offline;
        }
    }

    componentDidMount() {
        this.updateDeviceStatusHeader(this.props, this.state, true);
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateDeviceStatusHeader(nextProps, nextState);
    }

    render() {
        const {devices} = this.props;
        const {online, offline} = this.state;
        return (
            <>
                <Card color='orange' style={{width: '400px', maxHeight: '200px', overflow: 'auto'}}>
                    <Card.Content>
                        <Card.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                                Devices
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{color: '#00B352', fontSize: '15px', paddingRight: '5px'}}>
                                    Online: {online.length}
                                </div>
                                <div style={{color: '#f96565', fontSize: '15px'}}>
                                    Offline:{offline.length}
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Content>
                            <Card.Description>
                                {devices.map(device =>
                                    <Device key={device.name} device={device}/>
                                )}
                            </Card.Description>
                        </Card.Content>
                    </Card.Content>
                </Card>
            </>
        )
    }
}

export default DeviceStatus