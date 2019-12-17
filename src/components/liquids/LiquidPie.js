import React, { Fragment } from 'react';
import { VictoryPie, VictoryContainer } from 'victory';

export default function LiquidPie(props) {
  console.log(props.data);

  const generatePieData = (data) => {
    let pieData = [];
    for (let count in props.data) {
      if (props.data[count] !== 0) {
        pieData.push({
          x: count.split('C')[0], 
          y: props.data[count], 
          label: count.split('C')[0] + ': '  + props.data[count]
        });
      }
    }

    return pieData;
  }

  return (
    <Fragment>
      {/* PIE CHART */}
      <VictoryPie 
        animate={{
          onLoad: {duration: 1500}
        }}
        labels={['water', 'coffee', 'soda', 'other']}
        labelRadius={90}
        containerComponent={<VictoryContainer maxWidth={'60%'} />}
        style={{
          data: { 
            fillOpacity: 0.7, 
            stroke: '#636363', 
            strokeWidth: 0.1,
            fill: ({ datum }) => 
              datum.x === 'water' ? 'cyan'
              : datum.x === 'coffee' ? 'tan'
              : datum.x === 'soda' ?  'tomato'
              : 'orange'
            ,
          labels: { fontSize: 1 }
        }}}
        height={250}
        data={generatePieData(props.data)}
      />
    </Fragment>
  )
}


