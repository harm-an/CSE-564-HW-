import React from "react";
import "../App.css"
import "./Areas.css"
import * as d3 from "d3"


const attributeMap = require("../data/attributeMap.json")
class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: 6,
            value: "hey"
        }
    }

    componentDidMount() {
        this.drawChart()
    }

    componentDidUpdate() {
        d3.selectAll(".bar-svg")
        .remove()
        .exit()

        this.drawChart();
    }

    drawChart = () => {
        const data = this.props.data

        var bins = this.state.bins;

        var binSize = (d3.max(data) - d3.min(data))/bins

        var freq = new Array(bins).fill(0)

        data.forEach(element => {
            freq[Math.floor((element - d3.min(data))/binSize)]++
        });

        //console.log(freq)

        var ranges = []
        var min = d3.min(data)

        for (var i = 0; i<bins; i++){
            var end = (+min + +binSize).toFixed(1);
            ranges.push(min)
            min = end
        }
        ranges.push(min)

        //console.log(ranges)

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(freq)])
            .range([390,0]).nice();
        
        var xScale = d3.scaleBand()
            .domain(ranges)
            .range([0, 1150])
            .padding(0)
        
        // var mouseIsDown = false;

        const mouseDownFunc = (event) => {
            var mouseDown = true
            var xDown = event.pageX;

            const mousemove = (e) => {
                var oldBins = this.state.bins
                if (mouseDown){
                    var xNow = e.pageX
                    if (xDown - xNow > 10){
                        if (oldBins<=21){
                            this.setState({bins: oldBins+1})
                            console.log("hello")
                            xDown = xNow
                        }
                        
                    }else if(xNow - xDown > 10){
                        if (oldBins>2){
                            this.setState({bins: oldBins-1})
                            console.log("hello")
                            xDown = xNow
                        }
                    }
                    console.log("hello")
                }
                
            }
            d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup)

            event.preventDefault()

            function mouseup() {
                mouseDown = false
            }
        }
        const svg = d3.select(this.refs.chart)
        .append("svg")
        .classed("bar-svg", true)
        .attr("width", 1200)
        .attr("height", 550)
        .on("mousedown", mouseDownFunc)

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

        var isDown = false;
        
        var mouseX = 0;
        const onMouseMove = (e) => {
            if (isDown){
                //alert("hello")
                var currBins = this.state.bins
                var left = mouseX > e.screenX
                if (currBins >= 1 && !left)
                this.setState({
                    bins: currBins-1
                })

                if (currBins < 20 && left)
                this.setState({
                    bins: currBins+1
                })
            }
        }

        const onMouseDown = (e) => {
            mouseX = e.screenX
            isDown = true;
        }
        var index = d3.local()
        rectGrp.selectAll("rect").data(ranges).enter()
            .append("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", function(d, i) {
                return 0
            })
            .attr("x", function(d, i){
                index.set(this, i)
                return xScale(d)+(xScale.bandwidth())/2
            })
            .attr("y", function(d, i){
                return 390
            })
            .attr("class", "unselected_bar-hist")
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut)
            .transition()
            .ease(d3.easeLinear)
            .duration(600)
            .delay(function(d, i){
                return i*15;
            })
            .attr("y", function(d, i){
                return yScale(freq[i])
            })
            .attr("height", function(d, i) {
                return 390-yScale(freq[i])
            })

        function onMouseOver(d, a) {
            d3.select(this).attr('class', 'selected_bar')
            var i = index.get(this)
            rectGrp.append("text")
            .attr("class", "val")
            .attr("x", function() {
                return xScale(a) + (xScale.bandwidth())/2
            })
            .attr("y", function() {
                return yScale(freq[i]) - 10;
            })
            .text(function(){
                console.log(i)
                return freq[i]
            })
            .attr("fill", "#82FC6B")
            .attr("font-size", "20")
            .attr("font-family", "Archia")

        }

        function onMouseOut(d, a) {
            d3.select(this).attr('class', 'unselected_bar-hist')
            d3.selectAll(".val")
            .remove()
            .exit()
        }

        
    }

    handleChange = (event) => {
        //alert(event.target.value)
        this.setState({value: event.target.value})
    }
    render() {
        return (
            <div>
                <div className="chartArea">
                    <div className="chartTitle">
                        <text>HISTOGRAM</text>
                    </div>
                    <div className="chartFinal" ref = "chart">

                    </div>
                    <div className="xAxisTitleHist">
                        <text>{attributeMap[this.props.attr]}</text>
                    </div>

                    <div className="yAxisTitle">
                        <text>No. of Players</text>
                    </div>
                    
                </div>
                <div className="chartData">
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
                    <div className="sc-attr3-title">
                        <text class="text1">Bins</text>
                        <text class="text2">{this.state.bins}</text>
                    </div>
                    <div className="sc-attr4-title">
                        <text class="text1">Type</text>
                        <text class="text2">Numerical</text>
                    </div>
                </div>
            </div>
        )
    }
}

export default Histogram