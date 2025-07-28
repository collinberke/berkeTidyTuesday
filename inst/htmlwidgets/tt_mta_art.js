HTMLWidgets.widget({

  name: 'tt_mta_art',

  type: 'output',

  factory: function(el, width, height) {

    return {

      renderValue: function(x) {
        // Setup: dimensions and margins
        const margin = { top: 70, right: 100, bottom: 70, left: 70}
        const svgWidth = 1000
        const svgHeight = 700
        const innerWidth = svgWidth - margin.left - margin.right;
        const innerHeight = svgHeight - margin.top - margin.bottom;
        const color = d3.scaleOrdinal(["#CD7F32", "#F0EAD6", "#ADD8E6", "#B0C4DE", "#848482"]);

        // Data transformation
        const dataset = HTMLWidgets.dataframeToD3(x.data);
        const groupedData = d3.group(dataset, d => d.name);

        console.log(dataset)
        console.log(d3.min(dataset, d => d.art_date) / 2)
        console.log(groupedData)

        // Scales: x and y
        const xScale = d3.scaleLinear()
            .range([0, innerWidth])
            .domain(d3.extent(dataset, d => d.art_date));

        const yScale = d3.scaleLinear()
            .range([innerHeight, 0])
            .domain([0, d3.max(dataset, d => d.count)]);

        // Setup SVG
        const svg = d3.select(el)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .style("background-color", "black")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Line generator
        const line = d3.line()
           .x(d => xScale(d.art_date))
           .y(d => yScale(d.count))

        // Draw lines
        svg.selectAll(".line")
          .data(groupedData)
          .join("path")
          .attr("fill", "none")
          .attr("stroke", ([key]) => color(key))
          .attr("stroke-width", 3)
          .attr("d", ([, values]) => line(values))

        // Setup axes
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale)
                    .tickFormat(d3.format("d"))
                    .tickSize(14)
            )

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale))

        // Add y-axis label
        svg.append("text")
           .attr("class", "axis-label")
           .attr("transform", `rotate(-90)`)
           .attr("x", -svgHeight / 2)
           .attr("y", -margin.left + 25)
           .text("Cumulative art pieces");

        // Add labels with emojis
        svg.append("text")
           .attr("class", "plot-label")
           .attr("x", 830)
           .attr("y", 5)
           .text("🧊 Glass");

        svg.append("text")
           .attr("class", "plot-label")
           .attr("x", 830)
           .attr("y", 400)
           .text("🔩 Steel");

        svg.append("text")
           .attr("class", "plot-label")
           .attr("x", 830)
           .attr("y", 420)
           .text("🟤 Bronze");

        svg.append("text")
           .attr("class", "plot-label")
           .attr("x", 830)
           .attr("y", 510)
           .text("🧱 Ceramic");

        svg.append("text")
           .attr("class", "plot-label")
           .attr("x", 830)
           .attr("y", 540)
           .text("🪨 Stone");

        // Add the title and sub-title
        svg.append("text")
           .attr("class", "chart-title")
           .attr("x", margin.left - 115)
           .attr("y", margin.top - 105)
           .text("New York City: Buildings of steel, subways filled with glass art");

        svg.append("text")
           .attr("class", "chart-subtitle")
           .attr("x", margin.left - 115)
           .attr("y", margin.top - 80)
           .text("Metropolitan Transportation Authority's Permanent Art Catalog | 🅶 🆂 🅱️ 🅲 🆂 ");

        // Add the chart caption
        svg.append("text")
           .attr("class", "chart-caption")
           .attr("x", svgWidth - 645)
           .attr("y", svgHeight - 90)
           .text("Source: MTA Permanent Art Catalog | GitHub: collinberke Bluesky: collinberke.bsky.social")

      },

      resize: function(width, height) {

      }

    };
  }
});
