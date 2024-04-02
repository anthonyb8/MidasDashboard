import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import './LineChart.css'; // Ensure this file has the required CSS for the chart container

export const LineChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
      const chartOptions = {
        handleScale: {
            axisPressedMouseMove: true
        },
        layout: {
            background: '#263043',
            textColor: '#9e9ea4',
        },
        grid: {
            vertLines: {
                color: '#263043',
            },
            horzLines: {
                color: '#263043',
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,

        },
        priceScale: {
            borderColor: '#263043',
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        timeScale: {
            borderColor: '#263043',
            timeVisible: true,
            secondVisible: false,
            // borderVisible:false
        }
      };

      // Create chart with options
      const chart = createChart(chartContainerRef.current, chartOptions);
      chart.timeScale().fitContent();

      // Create a line series instead of a candlestick series
      const lineSeries = chart.addLineSeries({
        color: '#39495e', // Example color, change as needed
        lineWidth: 2,
        priceFormat: {
          type : "number",
          minMove: 0.01,
          precision: 2,
        }
      });
      
      // Assuming `data` is an array of data points in the format { time: 'YYYY-MM-DD', value: price }
      if (data && data.length > 0) {
        lineSeries.setData(data);
      }

      // Resize observer to adjust chart size on container resize
      const resizeObserver = new ResizeObserver(entries => {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      });

      resizeObserver.observe(chartContainerRef.current);

      return () => {
        resizeObserver.disconnect();
        chart.remove();
      };

  }, [data]); // Re-run effect if `data` changes

  return (
    <React.Fragment>
      <div className="linechart-container" >
            <div ref={chartContainerRef} style={{ 'width': '100%', 'height': '100%'}}> </div>
      </div>   
    </React.Fragment>
  );
};

export default LineChart;

