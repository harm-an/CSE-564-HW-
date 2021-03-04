import React from "react";
import "../App.css"
import "./Areas.css"
import nba from "../images/nba.png"


class DataDetails extends React.Component {
    componentDidMount(){
        console.log(this.props.text)
    }
    render() {
        return (
            <div className="dataDetailsArea">
                <img src={nba} class="nbaImage"/>
                <div className="columnDetails">
                    <text class="text1">Total Attributes</text>
                    <text class="text2">15</text>
                    <text class="text3">9 Categorical and 6 Numerical</text>
                </div>
                <div className="rowDetails">
                    <text class="text1">Total Rows</text>
                    <text class="text2">503</text>
                    <text class="text3">Without Blank Spaces</text>
                </div>
                <div className="about">
                    <text class="text1">About</text>
                    <text class="text2">As a part of the Course CSE 564: Visualization, this mini-project demonstrates 3 types of data visualizations
                                        : Bar Chart, Histogram and Scatter Plot for the NBA 2K21 data. The Scatter Plot is drawn by choosing two attributes and displays the relation between them.
                                        The Bar Chart and the Histogram display the frequency of the values of a particular Categorical and Numerical attribute, respectively.
                    </text>
                    <text class="text3">- Harmanpreet Singh Khurana</text>
                </div>
            </div>
        )
    }
}

export default DataDetails