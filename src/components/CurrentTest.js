import React from 'react'
import {Card, Loader} from 'semantic-ui-react'
import TestSummary from './TestSummary'

const CurrentTest = ({data, summary, current_testcase}) => (
  <Card color='orange'>
    {current_testcase ? 
      <Card.Content>
        <Card.Header>
          Current Test
        </Card.Header>
          <Card.Description>
            {current_testcase.name}
          </Card.Description>
        </Card.Content>
        :
      <Card.Content>
        <Card.Header>Test Summary</Card.Header>
        <Card.Description>
          <TestSummary summary={summary}/>
        </Card.Description>
      </Card.Content>
    }
  </Card>
)

export default CurrentTest