import React from 'react'
import Device from './Device'
import { Card } from 'semantic-ui-react'

class DeviceStatus extends React.Component {

  render() {
    const { devices } = this.props
    return(
      <>
        <Card color='orange' style={{width: '400px'}}>
          <Card.Content>
            <Card.Header>Device Status</Card.Header>
            <Card.Content>
              <Card.Description >
                {devices.map(device =>
                  <Device device={device} />
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