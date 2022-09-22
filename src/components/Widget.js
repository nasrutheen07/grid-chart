/* eslint-disable no-unused-vars */
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import _ from "lodash";
import data from "./data";
import MyPlot from "./MyPlot";
import "./MyPlot.css";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = 
{lg:[
  { i: "0", x: 0, y: 0, w: 1, h: 1 },
  { i: "1", x: 1, y: 0, w: 1, h: 1 },
],
md:[
  { i: "0", x: 0, y: 0, w: 1, h: 1 },
  { i: "1", x: 1, y: 0, w: 1, h: 1 },
]
};

// const layout = Object.keys(data).map((data,index)=>
// {
//   return{i:`${index}`,x:index,y:0,w:1,h:1}})

const GridItemWrapper = styled.div`
  background: #f5f5f5;
  z-index:0;
`;

const GridItemContent = styled.div`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

const Grid = () => {

  const [key,setKey]=useState("")
  const [popup,setPopup]=useState("")

  return (
    <>
      <Root>
        <ResponsiveGridLayout
          layouts={ layout }
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
          rowHeight={300}
          width={1000}
          isResizable={true}
          isDraggable={true}

        >
          {Object.keys(data).map((dataentry, index) => {
            return (
              

              <GridItemWrapper key={index}>
                <FaEdit onClick={()=>{console.log("BHARAT")}}/>

                <GridItemContent>
                  <MyPlot
                    options={data[dataentry].Opts}
                    data={data[dataentry].Data}
                  />
                </GridItemContent>
              </GridItemWrapper>
              
            );
          })}
        </ResponsiveGridLayout>
      </Root>
    </>
  );
};

export default Grid;
