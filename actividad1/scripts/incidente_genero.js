var svg = d3.select("svg"),
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(2,2)"),
    format = d3.format(",d");

var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

d3.csv("https://raw.githubusercontent.com/lviviana13/lh-m-d3-experiments1/master/data/linea123.csv")
  .then(data => {
    // Procesa los datos y calcula las cantidades
    const processedData = processData(data);

    // Construye la estructura del objeto JSON
    const result = buildJSONStructure(processedData);

    console.log(result);

    ///imprimir circulos
        // Define el tamaño y margen del lienzo SVG
var width = 500;
var height = 500;
var margin = 10;

// Crea un lienzo SVG
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// Añade un grupo (g) para los elementos de los círculos
var g = svg.append("g");

// Define la jerarquía de datos utilizando la estructura 'result'
var root = d3.hierarchy(result)
  .sum(function(d) { return d.size; })
  .sort(function(a, b) { return b.value - a.value; });

// Calcula el embalaje de los datos
var pack = d3.pack()
  .size([width - margin, height - margin])
  .padding(2);

root = pack(root);

// Crea una selección para los nodos
var node = g.selectAll(".node")
  .data(root.descendants())
  .enter().append("g")
  .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

// Añade un título a los nodos
node.append("title")
  .text(function(d) { return d.data.name + "\n" + d.value; });

// Añade círculos a los nodos
node.append("circle")
  .attr("r", function(d) { return d.r; });

// Filtra los nodos hoja y agrega etiquetas de texto
node.filter(function(d) { return !d.children; }).append("text")
  .attr("dy", "0.3em")
  .text(function(d) { return d.data.name.substring(0, d.r / 1.1); });



  })
  .catch(error => {
    console.error("Error al cargar el archivo CSV:", error);
  });

// Función para procesar los datos y calcular las cantidades
function processData(data) {
  const processedData = {};

  data.forEach(row => {
    const tipoIncidente = row.TIPO_INCIDENTE;
    const genero = row.GENERO;
    
    if (!processedData[tipoIncidente]) {
      processedData[tipoIncidente] = {};
    }

    if (!processedData[tipoIncidente][genero]) {
      processedData[tipoIncidente][genero] = 0;
    }

    processedData[tipoIncidente][genero]++;
  });

  return processedData;

}

// Función para construir la estructura del objeto JSON
function buildJSONStructure(data) {
  const result = {
    name: "flare",
    children: []
  };

  for (const tipoIncidente in data) {
    const tipoIncidenteObject = {
      name: tipoIncidente,
      children: []
    };

    for (const genero in data[tipoIncidente]) {
      const generoObject = {
        name: genero,
        size: data[tipoIncidente][genero]
      };

      tipoIncidenteObject.children.push(generoObject);
    }

    result.children.push(tipoIncidenteObject);
  }

  return result;
}
