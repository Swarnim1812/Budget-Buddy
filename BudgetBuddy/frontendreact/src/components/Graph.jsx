import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
// import { GraphData } from '../db/GraphData';

const Graph = (props) => {
  const ProductURL = props.productURL;
  const [GraphData, setGraphData] = useState([]);
  const fetchdata = async () => {
    const data = await fetch("http://localhost:5000/getcurItem", {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ProductURL,
      })
    });
    const datajson = await data.json();
    console.log(datajson.priceHistory)
    setGraphData(datajson.priceHistory);
  };
  useEffect(() => {
    fetchdata();
    if(GraphData.length!==0){
      console.log(GraphData);
      setGraphData(GraphData);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className='graph'>
        <h1>Line Chart</h1>

        <Chart
          type="line"
          width={600}
          height={300}
          series=
          {[
            {
              name: "Price",
              data: GraphData.map((data) => data.price)
            },
          ]}
          options={{
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: GraphData.map((data) => data.date)
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}

export default Graph;