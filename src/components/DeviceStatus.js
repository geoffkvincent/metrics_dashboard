import React from 'react'
import {Card} from 'semantic-ui-react'

class DeviceStatus extends React.Component {
  render() {
    const { devices } = this.props
    return(
      <>
        <Card>
          <Card.Content>
            <Card.Header>Device Status</Card.Header>
            <Card.Content>
              {devices.map(device =>
                <Card.Description key={device.id}>{device.name}</Card.Description> 
              )}
            </Card.Content>
          </Card.Content>
        </Card>
      </>
    )
  }
}

export default DeviceStatus