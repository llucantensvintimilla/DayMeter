const FestivosAPI = (function() {
    const cache = new Map();
    
    async function obtenerFestivos(pais, año, regionCodigo = null) {
        const clave = `${pais}-${año}-${regionCodigo || 'nacional'}`;
        if (cache.has(clave)) return cache.get(clave);
        
        try {
            // Usamos Nager.Date (más estable que OpenHolidays)
            let url = `https://date.nager.at/api/v3/PublicHolidays/${año}/${pais}`;
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
            let datos = await respuesta.json();
            
            // Filtrar por región si es necesario
            if (regionCodigo && regionCodigo !== "") {
                datos = datos.filter(festivo => {
                    return festivo.global === true || 
                           (festivo.counties && festivo.counties.includes(regionCodigo));
                });
            }
            
            cache.set(clave, datos);
            return datos;
        } catch (error) {
            console.error(`Error obteniendo festivos para ${pais} ${año}:`, error);
            return [];
        }
    }
    
    // Obtener festivos para un rango de años
    async function obtenerFestivosMultiAnio(pais, añoInicio, añoFin, regionCodigo = null) {
        let todos = [];
        for (let año = añoInicio; año <= añoFin; año++) {
            const festivos = await obtenerFestivos(pais, año, regionCodigo);
            todos = [...todos, ...festivos];
        }
        return todos;
    }
    
    function crearSetConNombre(festivosArray) {
        const mapa = new Map();
        festivosArray.forEach(f => mapa.set(f.date, f.localName || f.name));
        return mapa;
    }
    
    function obtenerFestivosEnRangoConNombre(festivosArray, inicio, fin) {
        const inicioDate = new Date(inicio);
        const finDate = new Date(fin);
        const resultado = [];
        festivosArray.forEach(f => {
            const fecha = new Date(f.date);
            if (fecha >= inicioDate && fecha <= finDate) {
                resultado.push({ date: f.date, name: f.localName || f.name, type: f.types?.[0] || "Público" });
            }
        });
        return resultado.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    
    function contarFindesEnRango(inicio, fin) {
        let contador = 0;
        let actual = new Date(inicio);
        const finDate = new Date(fin);
        while (actual <= finDate) {
            if (actual.getDay() === 0 || actual.getDay() === 6) contador++;
            actual.setDate(actual.getDate() + 1);
        }
        return contador;
    }
    
    function calcularDiasHabiles(mapaFestivos, inicio, fin, excluirFindes) {
        let habiles = 0;
        let actual = new Date(inicio);
        const finDate = new Date(fin);
        while (actual <= finDate) {
            const diaSemana = actual.getDay();
            const esFinde = (diaSemana === 0 || diaSemana === 6);
            const fechaStr = actual.toISOString().split('T')[0];
            const esFestivo = mapaFestivos.has(fechaStr);
            let esHabil = true;
            if (excluirFindes && esFinde) esHabil = false;
            if (esFestivo) esHabil = false;
            if (esHabil) habiles++;
            actual.setDate(actual.getDate() + 1);
        }
        return habiles;
    }
    
    return { 
        obtenerFestivos, 
        obtenerFestivosMultiAnio,
        crearSetConNombre, 
        obtenerFestivosEnRangoConNombre, 
        contarFindesEnRango, 
        calcularDiasHabiles 
    };
})();