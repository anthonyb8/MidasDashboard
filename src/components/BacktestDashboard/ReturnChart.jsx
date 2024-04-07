import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import './ReturnChart.css';

/**
 * Renders a signal chart that displays trading signals overlaid on price data for different tickers.
 * This component utilizes the lightweight-charts library to render the chart. It groups price data
 * by ticker symbol, displays it as line series on the chart, and marks trading signals on these series
 * according to the signals data provided.
 * 
 * @param {Object} props - The component props.
 * @param {Array<{timestamp: number, return: number}>} props.strategy_data 
 * @param {Array<{timestamp: number, return: number}>} props.benchmark_data
 * 
 * @returns {React.ReactElement} A React component that displays the chart and a legend indicating the tickers present in the chart.
 */
function ReturnChart({ strategy_data, benchmark_data }) {
    const chartContainerRef = useRef(null);

    console.log(strategy_data);
    console.log(benchmark_data);
    useEffect(() => {


        if (!chartContainerRef.current) return;

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

        // Create the legend element
        const legend = document.createElement('div');
        legend.style = `position: absolute; left: 12px; top: 12px; z-index: 1; 
                        font-size: 14px; font-family: sans-serif; line-height: 18px; 
                        font-weight: 300; color: white;`;
        
        // Helper function to format your data for the chart
        const formatDataForChart = (data) => data.map(item => ({
            time: item.time,
            value: item.value,
        }));

        // Strategy Line
        const strategySeries = chart.addLineSeries({
            color: 'rgba(0, 150, 136, 1)', // Example color for strategy
            lineWidth: 2,
        });
        strategySeries.setData(formatDataForChart(strategy_data));

        // Benchmark Line
        const benchmarkSeries = chart.addLineSeries({
            color: 'red', // Example color for benchmark
            lineWidth: 2,
        });
        benchmarkSeries.setData(formatDataForChart(benchmark_data));

        // Update legend with strategy and benchmark labels
        legend.innerHTML = `
            <div style="color: rgba(0, 150, 136, 1);">Strategy</div>
            <div style="color: red;">Benchmark</div>
        `;
        chartContainerRef.current.appendChild(legend);

        // Resize observer to make the chart responsive
        const resizeObserver = new ResizeObserver(entries => {
            if (entries.length > 0) {
                const { width, height } = entries[0].contentRect;
                chart.applyOptions({ width, height });
            }
        });
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            legend.remove();
            chart.remove();
        };
    }, [strategy_data, benchmark_data]);

    return (
        <div className="return-chart-container">
            <div ref={chartContainerRef} style={{'position':'relative','width': '100%', 'height': '100%'}}></div>
        </div>   
    )
}

export default ReturnChart;
