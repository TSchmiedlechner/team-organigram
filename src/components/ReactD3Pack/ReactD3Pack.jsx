import "./ReactD3Pack.css"
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
var createReactClass = require('create-react-class');

// Taken from https://codepen.io/fabiobiondi/pen/NqyQaM
// TODO: Refactor to ES6 & latest D3

export default createReactClass({

    // React component Mount
    componentDidMount: function () {
        this.initD3();
    },

    // Render
    render: function () {
        return <span></span>
    },

    // React UnMount
    componentWillUnmount: function () {
        clearInterval(this.resizeTimer);
    },


    // ------------------------------
    // D3
    // ------------------------------


    // Init D3 Layout
    initD3: function () {

        // Create SVG elements
        this.vis = d3.select(ReactDOM.findDOMNode(this))
            .insert("svg:svg").append("svg:g")

        this.circlesGroup = this.vis.append("g");
        this.textsGroup = this.vis.append("g");

        // Init pack layout
        this.pack = d3.layout.pack()
            .value(function (d) { return d.size ? d.size : 1; });

        // Update layout and element positions
        this.update();

        // Load data and draw Chart
        this.load(this.props);

        // Click Event Handler (Zoom)
        d3.select(window).on("click", function () {
            this.zoom(this.data);
        }.bind(this));

        //Resize event
        var ns = Math.random()
        d3.select(window).on('resize.' + ns, this.resizeHandler);

    },

    // Update sizes and positions
    update: function () {
        // Set Width, Height and Radius (get size from parent div)
        var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
        var parentWidth = parentNode[0][0].offsetWidth;
        this.w = this.h = this.r = parentWidth

        // Ranges
        this.x = d3.scale.linear().range([0, this.r]);
        this.y = d3.scale.linear().range([0, this.r]);


        // Set Radius
        this.r = (this.w < this.h) ? this.w : this.h;

        // Ranges
        this.x = d3.scale.linear().range([0, this.r]);
        this.y = d3.scale.linear().range([0, this.r]);

        // Set SVG element's size and position
        d3.select(ReactDOM.findDOMNode(this)).select('svg')
            .attr("width", this.w)
            .attr("height", this.h)
            .select('g')
            .attr("transform", "translate(" + (this.w - this.r) / 2 +
                "," + (this.h - this.r) / 2 + ")");


        // Run Pack Layout and update its size
        this.pack.size([this.r, this.r])
        if (this.data) { this.nodes = this.pack.nodes(this.data); }

    },

    // Load JSON
    load: function (props) {
        this.data = props.data
        this.nodes = this.pack.nodes(this.data);
        this.draw(props);
        // d3.json(props.json, function (data) {
        //     console.log(data);
        //     this.data = data;
        //     this.nodes = this.pack.nodes(this.data);
        //     this.draw(props);
        // }.bind(this));
    },

    // D3 Layout (enter-update-exit pattern)
    draw: function (props) {

        var startDelay = props.startDelay || 0,
            elementDelay = props.elementDelay || 50;

        // ---------------------------------------
        // Circles: enter | update | exit
        var circles = this.circlesGroup.selectAll("circle")
            .data(this.nodes);

        // Enter
        circles.enter().append("svg:circle")
            .attr("class", function (d) {
                var cls = d.children ? "parent" : "child";
                if (d.isTeamOwner) cls += " team-owner";
                if (d.isProductOwner) cls += " product-owner";
                return cls;
            })
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", function (d) { return 0 })
            .on("click", function (d) {
                return this.zoom(this.data == d ? this.data : d);
            }.bind(this))
            .transition().duration(400)


        // Update
        circles.transition().duration(400)

            .delay(function (d, i) {
                return startDelay + (i * elementDelay);
            })
            .attr("class", function (d) {
                var cls = d.children ? "parent" : "child";
                if (d.isTeamOwner) cls += " team-owner";
                if (d.isProductOwner) cls += " product-owner";

                return cls;
            })
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", function (d) { return d.r - 3; })

        // Exit
        circles.exit().transition().duration(200)
            .attr("r", 0)
            .style("opacity", 0)
            .remove();



        // ---------------------------------------
        // Texts: enter | update | exit
        var texts = this.textsGroup
            .selectAll("text")
            .data(this.nodes);

        // Enter
        texts.enter().append("svg:text")
            .style("opacity", 0)
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .transition().duration(400)

        // Update
        texts.transition().duration(400)
            .attr("class", function (d) {
                return d.children ? "parent" : "child";
            })
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .delay(function (d, i) {
                return startDelay + (i * elementDelay);
            })
            .style("opacity", function (d) {
                return d.r > 30 && d.depth < 2 ? 1 : 0;
            })
            .text(function (d) {
                return d.name;
            });
        // Exit
        texts.exit().transition().duration(200)
            .style("opacity", 0)
            .remove();

    },

    // Zoom Layout on a specific area
    zoom: function (dTarget, i) {

        var k = this.r / dTarget.r / 2;
        this.x.domain([dTarget.x - dTarget.r, dTarget.x + dTarget.r]);
        this.y.domain([dTarget.y - dTarget.r, dTarget.y + dTarget.r]);

        var t = this.vis.transition()
            .duration(d3.event.altKey ? 7500 : 750);

        t.selectAll("circle")
            .attr("cx", function (d) { return this.x(d.x); }.bind(this))
            .attr("cy", function (d) { return this.y(d.y); }.bind(this))
            .attr("r", function (d) { return k * d.r - 3; });

        t.selectAll("text")
            .attr("x", function (d) { return this.x(d.x); }.bind(this))
            .attr("y", function (d) { return this.y(d.y); }.bind(this))
            .text(function (d) { return d.name; })
            .style("opacity", function (d) {
                var depth = d.depth - dTarget.depth;
                return d.r > 30 && depth < 2 ? 1 : 0;
            });

        if (this.props.onCircleChanged)
            this.props.onCircleChanged(dTarget.name);

        d3.event.stopPropagation();
    },


    // Resize IDE handler
    resizeHandler: function () {

        clearInterval(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            this.update();
            this.draw(this.props);
        }.bind(this), 200);

    }

});