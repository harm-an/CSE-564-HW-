# CSE 564: Visualization Mini Project #1 [ Khurana, Harmanpreet (113262379)]
## Video Link
https://drive.google.com/file/d/1NM2KkLM2EHR8e-wtu94lM8XBrygkzmb9/view?usp=sharing
## Requirement
This mini project asked to implement three type of Data Visualizations, namely Scatter Plot, Bar Chart and a Histogram with the following properties:

**Bar Chart** 
- For Categorical Variables
- Highlight the bar and display its value on top

**Histogram**
 - For Numerical Variables
 - Highlight the bar and display its value on top
 - Left drag of mouse should decrease the bin size (increase no. of bins)
 - Right drag of mouse should increase the bin size (decrease no. of bins)

**Scatter Plot**
 - Select two variables and plot a graph between them
 - Use Radio button to choose the axes among the two variables

Also, a menu should allow user to choose a variable and based on the type of the chosen variable, Bar Chart or Histogram should be displayed.
The dataset can be taken from anywhere.

## Solution

### Data:
NBA 2K21 Player Data was taken from **Kaggle**
The data is about the NBA players with the following attributes and their types:
 - *Name* *(Categorical)*
 - *Jersey* *(Categorical)*
 - *Team* *(Categorical)*
 - *Position* *(Categorical)*
 - *Country* *(Categorical)*
 - *College* *(Categorical)*
 - *Height (in inches)* *(Numerical)*
 - *Height (in meters)* *(Numerical)*
 - *Weight (in LBS)* *(Numerical)*
 - *Weight (in KG)* *(Numerical)*
 - *Salary* *(Numerical)*
 - *Draft Round* *(Numerical)*
 - *Draft Peak* *(Numerical)*
 - *Rating* *(Categorical and Numerical)*
 - *Draft Year* *(Categorical and Numerical)*

Some of the data was cleaned using python. For example, the height in inches was given like "6-7" and was converted into a decimal (6 + (7/12))
Here is a screenshot of the attributes and rows (some).
![Image](https://i.ibb.co/Lxqvvnn/Screenshot-2021-03-02-at-6-37-53-PM.png) 

### Technologies:
 - **d3.js**
All the data visualizations drawn in this project have been done via d3.js
 - **ReactJS**
All the front end tasks have been done using ReactJS
 - **python**
Python is used to clean some of the data

### Working:

##### Home Page
The Home page is a dashboard where you can play around with the type graphs.

On the Top, there is a drop down which lets you choose an attribute and based on its type, it will dispay the Bar Chart or a Histogram.
On the Left, there is button to switch to the Scatter Plot mode, which is explained in the later section
The bottom space defines the data metrics for the project and some "about" information.

![Image](https://i.ibb.co/CKf8c2N/Screenshot-2021-03-02-at-6-52-34-PM.png)


##### Bar Graph
When a Categorical Variable is chosen, for example, Positions in this case, the Bar graph displays the Positions that the players play at (X-axis) and the number of players in each position (on the Y-axis)
**The Green Highlight is done via the mouse pointer and its value is displayed on the top, like asked**. *We can infer from this particular example the most players in the data set play at the G position.*

(The highlight is done in Green Color instead of the red which was asked, to match the theme. I hope that is okay.)

The X Axis text has been rotated to fit some other categories which had larger text.
The right block gives some details about the chart as shown.

![Image](https://i.ibb.co/RPfkfD4/Screenshot-2021-03-02-at-7-06-58-PM.png)

##### Histogram
Now when a Numerical Variable like Ratings, for example, A Histogram is displayed with the defined number of bins. 

**On dragging the mouse, the bins increase/decrease in size which is shown in the video. The number of bins text on the right also updates accordingly.**

**Just like in Bar Chart, the bar here is also highlighted in the same way**

*We can infer from this particular example that there very few players rated above 92*

![Image](https://i.ibb.co/41J5kgT/Screenshot-2021-03-02-at-7-09-18-PM.png)

##### Scatter Plot
On choosing the Scatter Plot button on the left side of the page, a Scatter Plot is displayed.
**The menu on the right helps you configure the plot by choosing the two attributes between which the graph is to be plotted.**
**Also, it lets you choose which attribute to be shown on the X axis (other will go to the Y axis automatically) with the help of a radio button and adjusts the chart accordingly**

In the shown example, we drew the plot between Salaries and Ratings of the players.

*We can see that players with higher ratings tend to have more salaries (which clearly makes sense). Plus the graph is dense at low salaries/ratings and scattered at the high salary/rating ranges since there are very few players with high ratings (as inferred in the histogram example).*

This clearly explains how Data Visualizations help us infer data in an easy way.
![Image](https://i.ibb.co/nkL2GVN/Screenshot-2021-03-02-at-7-15-47-PM.png)

### Code Snippets

##### The Axes and the Grid

The X axis and Y axis are drawn with respect to the input data using d3.js

```javascript
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
```

##### The Bar Chart

To draw the Bar Chart, we create bars i.e append "rect" in based on the incoming data. The placement of the bars depend on the data and corresponding X and Y scales defined above.

```javascript
var rectGrp = svg.append("g").attr(
        'transform', 'translate(50, 10)'
)
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
```

##### Histogram

The drawing of the histogram is very similar to the Bar Chart, but here we have to define the number of bins. The number of bins are dynamic (change on mouse drag but start with some default value). Now, the input data to d3 is updated to take the number of bins into picture and then the X scales and Y scales are created.

```javascript
const data = this.props.data

var bins = this.state.bins;

var binSize = (d3.max(data) - d3.min(data))/bins

var freq = new Array(bins).fill(0)

data.forEach(element => {
    freq[Math.floor((element - d3.min(data))/binSize)]++
});

var ranges = []
var min = d3.min(data)

for (var i = 0; i<bins; i++){
    var end = (+min + +binSize).toFixed(1);
    ranges.push(min)
    min = end
}
ranges.push(min)

var yScale = d3.scaleLinear()
    .domain([0, d3.max(freq)])
    .range([390,0]).nice();

var xScale = d3.scaleBand()
    .domain(ranges)
    .range([0, 1150])
    .padding(0)
```

##### Highlighting the Bars

The "onmouseover" and "onmouseout" events are used to change the CSS of the bars to highlight/unhighlight and to append the value in the svg

```javascript
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
```

##### Increasing/Decreasing the Bin Size
The Bin size is to be changes on "mousedown" and then "mousemove". If the mouse moves right, no. of bins are decreased (bin size increases). And when it moves left, no. of bins increase. So we need to maintain the X coordinate of the pointer to find the direction and a bool to only change if the mouse move is done on a clicked mouse

```javascript
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
                    xDown = xNow
                }
                
            }else if(xNow - xDown > 10){
                if (oldBins>2){
                    this.setState({bins: oldBins-1})
                    xDown = xNow
                }
            }
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
```
##### Scatter Plot

This takes two data as input and draws circles instead of rectangles. So, the center of the circle depends on the x and y scales defined.

```javascript
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
```


## Setup

To set up and run the project, you need to install node and npm.
Once installed, go inside the project directory and simply run:

```bash
npm start
```
