import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell, LineChart, Line, XAxis, Tooltip, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

function Personal() {

    const createColor = (list,a) => `rgba(${list[0]},${list[1]},${list[2]},${a})`


    const keys = [
        {
            name: 'mta',
            color: [200,0,0]
        },
        {
            name: 'sek',
            color: [0,200,0]
        },
        {
            name: 'asd',
            color: [0,0,200]
        },
    ]

    const data = [
        {
            name: "55",
            anzahl: {
                mta:2,
                sek:2,
                asd:3,
            },
            vk: {
                mta:[0.2,0.5],
                sek:[0.2,0.5],
                asd:[0.2,0.5,0.6],
            }

        },
        // {
        //     name: "56",
        //     anzahl: {
        //         mta:1,
        //         sek:3
        //     },
        //     vk: {
        //         mta:[0.2,0.5],
        //         sek:[0.2,0.5],
        //     }

        // },
        // {
        //     name: "57",
        //     anzahl: {
        //         mta:2,
        //         sek:2
        //     },
        //     vk: {
        //         mta:[0.2,0.5],
        //         sek:[0.2,0.5],
        //     }

        // },



      ];

    const getPath = (x, y, width, height) => {

    

    return `m 181.76843,295.95889 h 20.84702 v -64.67923 h 19.77795 v -67.35192 h -21.38157 c 0,0 33.46785,-28.98401 25.10089,-43.47601 -14.33972,-24.83713 -71.69862,-24.83713 -86.03834,0 -8.09282,14.01718 24.27848,42.05155 24.27848,42.05155 h -16.26039 v 69.84546 h 20.31248 v 63.07561 z`;
    };

    const getVkPath = (x, y, width, height, vkArray, anzahlPers) => {

    let path = ''

    const oneunit = height / anzahlPers


    vkArray.forEach((item,i) => {

        const newheight = item * oneunit
        let addHeight = 0

        if (i>0) {
            addHeight = oneunit*i
        }
        
        path+=`M${x},${y + height -addHeight}
        l 0 -${newheight}
        l ${width} 0
        l 0 ${newheight}
        Z`
       
    })

    return path
    
    };

    const PersonBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

      const FillBar = (props) => {
        const { fill, x, y, width, height, keyname, vk, anzahl } = props;
        console.log(props);

        const vkArray = vk[keyname]
        const anzahlPers = anzahl[keyname]
      
        return <path d={getVkPath(x, y, width, height, vkArray, anzahlPers)} stroke="none" fill={fill} />;
      };

    const AnzahlBars = keys.map(key => 
        
            <Bar
            dataKey={data=>data.anzahl[key.name]}
            shape={<PersonBar />}
            fill= {createColor(key.color,0.2)}
            stackId="a"
          />
        )

    const FillBars = keys.map(key => 
    
        <Bar
        dataKey={data=>data.anzahl[key.name]}
        shape={<FillBar keyname={key.name} />}
        fill= {createColor(key.color,0.9)}
        stackId="b"
        />
    )
    

    

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
          <YAxis tick={[0,1,2,3,4,5,6]} interval={0} />
          {AnzahlBars}
          {FillBars}
          
        </BarChart>
      );
}

export default Personal
