const opts1 = {
  title: "MyPlot",
  width: 800,
  height: 600,
  series: [
    {},
    {
      stroke: "red",
    },
  ],
};

const GenerateData = () => {
  let now = Math.floor(new Date() / 1e3);
  const update1 = [now, now + 60, now + 120, now + 180];
  const update2 = update1.map((data) => {
    return Math.floor(Math.random() * 40);
  });

  return [update1, update2];
};

//  setInterval(GenerateData,2000)


const input1 = { Data: GenerateData(), Opts: opts1 };
const input2 = { Data: GenerateData(), Opts: opts1 };


export default { input2, input1 };


/* eslint-disable no-unused-vars */
// import { Responsive, WidthProvider } from "react-grid-layout";
// import styled from "styled-components";
// import _ from "lodash";
// import data from "./data";
// import MyPlot from "./MyPlot";
// import "./MyPlot.css";
// import { FaEdit } from "react-icons/fa";
// import { useState } from "react";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const layout = [
//   { i: "0", x: 0, y: 0, w: 1, h: 1 },
//   { i: "1", x: 1, y: 0, w: 1, h: 1 },
// ];

// // const layout = Object.keys(data).map((data,index)=>
// // {
// //   return{i:`${index}`,x:index,y:0,w:1,h:1}})

// const GridItemWrapper = styled.div`
//   background: #f5f5f5;
// `;

// const GridItemContent = styled.div`
//   padding: 8px;
// `;

// const Root = styled.div`
//   padding: 16px;
// `;

// const Grid = () => {

//   const [key,setKey]=useState("")
//   const [popup,setPopup]=useState("")

//   console.log(data,"Data")
//   return (
//     <>
//       <Root>
//         <ResponsiveGridLayout
//           layouts={{ lg: layout }}
//           breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//           cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
//           rowHeight={300}
//           width={1000}
//           isResizable={true}
//         >
//           {Object.keys(data).map((dataentry, index) => {
//             return (
//               <GridItemWrapper key={index}>
//                 <FaEdit/>
//                 <GridItemContent>
//                   <MyPlot
//                     options={data[dataentry].Opts}
//                     data={data[dataentry].Data}
//                   />
//                 </GridItemContent>
//               </GridItemWrapper>
//             );
//           })}
//         </ResponsiveGridLayout>
//       </Root>
//     </>
//   );
// };

// export default Grid;
