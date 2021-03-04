import React from "react";
import "../App.css"
import "./BarChart"

import { ReactComponent as BarIcon } from '../icons/bar-chart.svg';
import { ReactComponent as Hist } from '../icons/histo.svg';
import { ReactComponent as Scatter } from '../icons/scatter.svg';
import BarChart from "./BarChart";
import DataDetails from "./DataDetails";
import Histogram from "./Histogram";
import ScatterPlot from "./ScatterPlot"

const categorical = ["countries", "draft_years", "colleges", "draft_peaks", "draft_rounds", "jerseys", "positions", "ratings", "teams"]

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "sc",
        };
    }

    componentDidMount() {
    }
    chartClicked = (text) => {
        //alert(text);
        this.setState({selected:text})
        //alert(text);
    }

    componentDidUpdate() {
        // this.setState({
        //     data: require("../data/" + this.props.attr + ".json")
        // })
    }


    render() {

        var isCategorical = categorical.includes(this.props.attr)
        var data = require("../data/" + this.props.attr + ".json");
        var chart = "hist"
        if (isCategorical){
            chart = "bar"
        }

        var extra = <div className="leftMenu">
                        <div className={this.state.selected === "sc" ? "sc-chart" : "chart"} onClick={this.chartClicked.bind(this, "sc")}>
                            <div className="highlight">
                            
                            </div>
                            <Scatter className = "icon"/>
                        </div>
                        <div className={this.state.selected === "bar" ? "bar-chart" : "chart"} onClick={this.chartClicked.bind(this, "bar")}>
                            <div className="highlight">

                            </div>
                            <BarIcon className = "icon"/>
                        </div>
                        {/* <div className={this.state.selected === "hist" ? "hist-chart" : "chart"} onClick={this.chartClicked.bind(this, "hist")}>
                            <div className="highlight">
                                    
                            </div>
                            <Hist className = "icon" />
                        </div> */}
                    </div>
        
        if (this.state.selected != "sc")
        return (
            <div className="body">
                {extra}
                {chart == "bar" ? <BarChart data={data} attr={this.props.attr}/> : <Histogram data={data} attr={this.props.attr}/>}
                <DataDetails text={this.state.selected}/>
            </div>
        )
        else
        return (
            <div className="body">
                {extra}
                <ScatterPlot data = {data}/>
                <DataDetails text={this.state.selected}/>
            </div>
        )
    }
}

export default Body