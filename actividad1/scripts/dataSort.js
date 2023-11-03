data = d3.csv("https://raw.githubusercontent.com/lviviana13/lh-m-d3-experiments1/master/data/linea123.csv")
    .then(databasic => {
        // Procesa los datos y calcula las cantidades
        const tipoIncidente = getTipoIncidente(databasic);
        // Construye la estructura del objeto JSON
        const data = getTipoIncidente_data(tipoIncidente);
        return data

    })
    .catch(error => {
        console.error("Error al cargar el archivo CSV:", error);
    });

var compareByExpense = function (a, b) {  // <-F
    return a.expense < b.expense ? -1 : 1;
};
var compareByCategory = function (a, b) {  // <-G
    return a.category < b.category ? -1 : 1;
};

function render(data, comparator) {
    d3.select("body").selectAll("div.h-bar") // <-B
        .data(data)
        .enter().append("div")
        .attr("class", "h-bar")
        .append("span");

    d3.select("body").selectAll("div.h-bar") // <-C
        .data(data)
        .exit().remove();

    d3.select("body").selectAll("div.h-bar") // <-D
        .data(data)
        .attr("class", "h-bar")
        .style("width", function (d) {
            return (d.expense * 5) + "px";
        })
        .select("span")
        .text(function (d) {
            return d.category;
        });

    if (comparator)
        d3.select("body")
            .selectAll("div.h-bar")
            .sort(comparator); // <-E
}

function sort(comparator) {
    render(data, comparator);
}

render(data);

// Función para procesar los datos y calcular las cantidades
function getTipoIncidente(data) {
    const processedData = {};

    data.forEach(row => {
        const tipoIncidente = row.TIPO_INCIDENTE;

        if (!processedData[tipoIncidente]) {
            processedData[tipoIncidente] = 0;
        }

        processedData[tipoIncidente]++;
    });

    return processedData;
}

// Función para construir la estructura del objeto JSON
function getTipoIncidente_data(data) {
    const result = []
    for (const tipo in data) {
        const generoObject = {
            expense: data[tipo] / 100,
            category: tipo
        };
        result.push(generoObject);
    }
    return result;
}