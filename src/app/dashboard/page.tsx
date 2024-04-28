"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { SideBar } from '../components/SideBar';

export default function Dashboard() {
    const control = useAnimation();
    const ref = useRef(null);
    const [allGuns, setAllGuns] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8001/product/allProduct', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log('All Products Data:', data.Products.length);  
            setAllGuns(data.Products.length);

            // Aggregate data for pie chart
            const productTypeCounts = data.Products.reduce((acc, product) => {
                acc[product.product_type] = (acc[product.product_type] || 0) + 1;
                return acc;
            }, {});

            const chartData = Object.keys(productTypeCounts).map(type => ({
                name: type,
                value: productTypeCounts[type]
            }));

            setPieData(chartData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8001/product/getFiveMostReviews/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            const newData = data.Products.map(product => ({
                name: product.product_name,
                value: product.reviews_quantity,
                positive: product['positive(%)'],
                negative: product['negative(%)']
            }));
            setBarData(newData);
        })
        .catch(error => {
            console.error('Error fetching review data:', error);
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8001/product/getFiveMostSaled/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            const saledData = data.Products.map(product => ({
                name: product.product_name,
                value: product.saled,
            }));
            setBarData(saledData);
        })
        .catch(error => {
            console.error('Error fetching most saled product data:', error);
        });
    }, []);
    
        
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        control.start("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [control]);

    // Line Chart Options
    const lineChartOptions = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };

    // Bar Chart Options
    const barChartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params) => {
                // params is an array of series elements hovered
                let tooltipContent = [];
                params.forEach((seriesItem) => {
                    const productData = seriesItem.data;
                    tooltipContent.push(
                        `${productData.name}<br/>Reviews: ${productData.value}<br/>Positive: ${productData.positive}%<br/>Negative: ${productData.negative}%`
                    );
                });
                return tooltipContent.join('');
            }
        },
        xAxis: {
            type: 'category',
            data: barData.map(item => item.name),
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: 'Reviews',
            type: 'bar',
            barWidth: '60%',
            data: barData.map(item => ({
                value: item.value, 
                name: item.name, 
                positive: item.positive, 
                negative: item.negative 
            })),
            itemStyle: {
                barBorderRadius: [2, 2, 0, 0],
                color: '#0f172a'
            },
        }]
    };

    const barChartSale = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: barData.map(item => item.name),
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: 'Sales',
            type: 'bar',
            barWidth: '60%',
            data: barData,
            itemStyle: {
                barBorderRadius: [2, 2, 0, 0],
                color: '#0f172a'
            },
        }]
    };
    

    // Pie Chart Options
    const pieChartOptions = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        series: [{
            name: 'Product Type',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    return (
        <div className="w-full h-screen bg-black flex flex-row">
            <SideBar />
            
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="mx-auto  p-4 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50"
            >
                <div>
                    <h1 className="font-thin text-5xl mb-10 translate-y-12">
                        Ours website data
                    </h1>
                </div>
                <div className="flex flex-row w-full mb-8 gap-4 translate-y-5 h-[400px]">
                <ReactECharts option={pieChartOptions} style={{ height: 200, width: '60%' }} className="mt-5" />
                
                
            {/* <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gray-900 rounded-lg shadow-md hover:scale-110 transition-transform duration-300">
                <h2 className="text-white text-lg mb-2">Total Reviews</h2>
                <span className="text-white text-4xl font-bold">100</span>
            </div> */}
            <div className="flex flex-col space-y-5 mt-4">
            <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gray-900 rounded-lg shadow-md hover:scale-110 transition-transform duration-300 w-[300px] h-[40px]">
                <h2 className="text-white text-lg mb-2">Gun Type</h2>
                 <span className="text-white text-4xl font-bold">4</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gray-900 rounded-lg shadow-md hover:scale-110 transition-transform duration-300">
            <h2 className="text-white text-lg mb-2">Total Guns</h2>
                <span className="text-white text-4xl font-bold">{allGuns}</span>
                </div>
            </div>
            </div>
            <div className="grid grid-cols-2 w-full">
                <h1 className="font-thin text-5xl">Most Reviews</h1>
            <h1 className="font-thin text-5xl mb-5">Most Sale</h1></div>
                <div className="flex flex-row w-full">
                    <ReactECharts option={barChartOptions} style={{ height: 400, width: '100%' }} />
                    <ReactECharts option={barChartSale} style={{ height: 400, width: '100%' }} />
                    {/* <ReactECharts option={pieChartOptions} style={{ height: 400, width: '100%' }} /> */}
                </div>
                
            </motion.div>
        </div>
    );
}
