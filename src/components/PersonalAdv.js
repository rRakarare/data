import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell, LineChart, Line, XAxis, Tooltip, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

function Personal() {

    const data = [
        {
            name: "55",
            mta: 2,
            mtavk: [0.1,0.3],
            sek: 1
        },
        {
            name: "55",
            mta: 1,
            mtavk: 0.9,
            sek: 1
        },
        {
            name: "60",
            mta: 1,
            mtavk: 0.5,
            sek: 1
        },
        {
            name: "61",
            mta: 1,
            mtavk: 0.5,
            sek: 1
        },

      ];

    const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
    l 0 -${height}
    l ${width} 0
    l 0 ${height}
    Z`;
    };

    const PersonBar: FunctionComponent<any> = (props: any) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x-width/1.8, y, width, height)} stroke="none" fill={fill} />;
      };

      const FillBar: FunctionComponent<any> = (props: any) => {
        console.log(props);
        const { fill, x, y, width, height, mtavk, mta } = props;

        const dy = height / mta * mtavk[1];
      
        return <path d={getPath(x+width/1.8, y+height-dy, width, dy)} stroke="none" fill={fill} />;
      };

    return (
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="mta"
            fill="rgba(150,20,250,1)"
            shape={<FillBar />}
            stackId="b"
          />
          <Bar
            dataKey="mta"
            shape={<PersonBar />}
            fill="rgba(150,20,250,0.4)"
            stackId="a"
          />

          <Bar
            dataKey="sek"
            shape={<PersonBar />}
            fill="#82ca9d"
            stackId="a"
          />
          
        </BarChart>
      );
}

export default Personal
