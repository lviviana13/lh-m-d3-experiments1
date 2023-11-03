// URL del archivo GeoJSON en GitHub
var url = "https://raw.githubusercontent.com/lviviana13/lh-m-d3-experiments1/master/data/localidades-topo.json";


// Crea un lienzo SVG
var svg = d3.select("body").append("svg")


// Define una proyección para el mapa
var projection = d3.geoMercator()
  .scale(1)
  .translate([0, 0]);

// Crea un generador de rutas basado en la proyección
var path = d3.geoPath().projection(projection);

// Carga el archivo GeoJSON
d3.json(url)
  .then(function(data) {
    // Ajusta la escala y la traslación de la proyección para ajustar el mapa
    var bounds = path.bounds(data);
    var width = bounds[1][0] - bounds[0][0];
    var height = bounds[1][1] - bounds[0][1];
    var centerX = (bounds[0][0] + bounds[1][0]) / 2;
    var centerY = (bounds[0][1] + bounds[1][1]) / 2;
    var scale = 0.9 / Math.max(width / svg.attr("width"), height / svg.attr("height"));
    var translate = [svg.attr("width") / 2 - scale * centerX, svg.attr("height") / 2 - scale * centerY];

    projection.scale(scale).translate(translate);

    // Agrega los elementos de ruta al lienzo
    svg.selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "lightblue")
      .style("stroke", "gray");

    // Puedes agregar más estilos y manipulación de datos según tus necesidades.
  })
  .catch(function(error) {
    console.error("Error al cargar el archivo GeoJSON:", error);
  });