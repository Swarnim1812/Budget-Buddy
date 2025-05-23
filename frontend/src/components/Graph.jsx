import React, { useState, useEffect} from 'react';
import Chart from 'react-apexcharts';

const Graph = (props) => {
  const ProductURL = props.productURL;
  const [GraphData, setGraphData] = useState([]);
  const fetchdata = async () => {
    const data = await fetch("https://budget-buddy-hoki.onrender.com/getcurItem", {
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
    if (GraphData.length !== 0) {
      console.log(GraphData);
      setGraphData(GraphData);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <div className='graph'>
        <Chart
          type="line"
          width={600}
          height={400}
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
              categories: GraphData.map((data) => new Date(data.date).toLocaleDateString())
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}
export default Graph;