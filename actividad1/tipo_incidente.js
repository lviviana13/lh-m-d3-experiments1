// Cargar el archivo CSV
d3.csv("linea123.csv")
  .then(data => {
    // Analizar los datos
    const incidentesPorTipo = {};
    const incidentesPorGenero = {};

    data.forEach(row => {
      const tipoIncidente = row["TIPO_INCIDENTE"];
      const genero = row["GENERO"];

      // Contar incidentes por tipo
      if (incidentesPorTipo[tipoIncidente]) {
        incidentesPorTipo[tipoIncidente]++;
      } else {
        incidentesPorTipo[tipoIncidente] = 1;
      }

      // Contar incidentes por género
      if (incidentesPorGenero[genero]) {
        incidentesPorGenero[genero]++;
      } else {
        incidentesPorGenero[genero] = 1;
      }
    });

    // Imprimir los resultados
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Incidentes por Tipo:</h2>";
    for (const tipo in incidentesPorTipo) {
      outputDiv.innerHTML += `${tipo}: ${incidentesPorTipo[tipo]}<br>`;
    }

    outputDiv.innerHTML += "<h2>Incidentes por Género:</h2>";
    for (const genero in incidentesPorGenero) {
      outputDiv.innerHTML += `${genero}: ${incidentesPorGenero[genero]}<br>`;
    }
  })
  .catch(error => {
    console.error("Error al cargar el archivo CSV", error);
  });
