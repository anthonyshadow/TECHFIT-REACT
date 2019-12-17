import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryStack, VictoryTheme } from 'victory';
import GenerateBar from './GenerateBar.js';

export default function LiquidBar({ user }) {
  const bars = [];
  
  useEffect(() => {
    if (user !== null) {
      const axiosConfig = {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      };

      axios
        .get(`/api/user-drinks/chart?id=${user.id}`, axiosConfig)
        .then((res) => {
          generateData(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }

  });

  //DATA MANIPULATION
  //GENERATE {x, y} PAIR FOR ALL DAYS
  //x-value is the index of the day
  //x-value should be relative to current time so that the current day is index 7
  //x-value for 7 days ago should be 1

  //y-value is the % of total drinks
  //y-value is calculated from drinkCount / totalDrinkCount
  
  function generateData(serverData) {
    const barData = [];

    for (let j = 0; j < 4; j++) {
      let drinkType;
      switch (j) {
        case 0:
          drinkType = 'waterCount';
          break;
        case 1:
          drinkType = 'coffeeCount';
          break;
        case 2:
          drinkType = 'sodaCount';
          break;
        case 3:
          drinkType = 'otherCount';
          break;
        default:
          drinkType = 'otherCount';
          break;
      }

      for (let i = 0; i < serverData.rows.length; i++) {
        for (let countType in serverData.rows[i]) {
          console.log(countType);
          barData.push(serverData.rows[i][drinkType]);
        }
        
      }

      generateBar(drinkType, barData);
    }

  }

  //CHOOSE BAR COLOR
  function determineColor(drinkType) {
    switch (drinkType) {
      case 'water':
        return 'cyan';

      case 'coffee':
        return 'tan';

      case 'soda':
        return 'tomato';

      default:
        return 'grey'
    }
  }

  function generateBar(drinkType, data) {
    let fillColor = determineColor(drinkType);

  }

  return (
    <Fragment>
      {/* CHART CONTAINER */}
      <VictoryChart 
        height={500}
        width={500}
        theme={VictoryTheme.material}>

        {/* X AXIS */}
        <VictoryAxis crossAxis
          domain={[0, 7]}
          theme={VictoryTheme.material}
          offsetY={50}
          standalone={false}
        />

        {/* Y AXIS */}
        <VictoryAxis dependentAxis crossAxis
          domain={[0, 15]}
          theme={VictoryTheme.material}
          offsetX={50}
          standalone={false}
        />
      
        {/* LINE GRAPH WITH DEFAULT DATA */}
        <VictoryLine />

      </VictoryChart>
    </Fragment>
  )
}