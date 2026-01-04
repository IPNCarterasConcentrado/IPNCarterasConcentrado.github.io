
const tbody = document.getElementById("tablaBody");

for (let i = 1; i <= 10; i++) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td id="nivelR${i}" class="input_tabla fijasCol" aria-label="Nivel/Area/Otro"></td>
    
    
    <td id="dependenciaR${i}" class="input_tabla fijasCol" aria-label="Dependencia"></td>
    
    <td>
      <textarea
        name="nombredelEquipoR${i}"
        class="auto-expand input_tabla obligatorio"
        rows="1"
        style="resize:none;"
        aria-label="Nombre del Equipo"
        > </textarea>
    </td>
    
    

    <td class="cantidadCol">

      <input type="number" name="cantidadR${i}" class="input_tabla " aria-label="Cantidad"> </input>  
    
      </td>

    <td>
      <textarea
        name="marcaR${i}"
        class="auto-expand input_tabla"
        rows="1"
        style="resize:none;"
        aria-label="Marca"
        > </textarea>
      </td>

    <td>
      
      <input type="number" name="claveCUCOPR${i}" class="input_tabla" aria-label="Clave CUCOP"> </input>

      </td>



    <td>
      <textarea
        name="especificacionesR${i}"
        class="auto-expand input_tabla"
        rows="1"
        style="resize:none;"
        aria-label="Especificaciones"
        > </textarea>
    </td>

    <td>
      <select id="justificacionR${i}" name="justificacionR${i}" class="tabla_select" aria-label="Justificación">
                   <option value="">-- Selecciona una prioridad--</option>
                   <option value="Equipo no Existente">Equipo no Existente</option>
                   <option value="Sustitución">Sustitución</option>
                   <option value="Complemento">Complemento</option>
      </select>
    </td>

    
    
     <td>

      <input type="text"
             name="precioR${i}"
             class="input_tabla precio"
             inputmode="decimal" 
             aria-label="Precio"> </input>

      </td>
    
    <td>
      <select id="prioridadR${i}" name="prioridadR${i}" placeholder="   " class="tabla_select" aria-label="Prioridad">
                   <option value="">-- Selecciona una prioridad--</option>
                   <option value="Baja">Baja</option>
                   <option value="Media">Media</option>
                   <option value="Alta">Alta</option>
                   <option value="Urgente">Urgente</option> 
      </select>
    </td>

  `;

  tbody.appendChild(tr);
}


// escritura automatica de celdas repetidas
const secretariaInput = document.getElementById("secretaria");
const direccionInput = document.getElementById("direccion");
const nivelInput = document.getElementById("nivel");
const dependenciaInput = document.getElementById("dependencia");

document.getElementById("tablaBody").addEventListener("change", e => {
  if (!e.target.name?.startsWith("nombredelEquipoR")) return;

  const filas = document.querySelectorAll("#tablaBody tr");
  const ultimaFila = filas[filas.length - 1];

  if (ultimaFila.contains(e.target)) {
    agregarFila();
  }
});
// Escuchamos cambios en nombre o apellido
nivelInput.addEventListener("change", generarNivel);
dependenciaInput.addEventListener("change", generarDependencia);


function generarNivel() {
  const select = nivelInput;
  const texto = select.options[select.selectedIndex].text;

  const celdasNivel = document.querySelectorAll("[id^='nivelR']");
  celdasNivel.forEach(celda => {
    celda.textContent = texto;
  });
}
function generarDependencia() {
  const valor = dependenciaInput.value.trim();
  const celdasDep = document.querySelectorAll("[id^='dependenciaR']");
  celdasDep.forEach(celda => celda.textContent = valor);
}

// Ajuste automatico de celdas con mucho texto

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


const secretarias={

//    SSE:[{text:"Nivel Medio Superior", value:"NMS"} ,{text:"Nivel Superior",value:"NS"}],
    
    SG:[{text:"Dirección de Difusión Cultural",value:"DDC_SG"},
        {text:"Coordinación Politécnica para la Sustentabilidad",value:"CPPS"},
        {text:"Secretaría General",value:"SG"}],
    DG:[{text:"Dirección General", value:"DG"},
        {text:"Coordinación de Imagen Institucional", value:"CII"},
        {text:"Coordinación General de Planeación e Información Institucional", value:"CGPII"},
        {text:"Dirección de Planeación y Organización", value:"DPO"},
        {text:"Dirección de Información Institucional", value:"DII"},
        {text:"Dirección de Cómputo y Comunicaciones", value:"DCC"},
        {text:"Dirección de Sistemas Informáticos", value:"DSI"}],
    
    AG:[{text:"Oficina del Abogado General",value:"AG"}],

    PD:[{text:"Presidencia del Decanato", value:"PD"},
        {text:"Dirección de Formación en Lenguas Extranjeras", value:"DFLE_PD"},
        {text:"Dirección de Formación e Innovación Educativa", value:"DFIE"},
        {text:"Dirección de Educación Virtual", value:"DEV"}],

    SACAD:[{text:"Dirección de Educación Media Superior", value:"DEMS"},
        {text:"Dirección de Educación Superior", value:"DES"},
        {text:"Dirección de Formación en Lenguas Extranjeras", value:"DFLE_SA"},
        {text:"Secretaría Académica", value:"SACAD"}],
    SADMIN:[{text:"Secretaría de Administración",value:"SA"},
        {text:"Dirección de Capital Humano", value:"DCH"},
        {text:"Dirección de Programación y Presupuesto", value:"DPP"},
        {text:"Dirección de Recursos Financieros", value:"DRF"},
        {text:"Dirección de Recursos Materiales e Infraestructua", value:"DRMI"},
        {text:"Dirección de Servicios Generales", value:"DSG"},
        {text:"Coordinación de Centros de Desarrollo Infantil", value:"CCDI"},
        {text:"Coordinación General del Centro Nacional de Cálculo (CENAC)", value:"CGCENAC"}],
    SIIS:[{text:"Dirección de Vinculación y Desarrollo Regional", value:"DVDR"},
          {text:"Secretaría de Innovación e Integración Social", value:"SIIS"},
          {text:"Dirección de Egresados y Servicio Social", value:"DESS"},
          {text:"Dirección de Relaciones Internacionales", value:"DRI"},
          {text:"Dirección de Servicios Empresariales y Transferencia Tecnológica", value:"DSETT"},
          {text:"Dirección de Incubación de Empresas Tecnológicas", value:"DIET"},
          {text:"Dirección de Prospectiva e Inteligencia Tecnológica Tecnópoli", value:"DPITT"}],
    SIP:[{text:"Dirección de Investigación", value:"DI"},
         {text:"Secretaría de Investigación y Posgrado", value:"SIP"},
         {text:"Dirección de Posgrado", value:"DP"},
         {text:"Dirección de Difusión de Ciencia y Tecnología", value:"DDCT"}],
    SSE:[{text:"Secretaría de Servicios Educativos", value:"SSE"},
         {text:"Dirección de Administración Escolar", value:"DAES"},
         {text:"Dirección de Difusión Cultural", value:"DDC_SE"},
         {text:"Dirección de Actividades Deportivas", value:"DAD"},
         {text:"Dirección de Bibliotecas y Publicaciones", value:"DBP"},
         {text:"Dirección de Apoyos a Estudiantes", value:"DAE"}],    
}





secretariaInput.addEventListener("change", () => {
  const valor = secretariaInput.value;

  // Limpiar subcategoría
  direccionInput.innerHTML = '<option value="">-- Selecciona Direccion--</option>';
  direccionInput.disabled = !valor;

  if (!valor || !secretarias[valor]) return;

  secretarias[valor].forEach(op => {
    const option = document.createElement("option");
    option.value = op.value;
    option.textContent = op.text;
    direccionInput.appendChild(option);
  });
});







const direcciones={
        //Secretaria General
    DDC_SG:[{text:"Administrativo", value:"ADMIN_DDC_SG"}],

    CPPS:[{text:"Administrativo", value:"ADMIN_CPPS_SG"} ],

    SG:[{text:"Administrativo", value:"ADMIN_SG_SG"}],

//Direccion General
    DG:[{text:"Administrativo", value:"ADMIN_DG_DG"}],

    CII:[{text:"Administrativo", value:"ADMIN_CII_DG"}],

    CGPII:[{text:"Administrativo", value:"ADMIN_CGPII_DG"}],

    DPO:[{text:"Administrativo", value:"ADMIN_DPO_DG"}],

    DII:[{text:"Administrativo", value:"ADMIN_DII_DG"}],

    DCC:[{text:"Administrativo", value:"ADMIN_DCC_DG"}],

    DSI:[{text:"Administrativo", value:"ADMIN_DSI_DG"}],
//Abogado General
    AG:[{text:"Administrativo", value:"ADMIN_AG_AG"}],
//Presidencia del Decanato
    PD:[{text:"Administrativo", value:"ADMIN_PD_PD"}],

    DFLE_PD:[{text:"Administrativo", value:"ADMIN_DFLE_PD"}],

    DFIE:[{text:"Administrativo", value:"ADMIN_DFIE_PD"}],

    DEV:[{text:"Administrativo", value:"ADMIN_DEV_PD"}],

//Secretaria Academica 
   
    DEMS:[{text:"Nivel Medio Superior", value:"NMS"},{text:"Administrativo", value:"ADMIN_NMS"}],

    DES:[{text:"Nivel Superior y Posgrado", value:"NS"},{text:"Administrativo", value:"ADMIN_NS"}],

    DFLE_SA:[{text:"Lenguas", value:"L_DFLE_SA"}],

    SACAD:[{text:"Administrativo", value:"ADMIN_SACAD_SACAD"}],
//Secretaria Administrativa
    SA:[{text:"Administrativo", value:"ADMIN_SA_SA"}],
    
    DCH:[{text:"Administrativo", value:"ADMIN_DCH_SA"}],
    
    DPP:[{text:"Administrativo", value:"ADMIN_DPP_SA"}],
    
    DRF:[{text:"Administrativo", value:"ADMIN_DRF_SA"}],
    
    DRMI:[{text:"Administrativo", value:"ADMIN_DRMI_SA"}],
    
    DSG:[{text:"Administrativo", value:"ADMIN_DSG_SA"}],
    
    CCDI:[{text:"Administrativo", value:"ADMIN_CCDI_SA"}],
    
    CGCENAC:[{text:"Administrativo", value:"ADMIN_CGCENAC_SA"}],

//Secretaria de Inovacion e Integracion Social

    DVDR:[{text:"Vinculación y Desarrollo", value:"VD"},{text:"Administrativo", value:"ADMIN_DVDR"}],


    SIIS:[{text:"Administrativo", value:"ADMIN_SIIS_SIIS"}],
    
    DESS:[{text:"Administrativo", value:"ADMIN_DESS_SIIS"}],
    
    DRI:[{text:"Administrativo", value:"ADMIN_DRI_SIIS"}],
    
    DSETT:[{text:"Administrativo", value:"ADMIN_DSETT_SIIS"}],
    
    DIET:[{text:"Administrativo", value:"ADMIN_DIET_SIIS"}],
    
    DPITT:[{text:"Administrativo", value:"ADMIN_DPITT_SIIS"}],
//Secretaria sde Investigacion y Posgrado

    DI:[{text:"Investigación", value:"I"},{text:"Administrativo", value:"ADMIN_DI"}],

    SIP:[{text:"Administrativo", value:"ADMIN_SIP_SIP"}],
    
    DP:[{text:"Administrativo", value:"ADMIN_DP_SIP"}],
    
    DDCT:[{text:"Administrativo", value:"ADMIN_DDCT_SIP"}],
    
    SSE:[{text:"Administrativo", value:"ADMIN_SSE_SSE"}],
    
    DAES:[{text:"Administrativo", value:"ADMIN_DAES_SSE"}],
    
    DDC_SE:[{text:"Administrativo", value:"ADMIN_DDC_SSE"}],
    
    DAD:[{text:"Administrativo", value:"ADMIN_DAD_SSE"}],
    
    DBP:[{text:"Administrativo", value:"ADMIN_DBP_SSE"}],
    
    DAE:[{text:"Administrativo", value:"ADMIN_DAE_SSE"}],

}    

direccionInput.addEventListener("change", () => {
  const valor = direccionInput.value;

  // Limpiar subcategoría
  nivelInput.innerHTML = '<option value="">-- Selecciona Nivel--</option>';
  nivelInput.disabled = !valor;

  if (!valor || !direcciones[valor]) return;

  direcciones[valor].forEach(op => {
    const option = document.createElement("option");
    option.value = op.value;
    option.textContent = op.text;
    nivelInput.appendChild(option);
  });
});









const opciones = {
//Secretaria General
ADMIN_DDC_SG:["Estación de Radiodifusión Radio IPN XHIPN-FM 95.7 MHZ."],
ADMIN_CPPS_SG:["Coordinación Politécnica para la Sustentabilidad", "Unidad Politécnica de Gestión con Perspectiva de Género (UPGPG)", "Defensoría de los Derechos Politécnicos"],
ADMIN_SG_SG:["Secretaría General"],
//Direcion General

ADMIN_DG_DG:["Dirección General"],
ADMIN_CII_DG:["Coordinación de Imagen Institucional"],
ADMIN_CGPII_DG:["Coordinación General de Planeación e Información Institucional"],
ADMIN_DPO_DG:["Dirección de Planeación y Organización"],
ADMIN_DII_DG:["Dirección de Información Institucional"],
ADMIN_DCC_DG:["Dirección de Cómputo y Comunicaciones"],
ADMIN_DSI_DG:["Dirección de Sistemas Informáticos"],

//Abogado General
ADMIN_AG_AG:["Oficina del Abogado General"],
//Presidencia del decanato
ADMIN_PD_PD:["Presidencia del Decanato"],
ADMIN_DFLE_PD:["Dirección de Formación en Lenguas Extranjeras"],
ADMIN_DFIE_PD:["Dirección de Formación e Innovación Educativa"],
ADMIN_DEV_PD:["Dirección de Educación Virtual"],
//Secretaria Academica
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
ADMIN_NMS:["Dirección de Educación Media Superior"],
NS:["Escuela Superior de Ingeniería Mecánica y Eléctrica (ESIME), Unidad Zacatenco",
    "Escuela Superior de Ingeniería Mecánica y Eléctrica (ESIME), Unidad Culhuacán",
    "Escuela Superior de Ingeniería Mecánica y Eléctrica (ESIME), Unidad Azcapotzalco",
    "Escuela Superior de Ingeniería Mecánica y Eléctrica (ESIME), Unidad Ticomán",
    "Escuela Superior de Ingeniería y Arquitectura (ESIA), Unidad Zacatenco",
    "Escuela Superior de Ingeniería y Arquitectura (ESIA), Unidad Tecamachalco", 
    "Escuela Superior de Ingeniería y Arquitectura (ESIA), Unidad Ticomán",
    "Escuela Superior de Ingeniería Textil (ESIT)",
    "Escuela Superior de Ingeniería Química E Industrias Extractivas (ESIQIE)",
    "Escuela Superior de Física y Matemáticas (ESFM)",
    "Escuela Superior de Cómputo (ESCOM)",
    "Escuela Nacional de Ciencias Biológicas (ENCB)",
    "Escuela Superior de Medicina (ESM)",
    "Escuela Nacional de Medicina y Homeopatía (ENMH)",
    "Escuela Superior de Enfermería y Obstetricia (ESEO)",
    "Centro Interdisciplinario de Ciencias de la Salud (CICS)Unidad Milpa Alta",
    "Centro Interdisciplinario de Ciencias de la Salud (CICS) Unidad Santo Tomás",
    "Escuela Superior de Comercio y Administración (ESCA) Unidad Santo Tomás",
    "Escuela Superior de Comercio y Administración (ESCA) Unidad Tepepan",
    "Escuela Superior de Economía (ESE)",
    "Escuela Superior de Turismo (EST)",
    "Escuela Nacional de Biblioteconomía y Archivonomía (ENBA)",
    "Unidad Profesional Interdisciplinaria en Ingeniería y Tecnologías Avanzadas (UPIITA)",
    "Unidad Profesional Interdisciplinaria de Ingeniería y Ciencias Sociales y Administrativas (UPIICSA)",
    "Unidad Profesional Interdisciplinaria de Biotecnología (UPIBI)",
    "Unidad Profesional Interdisciplinaria de Ingeniería Campus Hidalgo (UPIIH)",
    "Unidad Profesional Interdisciplinaria de Ingeniería, Campus Guanajuato (UPIIG)",
    "Unidad Profesional Interdisciplinaria de Ingeniería, Campus Zacatecas (UPIIZ)",
    "Unidad Profesional Interdisciplinaria de Energía y Movilidad (UPIEM)",
    "Unidad Profesional Interdisciplinaria de Ingeniería Campus Palenque (UPIIP)",
    "Unidad Profesional Interdisciplinaria de Ingeniería Campus Coahuila (UPIIC)",
    "Unidad Profesional Interdisciplinaria de Ingeniería Campus Tlaxcala (UPIIT)",
    'Unidad Profesional Interdisciplinaria de Ingeniería, Campus "Alejo Peralta" Puebla (UPIIAP)'],
    ADMIN_NS:["Dirección de Educación Superior"],
    L_DFLE_SA:["Centro de Lenguas Extranjeras (CENLEX), Unidad Zacatenco",
               "Centro de Lenguas Extranjeras (CENLEX), Unidad Santo Tomás]"],
    ADMIN_SACAD_SACAD:["Secretaría Académica"],

           
                 
//Secretaria Administrativa
ADMIN_SA_SA:["Secretaría de Administración"],
ADMIN_DCH_SA:["Dirección de Capital Humano"],
ADMIN_DPP_SA:["Dirección de Programación y Presupuesto"],
ADMIN_DRF_SA:["Dirección de Recursos Financieros"],
ADMIN_DRMI_SA:["Dirección de Recursos Materiales e Infraestructua"],
ADMIN_DSG_SA:["Dirección de Servicios Generales"],
ADMIN_CCDI_SA:["Coordinación de Centros de Desarrollo Infantil",
    "Centro de Desarrollo Infantil (CDI), Amalia Solórzano de Cárdenas",
    "Centro de Desarrollo Infantil (CDI), Eva Sámano de López Mateo"],
ADMIN_CGCENAC_SA:["Coordinación General del Centro Nacional de Cálculo (CENAC)"],

//Secretaria de Inovacion e Integracion Social

VD:["Centro de Vinculación y Desarrollo Regional (CVDR),Unidad Cajeme -Sonora",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Campeche",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Cancún",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Culiacán",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Durango",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Los Mochis",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Mazatlán",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Morelia",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Oaxaca",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Tampico",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Tijuana",
    "Centro de Vinculación y Desarrollo Regional (CVDR), Unidad Tlaxcala", 
    "Centro de Innovación e Integración de Tecnologías Avanzadas (CIITA), Unidad Cuidad Juárez, Chihuahua",
    "Centro de Innovación e Integración de Tecnologías Avanzadas (CIITA), Unidad Papantla, Veracruz",
    "Centro de Innovación e Integración de Tecnologías Avanzadas (CIITA), Unidad Puebla"],
ADMIN_DVDR:["Dirección de Vinculación y Desarrollo Regional"],
ADMIN_SIIS_SIIS:["Secretaría de Innovación e Integración Social"],
ADMIN_DESS_SIIS:["Dirección de Egresados y Servicio Social"],
ADMIN_DRI_SIIS:["Dirección de Relaciones Internacionales"],
ADMIN_DSETT_SIIS:["Dirección de Servicios Empresariales y Transferencia Tecnológica"],
ADMIN_DIET_SIIS:["Dirección de Incubación de Empresas Tecnológicas"],
ADMIN_DPITT_SIIS:["Dirección de Prospectiva e Inteligencia Tecnológica Tecnópoli"],

//Secretaria de Investigacion y Posgrado
I:["Centro Interdisciplinario de Ciencias Marinas (CICIMAR)",
   "Centro Interdisciplinario de Investigación y Estudios Sobre Medio Ambiente Y Desarrollo (CIIEMAD)",
   "Centro Interdisciplinario de Investigación para el Desarrollo Integral Regional (CIIDIR), Unidad Durango",
   "Centro Interdisciplinario de Investigación para el Desarrollo Integral Regional (CIIDIR), Unidad Sinaloa",
   "Centro Interdisciplinario de Investigación para el Desarrollo Integral Regional (CIIDIR), Unidad Michoacán",
   "Centro Interdisciplinario de Investigación para el Desarrollo Integral Regional (CIIDIR), Unidad Oaxaca",
   "Centro de Desarrollo de Productos Bióticos (CEPROBI)",
   "Centro de Biotecnología Genómica (CBG)",
   "Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada (CICATA), Unidad Legaría",
   "Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada (CICATA), Unidad Altamira",
   "Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada (CICATA), Unidad Querétaro",
   "Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada  (CICATA), Unidad Morelos",
   "Centro de Investigación en Computación (CIC)",
   "Centro de Investigación y Desarrollo de Tecnología Digital (CITEDI)",
   "Centro de Investigaciones Económicas, Administrativas y Sociales (CIECAS)",
   "Centro de Investigación en Biotecnología Aplicada, IPN -Tlaxcala (CIBA)",
   "Centro de Innovación y Desarrollo Tecnológico En Cómputo (CIDETEC)",
   "Centro de Investigación e Innovación Tecnológica (CIITEC)",
   "Centro Mexicano para la Producción Más Limpia (CMP+L)",
   "Centro de Desarrollo Aeroespacial (CDA)",
   "Centro de Nanociencias y Micro y Nanotecnologías (CNMN)"],
ADMIN_DI:["Dirección de Investigación"],
ADMIN_SIP_SIP:["Secretaría de Investigación y Posgrado"],
ADMIN_DP_SIP:["Dirección de Posgrado"],
ADMIN_DDCT_SIP:["Dirección de Difusión de Ciencia y Tecnología"],

//Secretaria de SE
ADMIN_SSE_SSE:["Secretaría de Servicios Educativos"],
ADMIN_DAES_SSE:["Dirección de Administración Escolar"],
ADMIN_DDC_SSE:["Dirección de Difusión Cultural"],
ADMIN_DAD_SSE:["Dirección de Actividades Deportivas"],
ADMIN_DBP_SSE:["Dirección de Bibliotecas y Publicaciones"],
ADMIN_DAE_SSE:[ "Centros de Apoyo Polifuncionales (CAP), Carlos Vallejo Márquez-CECyT 1",
"Centros de Apoyo Polifuncionales (CAP), Carlos Vallejo Márquez-CET 1",
"Centros de Apoyo Polifuncionales (CAP), Carlos Vallejo Márquez-CECyT 3",
"Centros de Apoyo Polifuncionales (CAP), Francisco Plata Limón-ESIME Azcapotzalco",
"Centros de Apoyo Polifuncionales (CAP), Francisco Plata Limón-CECyT 8",
"Centros de Apoyo a Estudiantes (CAP), Santo Tomas-ESE",
"Centros de Apoyo a Estudiantes (CAP), Santo Tomas-ESEO",
"Centros de Apoyo a Estudiantes (CAP), Santo Tomas-CECyT 11",
"Centros de Apoyo a Estudiantes (CAP), Santo Tomas-ENCB Santo Tomás", 
"Centros de Apoyo a Estudiantes (CAP), Manuel Cerrillo Valdivia-ESCA Tepepan", 
"Centros de Apoyo a Estudiantes (CAP), Manuel Cerrillo Valdivia-CECyT 15", 
"Centros de Apoyo a Estudiantes (CAP), Manuel Cerrillo Valdivia-CECyT 13", 
"Centros de Apoyo a Estudiantes (CAP), Zacatenco-Queso I",     
"Centros de Apoyo a Estudiantes (CAP), Zacatenco-Queso II",     
"Centros de Apoyo a Estudiantes (CAP), Zacatenco-CECyT 19",     
"Centros de Apoyo a Estudiantes (CAP), Zacatenco-ENCB",  
"Centro de Apoyo a Estudiantes (CAE), Alejandro Guillot Schiaffino-UPIICSA",  
"Centro de Apoyo a Estudiantes (CAE), Carlos Casas Campillo-EST",  
"Centro de Apoyo a Estudiantes (CAE), Carlos Casas Campillo-CENLEX Zacatenco",  
"Centro de Apoyo a Estudiantes (CAE), José Gómez Tagle Martínez",  
"Centro de Apoyo a Estudiantes (CAE), Juan O 'gorman-CECyT 4",       
"Centro de Apoyo a Estudiantes (CAE), Juan O 'gorman-CECyT 2",       
"Centro de Apoyo a Estudiantes (CAE), Juan O 'gorman-CECyT 9",       
"Centro de Apoyo a Estudiantes (CAE), Manuel L. Stampa Ortigoza-ESIA Ticomán",          
"Centro de Apoyo a Estudiantes (CAE), Manuel L. Stampa Ortigoza-ENBA",           
"Centro de Apoyo a Estudiantes (CAE), Manuel L. Stampa Ortigoza-UPIIH",           
"Centro de Apoyo a Estudiantes (CAE), Manuel L. Stampa Ortigoza-UPIIG",           
"Centro de Apoyo a Estudiantes (CAE), Manuel L. Stampa Ortigoza-UPIITA"]
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

const disparadores = document.querySelectorAll(".obligatorio");

  disparadores.forEach(input => {
    input.addEventListener("input", function () {
      const fila = this.closest("tr");
      const camposFila = fila.querySelectorAll("input, textarea, select");
    //  const camposFila = fila.querySelectorAll("input");

      const tieneValor = this.value.trim() !== "";

      camposFila.forEach(campo => {
        if (tieneValor) {
          campo.setAttribute("required", "required");
        } else {
          campo.removeAttribute("required");
        }
      });
    });
  });

function agregarFila(){
  const tbody = document.getElementById("tablaBody");
  const i = obtenerNumeroFila();

  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td id="nivelR${i}" class="input_tabla fijasCol" aria-label="Nivel/Area/Otro"></td>
    
    
    <td id="dependenciaR${i}" class="input_tabla fijasCol" aria-label="Dependencia"></td>
    
    <td>
      <textarea
        name="nombredelEquipoR${i}"
        class="auto-expand input_tabla obligatorio"
        rows="1"
        style="resize:none;"
        aria-label="Nombre del Equipo"
        > </textarea>
    </td>
    
    

    <td class="cantidadCol">

      <input type="number" name="cantidadR${i}" class="input_tabla " aria-label="Cantidad"> </input>  
    
      </td>

    <td>
      <textarea
        name="marcaR${i}"
        class="auto-expand input_tabla"
        rows="1"
        style="resize:none;"
        aria-label="Marca"
        > </textarea>
      </td>

    <td>
      
      <input type="number" name="claveCUCOPR${i}" class="input_tabla" aria-label="Clave CUCOP"> </input>

      </td>



    <td>
      <textarea
        name="especificacionesR${i}"
        class="auto-expand input_tabla"
        rows="1"
        style="resize:none;"
        aria-label="Especificaciones"
        > </textarea>
    </td>

    <td>
      <select id="justificacionR${i}" name="justificacionR${i}" class="tabla_select" aria-label="Justificación">
                   <option value="">-- Selecciona una prioridad--</option>
                   <option value="Equipo no Existente">Equipo no Existente</option>
                   <option value="Sustitución">Sustitución</option>
                   <option value="Complemento">Complemento</option>
      </select>
    </td>

    
    
     <td>

      <input type="text"
             name="precioR${i}"
             class="input_tabla precio"
             inputmode="decimal" 
             aria-label="Precio"> </input>

      </td>
    
    <td>
      <select id="prioridadR${i}" name="prioridadR${i}" placeholder="   " class="tabla_select" aria-label="Prioridad">
                   <option value="">-- Selecciona una prioridad--</option>
                   <option value="Baja">Baja</option>
                   <option value="Media">Media</option>
                   <option value="Alta">Alta</option>
                   <option value="Urgente">Urgente</option> 
      </select>
    </td>

    `;

  tbody.appendChild(fila);

  generarNivel();
  generarDependencia();
  activarAutoExpand(fila);
}    
function obtenerNumeroFila(){
  return document.querySelectorAll("#tablaBody tr").length + 1;
}
function activarAutoExpand(fila){
  const textareas = fila.querySelectorAll(".auto-expand");
  textareas.forEach(textarea => {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  });
}

document.getElementById("miFormulario").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });



//Guardado de Datos    
    
 const form = document.getElementById("miFormulario");
 const aviso = document.getElementById("aviso");   
    document.getElementById("miFormulario").addEventListener("submit", function(e){
                e.preventDefault();
                const formData = new FormData(this);
                const selectsTexto = [
                      "secretaria",
                      "direccion",
                      "nivel",
                      "dependencia"
                ];
                selectsTexto.forEach(id => {
                        const select = document.getElementById(id);
                        if (select && select.selectedIndex >= 0) {
                        formData.set(id, select.options[select.selectedIndex].text);
                        }
                });
                aviso.textContent = " ";
                const data = Object.fromEntries(formData);
                /*fetch("https://script.google.com/macros/s/AKfycbylJPoK0gXZxnMQzAWlCLGbwMvi7OsMV-rKF3eEpNDSkpbzZ8R6kzFAadKFIonA97Of-Q/exec", {
                                 method: "POST",
                                 body: new FormData(this)
                })*/
                
                 fetch("https://script.google.com/macros/s/AKfycbweIlGNMWF8ygoJLliL8jxzM0U-we7i64H1sDam6EdPDrXnRC9KxvbaJho079tawLcK3g/exec", {
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


