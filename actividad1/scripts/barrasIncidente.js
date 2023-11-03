
// Ancho y alto del gráfico de barras
var width = 600;
var height = 400;

// Crea un lienzo SVG
var svg = d3.select("#barrasIncidente")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Datos del CSV (reemplaza con tus propios datos o URL)
var data = [
    { "TIPO_INCIDENTE": "Dolor Toracico", "COUNT": 5 },
    { "TIPO_INCIDENTE": "Evento Respiratorio", "COUNT": 2 },
    // Agrega más datos aquí
];

// Escala X para los tipos de incidente
var xScale = d3.scaleBand()
    .domain(data.map(function (d) { return d.TIPO_INCIDENTE; }))
    .range([0, width])
    .padding(0.1);

// Escala Y para la cantidad de incidentes
var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.COUNT; })])
    .nice()
    .range([height, 0]);

// Crea las barras
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return xScale(d.TIPO_INCIDENTE); })
    .attr("y", function (d) { return yScale(d.COUNT); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) { return height - yScale(d.COUNT); })
    .attr("fill", "steelblue");

// Agrega ejes X e Y
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

// Etiquetas de los ejes
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Cantidad de Incidentes");
