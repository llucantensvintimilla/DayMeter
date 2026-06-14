document.addEventListener('DOMContentLoaded', function() {
    const paisSelect = document.getElementById('paisSelect');
    const regionSelect = document.getElementById('regionSelect');
    const fechaInicio = document.getElementById('fechaInicio');
    const fechaFin = document.getElementById('fechaFin');
    const excluirFindes = document.getElementById('excluirFindes');
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadosPanel = document.getElementById('resultadosPanel');
    const totalDiasSpan = document.getElementById('totalDias');
    const totalFestivosSpan = document.getElementById('totalFestivos');
    const totalFindesSpan = document.getElementById('totalFindes');
    const diasHabilesSpan = document.getElementById('diasHabiles');
    
    // ✅ ACTIVAR EXCLUIR FINES DE SEMANA POR DEFECTO
    excluirFindes.checked = true;
    
    // ✅ DEJAR FECHAS VACÍAS
    fechaInicio.value = "";
    fechaFin.value = "";
    
    let graficoInstance = null;
    let ultimoResultado = null;
    let mapaFestivosGlobal = new Map();
    let rangoInicio = null;
    let rangoFin = null;
    let todosFestivosGlobal = [];
    
    // Tooltip personalizado
    let tooltip = document.createElement('div');
    tooltip.id = 'customTooltip';
    document.body.appendChild(tooltip);
    
    function showTooltip(text, tipo, x, y) {
        tooltip.textContent = text;
        tooltip.className = '';
        tooltip.classList.add(tipo);
        tooltip.style.left = (x + 15) + 'px';
        tooltip.style.top = (y + 10) + 'px';
        tooltip.classList.add('visible');
    }
    
    function hideTooltip() {
        tooltip.classList.remove('visible');
    }
    
    paisSelect.addEventListener('change', function() { 
        cargarRegiones(this.value); 
        resultadosPanel.classList.add('hidden');
    });
    
    async function calcular() {
        const pais = paisSelect.value;
        const region = regionSelect.value;
        const inicio = fechaInicio.value;
        const fin = fechaFin.value;
        const excluir = excluirFindes.checked;
        
        rangoInicio = inicio;
        rangoFin = fin;
        
        if (!inicio || !fin) { 
            alert("Por favor, selecciona ambas fechas"); 
            return; 
        }
        if (new Date(inicio) > new Date(fin)) { 
            alert("La fecha inicial no puede ser posterior a la final"); 
            return; 
        }
        
        calcularBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Calculando...';
        calcularBtn.disabled = true;
        
        try {
            const añoInicio = new Date(inicio).getFullYear();
            const añoFin = new Date(fin).getFullYear();
            const regionCodigo = region || null;
            
            todosFestivosGlobal = await FestivosAPI.obtenerFestivosMultiAnio(pais, añoInicio, añoFin, regionCodigo);
            
            const festivosEnRango = FestivosAPI.obtenerFestivosEnRangoConNombre(todosFestivosGlobal, inicio, fin);
            mapaFestivosGlobal = FestivosAPI.crearSetConNombre(todosFestivosGlobal);
            
            const totalDias = Math.ceil((new Date(fin) - new Date(inicio)) / 86400000) + 1;
            const festivos = festivosEnRango.length;
            const findes = FestivosAPI.contarFindesEnRango(inicio, fin);
            const habiles = FestivosAPI.calcularDiasHabiles(mapaFestivosGlobal, inicio, fin, excluir);
            
            totalDiasSpan.textContent = totalDias;
            totalFestivosSpan.textContent = festivos;
            totalFindesSpan.textContent = findes;
            diasHabilesSpan.textContent = habiles;
            actualizarGrafico(totalDias, festivos, findes, habiles);
            resultadosPanel.classList.remove('hidden');
            ultimoResultado = { pais, region, inicio, fin, excluir, totalDias, festivos, findes, habiles };
            actualizarVistaPrevia();
            mostrarListaFestivos(festivosEnRango);
            
            const fechaInicioObj = new Date(inicio);
            calendarioActual = new Date(fechaInicioObj.getFullYear(), fechaInicioObj.getMonth(), 1);
            actualizarCalendario(mapaFestivosGlobal, pais, inicio, fin);
            
            resultadosPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (error) { 
            console.error(error); 
            alert("Error al obtener datos."); 
        }
        finally { 
            calcularBtn.innerHTML = '<i class="fas fa-chart-line"></i> Calcular periodo'; 
            calcularBtn.disabled = false; 
        }
    }
    
    function mostrarListaFestivos(festivos) {
        const container = document.getElementById('listaFestivos');
        if (!festivos.length) { 
            container.innerHTML = '<p class="cargando"><i class="fas fa-calendar-times"></i> No hay festivos en este rango</p>'; 
            return; 
        }
        container.innerHTML = '';
        festivos.forEach(f => {
            const item = document.createElement('div'); 
            item.className = 'festivo-item';
            item.innerHTML = `<div class="festivo-fecha"><i class="fas fa-calendar-day"></i> ${f.date}</div><div class="festivo-nombre"><i class="fas fa-gift"></i> ${f.name}</div><div class="festivo-tipo"><i class="fas fa-tag"></i> ${f.type}</div>`;
            container.appendChild(item);
        });
    }
    
    function actualizarGrafico(total, festivos, findes, habiles) {
        const ctx = document.getElementById('graficoDias').getContext('2d');
        if (graficoInstance) graficoInstance.destroy();
        graficoInstance = new Chart(ctx, {
            type: 'doughnut',
            data: { 
                labels: ['Días hábiles', 'Festivos', 'Fines de semana'], 
                datasets: [{ 
                    data: [habiles, festivos, total - habiles - festivos], 
                    backgroundColor: ['#4caf50', '#f72585', '#6c757d'], 
                    borderWidth: 0 
                }] 
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: true, 
                plugins: { legend: { position: 'bottom' } } 
            }
        });
    }
    
    function actualizarVistaPrevia() {
        if (!ultimoResultado) return;
        const previewDiv = document.getElementById('vistaPrevia'); 
        const mensajeSpan = document.getElementById('mensajeResumen');
        const regionTexto = ultimoResultado.region ? ` en ${regionSelect.options[regionSelect.selectedIndex]?.text}` : '';
        mensajeSpan.innerHTML = `<i class="fas fa-chart-line"></i> <strong>Del ${ultimoResultado.inicio} al ${ultimoResultado.fin}</strong>: ${ultimoResultado.totalDias} días totales, <strong>${ultimoResultado.festivos} festivos${regionTexto}</strong> y <strong>${ultimoResultado.findes} fines de semana</strong>.`;
        previewDiv.classList.remove('hidden');
    }
    
    function obtenerUrlCompartir() { 
        if (!ultimoResultado) return window.location.href; 
        return `${window.location.origin}${window.location.pathname}?pais=${ultimoResultado.pais}&region=${ultimoResultado.region||''}&inicio=${ultimoResultado.inicio}&fin=${ultimoResultado.fin}&excluir=${ultimoResultado.excluir}`; 
    }
    
    document.getElementById('compartirWA')?.addEventListener('click', () => { 
        if(ultimoResultado){ 
            const texto = `📅 Del ${ultimoResultado.inicio} al ${ultimoResultado.fin}: ${ultimoResultado.totalDias} días, ${ultimoResultado.festivos} festivos`; 
            window.open(`https://wa.me/?text=${encodeURIComponent(texto+" "+obtenerUrlCompartir())}`, '_blank'); 
        } 
    });
    
    document.getElementById('compartirTW')?.addEventListener('click', () => { 
        if(ultimoResultado){ 
            const texto = `📊 Del ${ultimoResultado.inicio} al ${ultimoResultado.fin}: ${ultimoResultado.totalDias} días, ${ultimoResultado.festivos} festivos`; 
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(obtenerUrlCompartir())}`, '_blank'); 
        } 
    });
    
    document.getElementById('copiarLink')?.addEventListener('click', async () => { 
        await navigator.clipboard.writeText(obtenerUrlCompartir()); 
        alert("✅ Enlace copiado"); 
    });
    
    const verFestivosBtn = document.getElementById('verFestivosLink');
    if (verFestivosBtn) {
        verFestivosBtn.style.display = 'inline-block';
        verFestivosBtn.style.padding = '12px 24px';
        verFestivosBtn.style.marginTop = '15px';
        verFestivosBtn.style.background = 'linear-gradient(135deg, #f72585, #e53888)';
        verFestivosBtn.style.color = 'white';
        verFestivosBtn.style.borderRadius = '40px';
        verFestivosBtn.style.fontWeight = 'bold';
        verFestivosBtn.style.textDecoration = 'none';
        verFestivosBtn.style.transition = 'transform 0.2s';
        verFestivosBtn.style.display = 'inline-flex';
        verFestivosBtn.style.alignItems = 'center';
        verFestivosBtn.style.gap = '8px';
        verFestivosBtn.addEventListener('mouseenter', () => verFestivosBtn.style.transform = 'scale(1.05)');
        verFestivosBtn.addEventListener('mouseleave', () => verFestivosBtn.style.transform = 'scale(1)');
        verFestivosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('[data-tab="calendario"]').click();
            document.getElementById('festivos').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    let calendarioActual = new Date(); 
    let paisActual = 'ES';
    
    function generarCalendario(año, mes, mapaFestivos, inicioRango, finRango) {
        const primerDia = new Date(año, mes, 1); 
        let inicioOffset = primerDia.getDay(); 
        inicioOffset = inicioOffset === 0 ? 6 : inicioOffset - 1;
        const diasMes = new Date(año, mes + 1, 0).getDate(); 
        const diasMesAnterior = new Date(año, mes, 0).getDate();
        const contenedor = document.getElementById('calendarioDias'); 
        contenedor.innerHTML = '';
        
        for (let i = 0; i < inicioOffset; i++) { 
            const dia = diasMesAnterior - inicioOffset + i + 1; 
            contenedor.appendChild(crearCeldaDia(dia, true, false, false, null, null, null, null, null)); 
        }
        
        for (let d = 1; d <= diasMes; d++) {
            const fechaStr = `${año}-${String(mes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const esFestivo = mapaFestivos.has(fechaStr);
            const nombreFestivo = mapaFestivos.get(fechaStr) || null;
            const fecha = new Date(año, mes, d); 
            const esFinde = (fecha.getDay() === 0 || fecha.getDay() === 6);
            const estaEnRango = inicioRango && finRango && fechaStr >= inicioRango && fechaStr <= finRango;
            const esInicio = inicioRango && fechaStr === inicioRango;
            const esFin = finRango && fechaStr === finRango;
            const celda = crearCeldaDia(d, false, esFestivo, esFinde, nombreFestivo, estaEnRango, esInicio, esFin, fechaStr);
            contenedor.appendChild(celda);
        }
        const totalCeldas = 42; 
        const celdasActuales = contenedor.children.length;
        for (let i = celdasActuales; i < totalCeldas; i++) { 
            contenedor.appendChild(crearCeldaDia(i - celdasActuales + 1, true, false, false, null, null, null, null, null)); 
        }
    }
    
    function crearCeldaDia(dia, esOtroMes, esFestivo, esFinde, nombreFestivo, enRango, esInicio, esFin, fechaStr) {
        const div = document.createElement('div'); 
        div.className = 'dia-calendario'; 
        if (esOtroMes) div.classList.add('dia-otro-mes');
        if (enRango) div.classList.add('en-rango');
        if (esInicio) div.classList.add('rango-inicio');
        if (esFin) div.classList.add('rango-fin');
        div.innerHTML = `<span>${dia}</span>`;
        const punto = document.createElement('div'); 
        punto.className = esFestivo ? 'punto punto-festivo' : (esFinde ? 'punto punto-finde' : 'punto punto-normal'); 
        div.appendChild(punto);
        
        div.addEventListener('mouseenter', (e) => {
            let texto = '';
            let tipo = '';
            if (esFestivo && nombreFestivo) {
                texto = `🎉 ${nombreFestivo}`;
                tipo = 'festivo';
            } else if (esFinde) {
                texto = `🏠 Fin de semana`;
                tipo = 'finde';
            } else if (esInicio) {
                texto = `▶️ Inicio del periodo: ${fechaStr}`;
                tipo = 'normal';
            } else if (esFin) {
                texto = `⏹️ Fin del periodo: ${fechaStr}`;
                tipo = 'normal';
            } else {
                texto = `📅 ${fechaStr || `${dia}/${new Date().getMonth()+1}/${new Date().getFullYear()}`}`;
                tipo = 'normal';
            }
            showTooltip(texto, tipo, e.clientX, e.clientY);
        });
        
        div.addEventListener('mouseleave', () => { hideTooltip(); });
        div.addEventListener('mousemove', (e) => {
            if (tooltip.classList.contains('visible')) {
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY + 10) + 'px';
            }
        });
        
        return div;
    }
    
    function actualizarCalendario(mapaFestivos, pais, inicioRango, finRango) { 
        mapaFestivosGlobal = mapaFestivos; 
        paisActual = pais; 
        const año = calendarioActual.getFullYear(); 
        const mes = calendarioActual.getMonth(); 
        const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']; 
        document.getElementById('mesActual').textContent = `${meses[mes]} ${año}`; 
        generarCalendario(año, mes, mapaFestivos, inicioRango, finRango); 
    }
    
    document.getElementById('mesAnterior')?.addEventListener('click', () => { 
        calendarioActual.setMonth(calendarioActual.getMonth() - 1); 
        actualizarCalendario(mapaFestivosGlobal, paisActual, rangoInicio, rangoFin); 
    });
    
    document.getElementById('mesSiguiente')?.addEventListener('click', () => { 
        calendarioActual.setMonth(calendarioActual.getMonth() + 1); 
        actualizarCalendario(mapaFestivosGlobal, paisActual, rangoInicio, rangoFin); 
    });
    
    document.querySelectorAll('.tab-boton').forEach(btn => { 
        btn.addEventListener('click', () => { 
            const tabId = btn.dataset.tab; 
            document.querySelectorAll('.tab-boton').forEach(b => b.classList.remove('activo')); 
            document.querySelectorAll('.tab-contenido').forEach(c => c.classList.remove('activo')); 
            btn.classList.add('activo'); 
            document.getElementById(`tab-${tabId}`).classList.add('activo'); 
        }); 
    });
    
    document.querySelectorAll('.faq-pregunta').forEach(p => p.addEventListener('click', function() { this.parentElement.classList.toggle('activo'); }));
    document.querySelector('.hamburger')?.addEventListener('click', () => document.querySelector('.nav-menu')?.classList.toggle('activo'));
    
    calcularBtn.addEventListener('click', calcular);
    cargarRegiones('ES');
    actualizarCalendario(new Map(), 'ES', null, null);
    
    const params = new URLSearchParams(window.location.search);
    if (params.has('pais')) paisSelect.value = params.get('pais');
    if (params.has('region') && params.get('region')) setTimeout(() => regionSelect.value = params.get('region'), 100);
    if (params.has('inicio')) fechaInicio.value = params.get('inicio');
    if (params.has('fin')) fechaFin.value = params.get('fin');
    if (params.has('excluir')) excluirFindes.checked = params.get('excluir') === 'true';
    
    // ✅ Solo calcular si hay fechas en la URL (cuando se comparte)
    if (params.has('inicio') && params.has('fin') && fechaInicio.value && fechaFin.value) {
        calcular();
    }
});
