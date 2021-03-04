import React from "react";
import "../App.css"
import "./Areas.css"
import * as d3 from "d3"


const attributeMap = require("../data/attributeMap.json")
class BarChart extends React.Component {
    constructor(props) {
        super(props);
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
        console.log(this.props.data)
        const data = this.props.data
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d, i){return d.val})])
            .range([390,0]).nice();
        
        var xScale = d3.scaleBand()
            .domain(d3.sort(data.map(function(d){return d.key})))
            .range([0, 1150])
            .padding(.2)
        
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
            .classed("xAxis", true)
            .attr(
                'transform', 'translate(50,400)'
            )
            .attr('fill', 'red')
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-1em")
            .attr("dy", "-0.5em")
            .attr("transform", "rotate(-90)")
        
        var yAxis = svg.append("g")
            .classed("yAxis", true)
            .attr(
                'transform', 'translate(50, 10)'
            )
            .call(d3.axisLeft(yScale))
        
        
        
        var rectGrp = svg.append("g").attr(
            'transform', 'translate(50, 10)'
        )

        var colors = d3.schemeCategory10;
        
        var index = d3.local()
        rectGrp.selectAll("rect").data(data).enter()
            .append("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", function(d, i) {
                return 0
            })
            .attr("x", function(d, i){
                index.set(this, i)
                return xScale(d.key)
            })
            .attr("y", function(d, i){
                return 390
            })
            .attr("class", "unselected_bar")
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut)
            .transition()
            .ease(d3.easeLinear)
            .duration(600)
            .delay(function(d, i){
                return i*15;
            })
            .attr("y", function(d, i){
                return yScale(d.val)
            })
            .attr("height", function(d, i) {
                return 390-yScale(d.val)
            })

        
        function onMouseOver(d, a) {
            d3.select(this).attr('class', 'selected_bar')

            var i = index.get(this)
            rectGrp.append("text")
            .attr("class", "val")
            .attr("x", function() {
                return xScale(a.key) + (xScale.bandwidth())/2
            })
            .attr("y", function() {
                return yScale(a.val) - 10;
            })
            .text(function(){
                console.log(i)
                return a.val
            })
            .attr("fill", "#82FC6B")
            .attr("font-size", "20")
            .attr("font-family", "Archia")
            .style("backgroud-color", "white")
        }

        function onMouseOut(d, a) {
            d3.select(this).attr('class', 'unselected_bar')
            d3.selectAll(".val")
            .remove()
            .exit()
        }
    }

    changeData = () => {
        const new_data = [12, 31, 22, 17];
        this.setState({data: new_data})
    }
    render() {
        return (
            <div>
                <div className="chartArea">
                    <div className="chartTitle">
                        <text> BARCHART</text>
                    </div>
                    <div className="chartFinal" ref = "chart">

                    </div>
                    <div className="xAxisTitle">
                        <text>{attributeMap[this.props.attr]}</text>
                    </div>

                    <div className="yAxisTitle">
                        <text>No. of Players</text>
                    </div>
                </div>
                <div className="chartData" onClick={this.changeData}>
                    <div className="chartDataTitle">
                         <text>DETAILS</text>
                    </div>
                    <div className="sc-attr1-title">
                        <text class="text1">X-Axis</text>
                        <text class="text2">{attributeMap[this.props.attr]}</text>
                    </div>
                    <div className="sc-attr2-title">
                        <text class="text1">Y-Axis</text>
                        <text class="text2">No. of Players</text>
                    </div>
                    <div className="sc-attr4-title">
                        <text class="text1">Type</text>
                        <text class="text2">Categorical</text>
                    </div>
                    <div className="sc-attr3-title">
                        <text class="text1">Total Categories</text>
                        <text class="text2">{this.props.data.length}</text>
                    </div>
                </div>
            </div>
        )
    }
}

export default BarChart