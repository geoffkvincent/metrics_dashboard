import React from 'react'
import {Card} from 'semantic-ui-react'

const CurrentBuild = ({data}) => (
  <Card color='orange'>
    <Card.Content>
      <Card.Header>Current Build</Card.Header>
      <Card.Description>{data.version}</Card.Description>
    </Card.Content>
  </Card>
)

export default CurrentBuild