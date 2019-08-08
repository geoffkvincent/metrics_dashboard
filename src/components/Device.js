import React from 'react'
import {Icon, Accordion} from 'semantic-ui-react'
import moment from 'moment'

class Device extends React.Component {
  state = { showDeviceContent: false, activeIndex: 0 }

  toggleDeviceContent = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? +1 : index
    this.setState({ showDeviceContent: !this.state.showDeviceContent, activeIndex: newIndex })
  }

  msToTime(duration) {
    let seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24)
        , days = parseInt((duration/(1000*60*60*24))%365);

    days = (days < 10) ? "" + days : days;
    hours = (hours < 10) ? "" + hours : hours;
    minutes = (minutes < 10) ? "" + minutes : minutes;
    seconds = (seconds < 10) ? "" + seconds : seconds;

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
    if (seconds > 0) {
        time = time + " " + seconds + "s";
    }
    return time;
}

  event_duration = (last_status_change) => {
    let current_time = new Date().getTime()
    return this.msToTime(current_time - last_status_change)
  }

  render(){
    const { device } = this.props
    const { showDeviceContent, activeIndex } = this.state
    return(
      <Accordion fluid styled>
        <Accordion.Title style={{ display: 'flex', justifyContent: 'space-between'}} active={activeIndex === -1} index={-1} onClick={this.toggleDeviceContent}>
          <div>
            <Icon name='dropdown'/>
            {device.name}
          </div>
          <div style={{color: device.status === 'online' ? 'green' : 'red', display: 'flex', flexDirection: 'row'}}>
            <div>
              {`${this.event_duration(device.last_status_change)}`}
            </div>
            <div style={{marginLeft: '5px'}}>
              { device.status === 'online' ? 
                <Icon name='linkify' color='green'/> 
                : 
                <Icon name='unlinkify' color='red' /> 
              }
            </div>
          </div>
        </Accordion.Title>
        {showDeviceContent ? 
          device.offline_history.map(h =>
            <ul>
              <li>
              {`${h.event}:   ${moment(h.dateCreated).format("MMM Do YYYY, h:mm:ss a")}`}
              </li>
            </ul>
          )
          : 
          ''
        }
      </Accordion>
    )
  }
}


export default Device