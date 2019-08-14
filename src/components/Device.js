import React from 'react'
import {Accordion, Icon, Item} from 'semantic-ui-react'
import moment from 'moment'

function deviceTypeToIcon(deviceType) {
    switch (deviceType) {
        case 'camera':
            return 'video';
        case 'lock':
            return 'lock';
        case 'switch':
            return 'lightbulb';
        case 'dimmer':
            return 'lightbulb outline';
        case 'garage':
            return 'warehouse';
        case 'thermostat':
            return 'thermometer half';
        default:
            return '';
    }
}

class Device extends React.Component {
    state = {showDeviceContent: false, activeIndex: 0};

    toggleDeviceContent = (e, titleProps, device) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? +1 : index;
        this.refs[`${this.props.device.type}-${this.props.device.name}`].scrollIntoView({inline: 'start', behavior: 'smooth'});
        this.setState({showDeviceContent: !this.state.showDeviceContent, activeIndex: newIndex})
    };

    msToTime(duration) {
        let minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24),
            days = parseInt((duration / (1000 * 60 * 60 * 24)) % 365);

        days = (days < 10) ? "" + days : days;
        hours = (hours < 10) ? "" + hours : hours;
        minutes = (minutes < 10) ? "" + minutes : minutes;

        let time = "";
        if (days > 0) {
            time = days + "d";
        }
        if (hours > 0) {
            time = time + " " + hours + "h";
        }
        if (minutes > 0) {
            time = time + " " + minutes + "m";
        }
        return time;
    }

    event_duration = (last_status_change) => {
        let current_time = new Date().getTime();
        return this.msToTime(current_time - last_status_change)
    };

    render() {
        const {device} = this.props;
        const {showDeviceContent, activeIndex} = this.state;
        return (
            <div ref={`${device.type}-${device.name}`}>
            <Accordion styled >
                <Accordion.Title style={{display: 'flex', justifyContent: 'space-between'}} active={activeIndex === -1} index={-1} onClick={this.toggleDeviceContent}>
                    <div>
                        <Icon name={deviceTypeToIcon(device.type)}/>
                        {device.name}
                    </div>
                    <div style={{color: device.status === 'online' ? 'green' : 'red', display: 'flex', flexDirection: 'row'}}>
                        <div>
                            {`${this.event_duration(device.last_status_change)}`}
                        </div>
                        <div style={{marginLeft: '5px'}}>
                            {device.status === 'online' ?
                                <Icon name='linkify' color='green'/>
                                :
                                <Icon name='unlinkify' color='red'/>
                            }
                        </div>
                    </div>
                </Accordion.Title>
                {showDeviceContent ?
                    <Accordion.Content active={showDeviceContent}>
                        {device.type === "camera" ?
                            <Item.Image key={`${device.name}`} style={{maxWidth: '200px'}} size='medium' src={`data:image/png;base64, ${device.screenshot}`}/>
                            : ''
                        }
                    <div>{`${device.offline_history.length} History Event${device.offline_history.length > 1 || device.offline_history.length === 0 ? 's' : ''}`}
                        <Accordion.Accordion panels={device.offline_history.map(h => {
                            return {key: `${device.name}-${h.dateCreated}`, title: h.event.toUpperCase(), content: moment(h.dateCreated).format("MMM Do YYYY, h:mm:ss a"), className: h.event}
                        })}/>
                    </div>
                    </Accordion.Content>
                    : ''
                }
            </Accordion>
            </div>
        )
    }
}


export default Device