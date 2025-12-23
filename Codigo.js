
//Creacion de renglones de tablas 
const tbody = document.getElementById("tablaBody");

for (let i = 1; i <= 15; i++) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td id="nivelR${i}" name="nivelR${i}" class="input_tabla"></td>

    <td id="dependenciaR${i}" name="dependenciaR${i}" class="input_tabla"></td>

    <td>
      <input name="nombredelEquipoR${i}" class="input_tabla">
    </td>

    <td>
      <input name="cantidadR${i}" class="input_tabla">
    </td>

    <td>
      <input name="marcaR${i}" class="input_tabla">
    </td>

    <td>
      <input name="claveCUCOPR${i}" class="input_tabla">
    </td>

    <td>
      <textarea
        name="justificacionR${i}"
        class="auto-expand input_tabla"
        rows="1"
        style="resize:none;"
      >Justificacion</textarea>
    </td>

    <td>
      <input name="precioR${i}" class="input_tabla">
    </td>

    <td>
      <input name="prioridadR${i}" class="input_tabla">
    </td>
  `;

  tbody.appendChild(tr);
}

// escritura automatica de celdas repetidas

const nivelInput = document.getElementById("nivel");
const dependenciaInput = document.getElementById("dependencia");
// Escuchamos cambios en nombre o apellido
nivelInput.addEventListener("change", generarNivel);
dependenciaInput.addEventListener("change", generarDependencia);


function generarNivel() {
  const valor = nivelInput.value.trim();
  // Selecciona todas las celdas cuyo id empieza con 'nivelR'
  const celdasNivel = document.querySelectorAll("[id^='nivelR']");
  celdasNivel.forEach(celda => celda.textContent = valor);
}

function generarDependencia() {
  const valor = dependenciaInput.value.trim();
  const celdasDep = document.querySelectorAll("[id^='dependenciaR']");
  celdasDep.forEach(celda => celda.textContent = valor);
}

const textareas = document.querySelectorAll(".auto-expand");

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

textareas.forEach(textarea => {
  textarea.addEventListener("input", () => autoResize(textarea));

  // Ajusta la altura inicial si ya tiene texto
  autoResize(textarea);
});

//Listas desplegables que dependen de otros valores

const opciones = {
  NMS: ['CET 1 "WALTER CROSS BUCHANAN"',
'CECYT 1 "GONZALO VÁZQUEZ VELA"',
'CECYT 2 "MIGUEL BERNARD"','CENTRO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS (CECYT 3) “ESTANISLAO RAMÍREZ RUIZ”',
'CECYT 4 “LÁZARO CÁRDENAS”',
'CECYT 5 “BENITO JUÁREZ”',
'CECYT 6 “MIGUEL OTHÓN DE MENDIZÁBAL”',
'CECYT 7 “CUAUHTÉMOC”',
'CECYT 8 “NARCISO BASSOLS”',
'CECYT 9 “JUAN DE DIOS BÁTIZ”',
'CECYT 10 “CARLOS VALLEJO MÁRQUEZ”',
'CECYT 11 “WILFRIDO MASSIEU”',
'CECYT 12 “JOSÉ MARÍA MORELOS”',
'CECYT 13 “RICARDO FLORES MAGÓN”',
'CECYT 14 “LUIS ENRIQUE ERRO”',
'CECYT 15 “DIÓDORO ANTÚNEZ ECHEGARAY”',
'CECYT 16 “HIDALGO”',
'CECYT 17 “LEÓN, GUANAJUATO”',
'CECYT 18 “ZACATECAS”',
'CECYT 19 "LEONA VICARIO"',
'CECYT 20 "NATALIA SERDÁN ALATRISTE"' ],
  NS: ["ESIME", "ESIQUIE", "ESIA","ESIT","ESE","EFM","ENMH","ENEO"],
  ADMIN:["DPO","CGPII","SIIP","SIIS","CENAC"],
  Otros: ["Microscopio", "Reactivos", "Centrífuga"]
};

nivelInput.addEventListener("change", () => {
  const valor = nivelInput.value;

  // Limpiar subcategoría
  dependenciaInput.innerHTML = '<option value="">-- Selecciona --</option>';
  dependenciaInput.disabled = !valor;

  if (!valor || !opciones[valor]) return;

  opciones[valor].forEach(texto => {
    const option = document.createElement("option");
    option.value = texto;
    option.textContent = texto;
    dependenciaInput.appendChild(option);
  });
});

    
    

//Guardado de Datos    
    
 const form = document.getElementById("miFormulario");
 const aviso = document.getElementById("aviso");   
    document.getElementById("miFormulario").addEventListener("submit", function(e){
                e.preventDefault();
                aviso.textContent = " ";
                const data = Object.fromEntries(new FormData(this));
                /*fetch("https://script.google.com/macros/s/AKfycbylJPoK0gXZxnMQzAWlCLGbwMvi7OsMV-rKF3eEpNDSkpbzZ8R6kzFAadKFIonA97Of-Q/exec", {
                                 method: "POST",
                                 body: new FormData(this)
                })*/
                
                 fetch("https://script.google.com/macros/s/AKfycbylJPoK0gXZxnMQzAWlCLGbwMvi7OsMV-rKF3eEpNDSkpbzZ8R6kzFAadKFIonA97Of-Q/exec", {
                  method: "POST",
                  body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
                 if (!res.success) {
                   aviso.textContent = "⚠️ " + res.message;
                   aviso.style.color = "red";
                   return;
                 }
                 aviso.textContent = "✅ Tu respuesta fue enviada correctamente";
                 aviso.style.color = "green";
                 form.reset();
                 alert("Datos enviados correctamente");
                 this.reset();
  })
  .catch(() => alert("Error al enviar"));
});
