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

  const datainc1 = useRef();
  const datainc2 = useRef();

  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 1, y: 0, w: 1, h: 1 },
  ]);

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
    //  GenerateData2();
    //     GenerateData();
    datainc1.current = setInterval(() => {
      GenerateData();
    }, 2000);
    datainc2.current = setInterval(() => {
      GenerateData2();
    }, 2000);
  }, []);

  const stop = (index) => {
    setKey(index);
    setPopup(true);
    index === 0
      ? clearInterval(datainc1.current)
      : clearInterval(datainc2.current);
  };

  const close = () => {
    setPopup(false);
  };

  const input1data = { Data: input1, Opts: opts1 };
  const input2data = { Data: input2, Opts: opts1 };

  localStorage.setItem("Data", JSON.stringify({ input1data, input2data }));

  const data = JSON.parse(localStorage.getItem("Data"));

  const sizeref1 = useRef(null);
  const sizeref2 = useRef(null);
  const [size1, setsize1] = useState({ width: 300, height: 250 });
  const [size2, setsize2] = useState({ width: 300, height: 250 });

  return (
    <>
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
        isResizable={true}
        onResizeStop={(e) => {
          console.log(e);
          setLayout(e);
          setsize1({
            width: sizeref1.current.parentElement.clientWidth,
            height: sizeref1.current.parentElement.clientHeight,
          });
          setsize2({
            width: sizeref2.current.parentElement.clientWidth,
            height: sizeref2.current.parentElement.clientHeight,
          });
        }}
      >
        <GridItemWrapper key="0">
          {/* <FaEdit
            onClick={() => {
              stop(0);
            }}
          /> */}
          <GridItemContent>
            <MyPlot options={opts1} data={input1} />
          </GridItemContent>
        </GridItemWrapper>

        <GridItemWrapper key="1">
          {/* <FaEdit
            onClick={() => {
              stop(1);
            }}
          /> */}
          <GridItemContent>
            <MyPlot options={opts1} data={input2} />
          </GridItemContent>
        </GridItemWrapper>
        {/* {Object.keys(data).map((dataentry, index) => {
          return (
            <GridItemWrapper key={index}>
              <FaEdit
                onClick={() => {
                  stop(index);
                }}
              />
              <GridItemContent>
                <MyPlot
                  options={data[dataentry].Opts}
                  data={data[dataentry].Data}
                />
              </GridItemContent>
            </GridItemWrapper>
          );
        })} */}
      </ResponsiveGridLayout>
      {/* <button onClick={()=>{start()}}>start</button> */}
      {/* <button onClick={()=>{stop()}}>stop</button> */}
      <form className={popup ? "DisplayForm" : "InitialForm"}>
        <label htmlFor="Key">Key </label>{" "}
        <input type="text" value={key} disabled />
        <button
          style={{
            cursor: "pointer",
            background: "red",
            borderRadius: "50%",
            border: "none",
            outline: "none",
          }}
          onClick={close}
        >
          X{" "}
        </button>
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
