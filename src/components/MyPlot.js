import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "./MyPlot.css";
import "/node_modules/uplot/dist/uPlot.min.css";

function MyPlot(props) {
  const plotRef = useRef();
  const plotIstanceRef = useRef(null);

  useEffect(() => {
    const uPlotInstance = new uPlot(props.options, props.data, plotRef.current);
    plotIstanceRef.current = uPlotInstance;
    plotIstanceRef.current.setSize({ width: 250, height: 230 });
    plotIstanceRef.current.setScale("y", { min: 0, max: 40 });
    plotIstanceRef.current.setData(props.data);
  }, [props]);
  return (
    <div>
      <div ref={plotRef} className="myPlot" />
    </div>
  );
}

export default MyPlot;
