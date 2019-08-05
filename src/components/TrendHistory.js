import React from 'react'
import {Card} from 'semantic-ui-react'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

class TrendHistory extends React.Component {
  state = {
    data: [
      {build: '2843', results: '19000'},
      {build: '2844', results: '13000'},
      {build: '2845', results: '16500'},
      {build: '2846', results: '14250'},
      {build: '2847', results: '19000'}
    ]
  }
  render() {
    return(
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4]}
          tickFormat={this.state.data.map(d =>
            d.build  
          )}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={this.state.data}
          x={this.state.data.map(b => b.build)}
          y={this.state.data.map(r => r.results)}
        />
      </VictoryChart>
      )
    }
  }
  
  export default TrendHistory
  // <Card>
  //   <Card.Content>
  //     <Card.Header>Trend History</Card.Header>
  //   </Card.Content>
  // </Card>