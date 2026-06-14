const regionesPorPais = {
    // ESPAÑA - 17 comunidades + 2 ciudades autónomas
    ES: [
        { codigo: "AN", nombre: "Andalucía" },
        { codigo: "AR", nombre: "Aragón" },
        { codigo: "AS", nombre: "Asturias" },
        { codigo: "CN", nombre: "Canarias" },
        { codigo: "CB", nombre: "Cantabria" },
        { codigo: "CL", nombre: "Castilla y León" },
        { codigo: "CM", nombre: "Castilla-La Mancha" },
        { codigo: "CT", nombre: "Cataluña" },
        { codigo: "CE", nombre: "Ceuta" },
        { codigo: "EX", nombre: "Extremadura" },
        { codigo: "GA", nombre: "Galicia" },
        { codigo: "IB", nombre: "Islas Baleares" },
        { codigo: "RI", nombre: "La Rioja" },
        { codigo: "MD", nombre: "Madrid" },
        { codigo: "ML", nombre: "Melilla" },
        { codigo: "MC", nombre: "Murcia" },
        { codigo: "NC", nombre: "Navarra" },
        { codigo: "PV", nombre: "País Vasco" },
        { codigo: "VC", nombre: "Comunidad Valenciana" }
    ],
    
    // MÉXICO - 32 estados completos
    MX: [
        { codigo: "AGU", nombre: "Aguascalientes" },
        { codigo: "BCN", nombre: "Baja California" },
        { codigo: "BCS", nombre: "Baja California Sur" },
        { codigo: "CAM", nombre: "Campeche" },
        { codigo: "CHP", nombre: "Chiapas" },
        { codigo: "CHH", nombre: "Chihuahua" },
        { codigo: "CMX", nombre: "Ciudad de México" },
        { codigo: "COA", nombre: "Coahuila" },
        { codigo: "COL", nombre: "Colima" },
        { codigo: "DUR", nombre: "Durango" },
        { codigo: "GUA", nombre: "Guanajuato" },
        { codigo: "GRO", nombre: "Guerrero" },
        { codigo: "HID", nombre: "Hidalgo" },
        { codigo: "JAL", nombre: "Jalisco" },
        { codigo: "MEX", nombre: "Estado de México" },
        { codigo: "MIC", nombre: "Michoacán" },
        { codigo: "MOR", nombre: "Morelos" },
        { codigo: "NAY", nombre: "Nayarit" },
        { codigo: "NLE", nombre: "Nuevo León" },
        { codigo: "OAX", nombre: "Oaxaca" },
        { codigo: "PUE", nombre: "Puebla" },
        { codigo: "QUE", nombre: "Querétaro" },
        { codigo: "ROO", nombre: "Quintana Roo" },
        { codigo: "SLP", nombre: "San Luis Potosí" },
        { codigo: "SIN", nombre: "Sinaloa" },
        { codigo: "SON", nombre: "Sonora" },
        { codigo: "TAB", nombre: "Tabasco" },
        { codigo: "TAM", nombre: "Tamaulipas" },
        { codigo: "TLA", nombre: "Tlaxcala" },
        { codigo: "VER", nombre: "Veracruz" },
        { codigo: "YUC", nombre: "Yucatán" },
        { codigo: "ZAC", nombre: "Zacatecas" }
    ],
    
    // ARGENTINA - 23 provincias + CABA
    AR: [
        { codigo: "B", nombre: "Buenos Aires" },
        { codigo: "C", nombre: "Ciudad Autónoma de Buenos Aires" },
        { codigo: "K", nombre: "Catamarca" },
        { codigo: "H", nombre: "Chaco" },
        { codigo: "U", nombre: "Chubut" },
        { codigo: "X", nombre: "Córdoba" },
        { codigo: "W", nombre: "Corrientes" },
        { codigo: "E", nombre: "Entre Ríos" },
        { codigo: "P", nombre: "Formosa" },
        { codigo: "Y", nombre: "Jujuy" },
        { codigo: "L", nombre: "La Pampa" },
        { codigo: "F", nombre: "La Rioja" },
        { codigo: "M", nombre: "Mendoza" },
        { codigo: "N", nombre: "Misiones" },
        { codigo: "Q", nombre: "Neuquén" },
        { codigo: "R", nombre: "Río Negro" },
        { codigo: "A", nombre: "Salta" },
        { codigo: "J", nombre: "San Juan" },
        { codigo: "D", nombre: "San Luis" },
        { codigo: "Z", nombre: "Santa Cruz" },
        { codigo: "S", nombre: "Santa Fe" },
        { codigo: "G", nombre: "Santiago del Estero" },
        { codigo: "V", nombre: "Tierra del Fuego" },
        { codigo: "T", nombre: "Tucumán" }
    ],
    
    // COLOMBIA - 32 departamentos
    CO: [
        { codigo: "AMA", nombre: "Amazonas" }, { codigo: "ANT", nombre: "Antioquia" },
        { codigo: "ARA", nombre: "Arauca" }, { codigo: "ATL", nombre: "Atlántico" },
        { codigo: "BOL", nombre: "Bolívar" }, { codigo: "BOY", nombre: "Boyacá" },
        { codigo: "CAL", nombre: "Caldas" }, { codigo: "CAQ", nombre: "Caquetá" },
        { codigo: "CAS", nombre: "Casanare" }, { codigo: "CAU", nombre: "Cauca" },
        { codigo: "CES", nombre: "Cesar" }, { codigo: "CHO", nombre: "Chocó" },
        { codigo: "COR", nombre: "Córdoba" }, { codigo: "CUN", nombre: "Cundinamarca" },
        { codigo: "GUA", nombre: "Guainía" }, { codigo: "GUV", nombre: "Guaviare" },
        { codigo: "HUI", nombre: "Huila" }, { codigo: "LAG", nombre: "La Guajira" },
        { codigo: "MAG", nombre: "Magdalena" }, { codigo: "MET", nombre: "Meta" },
        { codigo: "NAR", nombre: "Nariño" }, { codigo: "NSA", nombre: "Norte de Santander" },
        { codigo: "PUT", nombre: "Putumayo" }, { codigo: "QUI", nombre: "Quindío" },
        { codigo: "RIS", nombre: "Risaralda" }, { codigo: "SAP", nombre: "San Andrés" },
        { codigo: "SAN", nombre: "Santander" }, { codigo: "SUC", nombre: "Sucre" },
        { codigo: "TOL", nombre: "Tolima" }, { codigo: "VAC", nombre: "Valle del Cauca" },
        { codigo: "VAU", nombre: "Vaupés" }, { codigo: "VID", nombre: "Vichada" }
    ],
    
    // CHILE - 16 regiones
    CL: [
        { codigo: "CL-AI", nombre: "Aysén" }, { codigo: "CL-AN", nombre: "Antofagasta" },
        { codigo: "CL-AR", nombre: "Araucanía" }, { codigo: "CL-AP", nombre: "Arica y Parinacota" },
        { codigo: "CL-AT", nombre: "Atacama" }, { codigo: "CL-BI", nombre: "Biobío" },
        { codigo: "CL-CO", nombre: "Coquimbo" }, { codigo: "CL-LI", nombre: "Libertador General Bernardo O'Higgins" },
        { codigo: "CL-LL", nombre: "Los Lagos" }, { codigo: "CL-LR", nombre: "Los Ríos" },
        { codigo: "CL-MA", nombre: "Magallanes" }, { codigo: "CL-ML", nombre: "Maule" },
        { codigo: "CL-NB", nombre: "Ñuble" }, { codigo: "CL-RM", nombre: "Metropolitana de Santiago" },
        { codigo: "CL-TA", nombre: "Tarapacá" }, { codigo: "CL-VS", nombre: "Valparaíso" }
    ],
    
    // PERÚ - 25 regiones
    PE: [
        { codigo: "PE-AMA", nombre: "Amazonas" }, { codigo: "PE-ANC", nombre: "Áncash" },
        { codigo: "PE-APU", nombre: "Apurímac" }, { codigo: "PE-ARE", nombre: "Arequipa" },
        { codigo: "PE-AYA", nombre: "Ayacucho" }, { codigo: "PE-CAJ", nombre: "Cajamarca" },
        { codigo: "PE-CAL", nombre: "Callao" }, { codigo: "PE-CUS", nombre: "Cusco" },
        { codigo: "PE-HUV", nombre: "Huancavelica" }, { codigo: "PE-HUC", nombre: "Huánuco" },
        { codigo: "PE-ICA", nombre: "Ica" }, { codigo: "PE-JUN", nombre: "Junín" },
        { codigo: "PE-LAL", nombre: "La Libertad" }, { codigo: "PE-LAM", nombre: "Lambayeque" },
        { codigo: "PE-LIM", nombre: "Lima" }, { codigo: "PE-LOR", nombre: "Loreto" },
        { codigo: "PE-MDD", nombre: "Madre de Dios" }, { codigo: "PE-MOQ", nombre: "Moquegua" },
        { codigo: "PE-PAS", nombre: "Pasco" }, { codigo: "PE-PIU", nombre: "Piura" },
        { codigo: "PE-PUN", nombre: "Puno" }, { codigo: "PE-SAM", nombre: "San Martín" },
        { codigo: "PE-TAC", nombre: "Tacna" }, { codigo: "PE-TUM", nombre: "Tumbes" },
        { codigo: "PE-UCA", nombre: "Ucayali" }
    ],
    
    // ESTADOS UNIDOS - 50 estados
    US: [
        { codigo: "AL", nombre: "Alabama" }, { codigo: "AK", nombre: "Alaska" },
        { codigo: "AZ", nombre: "Arizona" }, { codigo: "AR", nombre: "Arkansas" },
        { codigo: "CA", nombre: "California" }, { codigo: "CO", nombre: "Colorado" },
        { codigo: "CT", nombre: "Connecticut" }, { codigo: "DE", nombre: "Delaware" },
        { codigo: "FL", nombre: "Florida" }, { codigo: "GA", nombre: "Georgia" },
        { codigo: "HI", nombre: "Hawái" }, { codigo: "ID", nombre: "Idaho" },
        { codigo: "IL", nombre: "Illinois" }, { codigo: "IN", nombre: "Indiana" },
        { codigo: "IA", nombre: "Iowa" }, { codigo: "KS", nombre: "Kansas" },
        { codigo: "KY", nombre: "Kentucky" }, { codigo: "LA", nombre: "Luisiana" },
        { codigo: "ME", nombre: "Maine" }, { codigo: "MD", nombre: "Maryland" },
        { codigo: "MA", nombre: "Massachusetts" }, { codigo: "MI", nombre: "Míchigan" },
        { codigo: "MN", nombre: "Minnesota" }, { codigo: "MS", nombre: "Misisipi" },
        { codigo: "MO", nombre: "Misuri" }, { codigo: "MT", nombre: "Montana" },
        { codigo: "NE", nombre: "Nebraska" }, { codigo: "NV", nombre: "Nevada" },
        { codigo: "NH", nombre: "Nuevo Hampshire" }, { codigo: "NJ", nombre: "Nueva Jersey" },
        { codigo: "NM", nombre: "Nuevo México" }, { codigo: "NY", nombre: "Nueva York" },
        { codigo: "NC", nombre: "Carolina del Norte" }, { codigo: "ND", nombre: "Dakota del Norte" },
        { codigo: "OH", nombre: "Ohio" }, { codigo: "OK", nombre: "Oklahoma" },
        { codigo: "OR", nombre: "Oregón" }, { codigo: "PA", nombre: "Pensilvania" },
        { codigo: "RI", nombre: "Rhode Island" }, { codigo: "SC", nombre: "Carolina del Sur" },
        { codigo: "SD", nombre: "Dakota del Sur" }, { codigo: "TN", nombre: "Tennessee" },
        { codigo: "TX", nombre: "Texas" }, { codigo: "UT", nombre: "Utah" },
        { codigo: "VT", nombre: "Vermont" }, { codigo: "VA", nombre: "Virginia" },
        { codigo: "WA", nombre: "Washington" }, { codigo: "WV", nombre: "Virginia Occidental" },
        { codigo: "WI", nombre: "Wisconsin" }, { codigo: "WY", nombre: "Wyoming" }
    ],
    
    // REINO UNIDO - 4 naciones
    GB: [
        { codigo: "GB-ENG", nombre: "Inglaterra" },
        { codigo: "GB-SCT", nombre: "Escocia" },
        { codigo: "GB-WLS", nombre: "Gales" },
        { codigo: "GB-NIR", nombre: "Irlanda del Norte" }
    ]
};

function cargarRegiones(pais) {
    const regionSelect = document.getElementById('regionSelect');
    const regiones = regionesPorPais[pais] || [];
    regionSelect.innerHTML = '<option value="">Todas las regiones (solo festivos nacionales)</option>';
    if (regiones.length > 0 && regiones[0].codigo !== pais) {
        regiones.forEach(region => {
            const option = document.createElement('option');
            option.value = region.codigo;
            option.textContent = region.nombre;
            regionSelect.appendChild(option);
        });
        regionSelect.disabled = false;
    } else {
        regionSelect.innerHTML = '<option value="">No hay regiones disponibles</option>';
        regionSelect.disabled = true;
    }
}