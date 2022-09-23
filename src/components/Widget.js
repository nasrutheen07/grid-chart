/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import _ from "lodash";
import MyPlot from "./MyPlot";
import "./MyPlot.css";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Grid() {
  const [key, setKey] = useState("");
  const [popup, setPopup] = useState(false);
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);

  const startinc = useRef();
  const stopinc = useRef();

  const layout = [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 1, y: 0, w: 1, h: 1 },
  ];

  const GridItemWrapper = styled.div`
    background: #f5f5f5;
    z-index: 0;
  `;

  const GridItemContent = styled.div`
    padding: 8px;
  `;

  const Root = styled.div`
    padding: 16px;
  `;

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
    const update2 = update1.map(() => {
      return Math.floor(Math.random() * 40);
    });
    setInput1([update1, update2]);
  };

  const GenerateData2 = () => {
    let now = Math.floor(new Date() / 1e3);
    const update1 = [now, now + 60, now + 120, now + 180];
    const update2 = update1.map(() => {
      return Math.floor(Math.random() * 40);
    });
    setInput2([update1, update2]);
  };


  useEffect(() => {
    startinc.current = setInterval(() => {
      GenerateData();
    }, 2000);
    stopinc.current = setInterval(() => {
      GenerateData2();
    }, 2000);
  }, []);

  const stop = (index) => {
    setKey(index);
    setPopup(true);
    clearInterval(startinc.current);
    clearInterval(stopinc.current);
  };

  const input1data = { Data: input1, Opts: opts1 };
  const input2data = { Data: input2, Opts: opts1 };

  localStorage.setItem("Data", JSON.stringify({ input1data, input2data }));

  const data = JSON.parse(localStorage.getItem("Data"));

  return (
    <>
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
        isResizable={true}
        isDraggable={true}
        autoSize={true}
      >
        {Object.keys(data).map((dataentry, index) => {
          return (
            <div key={index}>
              <FaEdit
                onClick={() => {
                  stop(index);
                }}
              />
              <GridItemWrapper>
                <GridItemContent>
                  <MyPlot
                    options={data[dataentry].Opts}
                    data={data[dataentry].Data}
                    isResizable={true}
                  />
                </GridItemContent>
              </GridItemWrapper>
            </div>
          );
        })}
      </ResponsiveGridLayout>
      {/* <button onClick={()=>{start()}}>start</button> */}
      {/* <button onClick={()=>{stop()}}>stop</button> */}
      <form className={popup ? "DisplayForm" : "InitialForm"}>
        <label htmlFor="Key">Key </label>{" "}
        <input type="text" value={key} disabled />
        <br />
        <label htmlFor="Data1">Data1</label> <input name="Data1" type="text" />
        <br />
        <label htmlFor="Data2">Data2</label> <input name="Data2" type="text" />
        <br />
        <label htmlFor="Data3">Data3</label> <input name="Data3" type="text" />
        <br />
        <label htmlFor="Data4">Data4</label> <input name="Data4" type="text" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Grid;
