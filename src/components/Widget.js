/* eslint-disable no-unused-vars */
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import _ from "lodash";
import MyPlot from "./MyPlot";
import { useEffect, useState } from "react";
const ResponsiveGridLayout = WidthProvider(Responsive);

const Grid = () => {
  const GridItemWrapper = styled.div`
    background: white;
    border-radius: 5px;
    box-shadow: 0 5px 23px -17px rgb(0, 132, 255);
  `;

  const GridItemContent = styled.div`
    padding: 8px;
  `;

  const Root = styled.div`
    padding: 16px;
  `;

  const [input1, setInput1] = useState([
    [1663843805, 1663843865, 1663843925, 1663843985],
    [22, 9, 17, 6],
  ]);
  const [input2, setInput2] = useState([
    [1663843805, 1663843865, 1663843925, 1663843985],
    [11, 2, 14, 17],
  ]);

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
    setInterval(() => {
      GenerateData();
    }, 2000);
    setInterval(() => {
      GenerateData2();
    }, 2000);
  }, []);

  // useEffect(() => {
  //   GenerateData2();
  //   GenerateData();
  // }, []);
  console.log(input1, input2);

  const layout = input1?.map((data, index) => {
    return { i: `${index}`, x: index, y: 0, w: 1, h: 1 };
  });

  return (
    <>
      <Root>
        <ResponsiveGridLayout
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
          rowHeight={300}
          width={1000}
          isResizable={true}
        >
          <GridItemWrapper key="0">
            <GridItemContent>
              <MyPlot options={opts1} data={input1} />
            </GridItemContent>
          </GridItemWrapper>

          <GridItemWrapper key="1">
            <GridItemContent>
              <MyPlot options={opts1} data={input2} />
            </GridItemContent>
          </GridItemWrapper>
        </ResponsiveGridLayout>
      </Root>
    </>
  );
};

export default Grid;
