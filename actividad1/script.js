// Configura el tamaño del lienzo SVG y los márgenes
var margin = { top: 20, right: 30, bottom: 30, left: 40 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Crea el lienzo SVG
var svg = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Datos de ejemplo
var data = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 15 },
    { name: "D", value: 25 },
    { name: "E", value: 30 }
];

// Escala X
var x = d3.scaleBand()
    .domain(data.map(function(d) { return d.name; }))
    .range([0, width])
    .padding(0.1);

// Escala Y
var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .nice()
    .range([height, 0]);

// Crea las barras del gráfico
svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });

// Agrega ejes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));