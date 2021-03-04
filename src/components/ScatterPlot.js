import React from "react";
import "../App.css"
import "./Areas.css"
import * as d3 from "d3"
import Select from 'react-select'
import { select } from "d3";

const options = require("../data/categoricalOptions.json")
const attributeMap = require("../data/attributeMap.json")
class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attr1: "weightsLbs",
            attr2: "weightsKg",
            checked: "attr1"
        }
    }

    componentDidMount (){
        this.drawChart()
    }
    componentDidUpdate () {
        //this.drawChart()
        d3.selectAll(".bar-svg")
        .remove()
        .exit()

        this.drawChart();
    }

    drawChart = () =>  {
        var xAttr = this.state.checked

        var xData;
        var yData;
        if (xAttr === "attr1"){
            xData = require("../data/" + this.state.attr1 + ".json");
            yData = require("../data/" + this.state.attr2 + ".json");
        }else {
            xData = require("../data/" + this.state.attr2 + ".json");
            yData = require("../data/" + this.state.attr1 + ".json");
        }
        
        console.log(xData)

        var yScale = d3.scaleLinear()
            .domain([d3.min(yData), d3.max(yData)])
            .range([390,0]).nice();
        
        var xScale = d3.scaleLinear()
        .domain([d3.min(xData), d3.max(xData)])
        .range([0, 1150]).nice();
        
        // var xScale = d3.scaleBand()
        //     .domain(d3.sort(xData))
        //     .range([0, 1150])
        //     .padding(.2)
        
        const svg = d3.select(this.refs.chart)
            .append("svg")
            .classed("bar-svg", true)
            .attr("width", 1200)
            .attr("height", 550)
        
        var grid = svg.append("g")
        .attr("class", "grid")
        .attr(
            'transform', 'translate(50, 10)'
        )
        .call(d3.axisLeft(yScale)
        .tickSize(-(1150))
        .tickFormat("")
        )

        var xAxis = svg.append("g")
            .classed("xAxis-hist", true)
            .attr(
                'transform', 'translate(50,400)'
            )
            .attr('fill', 'red')
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
        
        var yAxis = svg.append("g")
            .classed("yAxis", true)
            .attr(
                'transform', 'translate(50, 10)'
            )
            .call(d3.axisLeft(yScale))
        
        
        
        var scatter = svg.append("g").attr(
            'transform', 'translate(50, 10)'
        )

        scatter.append("g")
        .selectAll("dot")
        .data(xData)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){return xScale(d)})
        .attr("cy", function(d, i){return yScale(yData[i])})
        .transition()
        .ease(d3.easeLinear)
        .duration(0.5)
        .delay(function(d, i){
            return i*1;
        })
        .attr("r", 3)
        .style("fill", "#01F1E4")

        // var colors = d3.schemeCategory10;

        // rectGrp.selectAll("rect").data(data).enter()
        //     .append("rect")
        //     .attr("width", xScale.bandwidth())
        //     .attr("height", function(d, i) {
        //         return 0
        //     })
        //     .attr("x", function(d, i){
        //         return xScale(d.key)
        //     })
        //     .attr("y", function(d, i){
        //         return 390
        //     })
        //     .attr("class", "unselected_bar")
        //     .on("mouseover", onMouseOver)
        //     .on("mouseout", onMouseOut)
        //     .transition()
        //     .ease(d3.easeLinear)
        //     .duration(600)
        //     .delay(function(d, i){
        //         return i*15;
        //     })
        //     .attr("y", function(d, i){
        //         return yScale(d.val)
        //     })
        //     .attr("height", function(d, i) {
        //         return 390-yScale(d.val)
        //     })

        
        // function onMouseOver(d, a) {
        //     d3.select(this).attr('class', 'selected_bar')
        // }

        // function onMouseOut(d, a) {
        //     d3.select(this).attr('class', 'unselected_bar')
        // }
    }

    changeAttr1 = (selected) => {
        //console.log(selected.value)
        this.setState({attr1: selected.value})
        //alert(event.target.val);
    }

    changeAttr2 = (selected) => {
        //console.log(selected.value)
        this.setState({attr2: selected.value})
        //alert(event.target.val);
    }

    changeRadio = (selected) => {
        this.setState({checked: selected.target.value})
        //console.log(selected.target.value)
    }

    render() {
        return (
            <div>
                <div className="chartArea">
                    <div className="chartTitle">
                        <text>SCATTERPLOT</text>
                    </div>
                    <div className="chartFinal" ref = "chart">

                    </div>
                    <div className="xAxisTitleHist">
                        <text>{this.state.checked === "attr1" ? attributeMap[this.state.attr1] : attributeMap[this.state.attr2]}</text>
                    </div>

                    <div className="yAxisTitle">
                        <text>{this.state.checked === "attr1" ? attributeMap[this.state.attr2] : attributeMap[this.state.attr1]}</text>
                    </div>
                </div>
                <div className="chartData" onClick={this.changeData}>
                    <div className="chartDataTitle">
                         <text>CONFIGURATION</text>
                    </div>
                    <div className="sc-attr1-title">
                        <text class="text1">Attribute 1</text>
                        <text class="text2">{attributeMap[this.state.attr1]}</text>
                    </div>

                    <Select 
                        options={options}
                        defaultValue={options[0]} 
                        className = "sc-dropDown1"
                        label="Hello"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                            ...theme.colors,
                            text: 'white',
                            primary25: '#82FC6B',
                            neutral0: '#05050F',
                            },
                        })}
                        styles={
                            {
                                option: provided => ({
                                    ...provided,
                                    color: 'white'
                                }),
                                control: provided => ({
                                    ...provided,
                                    color: 'white'
                                }),
                                focus: provided => ({
                                    ...provided,
                                    color: 'white'

                                })
                            }
                        }
                        onChange={this.changeAttr1}
                    />

                    <div className="sc-attr2-title">
                        <text class="text1">Attribute 2</text>
                        <text class="text2">{attributeMap[this.state.attr2]}</text>
                    </div>
                    <Select 
                        options={options}
                        defaultValue={options[1]} 
                        className = "sc-dropDown2"
                        label="Hello"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                            ...theme.colors,
                            text: 'white',
                            primary25: '#82FC6B',
                            neutral0: '#05050F',
                            },
                        })}
                        styles={
                            {
                                option: provided => ({
                                    ...provided,
                                    color: 'white'
                                }),
                                control: provided => ({
                                    ...provided,
                                    color: 'white'
                                }),
                                focus: provided => ({
                                    ...provided,
                                    color: 'white'

                                })
                            }
                        }
                        onChange={this.changeAttr2}
                    />

                    <div className="sc-radio-title">
                        <text>X-Axis Attribute</text>
                    </div>

                    <div className="sc-radio-container">
                        <input type="radio" value="attr1" checked={this.state.checked === "attr1"} className="radio1" onClick={this.changeRadio}/>
                        <text className="text1">{attributeMap[this.state.attr1]}</text>
                        <input type="radio" value="attr2" checked={this.state.checked === "attr2"} className="radio2" onClick={this.changeRadio}/>
                        <text className="text2">{attributeMap[this.state.attr2]}</text>
                    </div>
                </div>
            </div>
        )
    }
}

export default ScatterPlot