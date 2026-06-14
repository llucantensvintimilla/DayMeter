// Cookie Consent Manager
(function() {
    // Configuración
    const CONSENT_KEY = 'daymeter_cookie_consent';
    const CONSENT_EXPIRY = 365; // días
    
    // Tipos de cookies
    const COOKIE_TYPES = {
        NECESSARY: 'necessary',    // Siempre activas
        ANALYTICS: 'analytics',    // Google Analytics
        MARKETING: 'marketing'     // AdSense
    };
    
    // Verificar si ya hay consentimiento
    function getConsent() {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (consent) {
            try {
                return JSON.parse(consent);
            } catch(e) {
                return null;
            }
        }
        return null;
    }
    
    // Guardar consentimiento
    function saveConsent(analytics, marketing) {
        const consent = {
            analytics: analytics,
            marketing: marketing,
            date: new Date().toISOString()
        };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        return consent;
    }
    
    // Cargar scripts según consentimiento
    function loadScriptsBasedOnConsent() {
        const consent = getConsent();
        
        if (consent && consent.analytics === true) {
            loadGoogleAnalytics();
        }
        
        if (consent && consent.marketing === true) {
            loadAdSense();
        }
    }
    
    // Cargar Google Analytics
    function loadGoogleAnalytics() {
        // Google Analytics 4 (GA4)
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-TU_ID_ANALYTICS';
        document.head.appendChild(script1);
        
        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TU_ID_ANALYTICS');
        `;
        document.head.appendChild(script2);
        
        console.log('Google Analytics cargado con consentimiento');
    }
    
    // Cargar Google AdSense
    function loadAdSense() {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TU_ID_ADSENSE';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        console.log('Google AdSense cargado con consentimiento');
    }
    
    // Mostrar banner de cookies
    function showCookieBanner() {
        // Si ya hay consentimiento, no mostrar
        if (getConsent() !== null) return;
        
        // Crear el banner
        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <i class="fas fa-cookie-bite"></i>
                    <strong>Usamos cookies</strong>
                    <p>Utilizamos cookies propias y de terceros (Google Analytics y AdSense) para mejorar tu experiencia, analizar el tráfico y mostrar anuncios personalizados.</p>
                </div>
                <div class="cookie-banner-buttons">
                    <button id="cookieAcceptAll" class="cookie-btn accept-all"><i class="fas fa-check"></i> Aceptar todas</button>
                    <button id="cookieAcceptNecessary" class="cookie-btn necessary"><i class="fas fa-shield-alt"></i> Solo necesarias</button>
                    <button id="cookieSettings" class="cookie-btn settings"><i class="fas fa-cog"></i> Configurar</button>
                </div>
            </div>
            <div id="cookieSettingsPanel" class="cookie-settings-panel" style="display:none;">
                <h4>Configuración de cookies</h4>
                <div class="cookie-setting">
                    <label>
                        <input type="checkbox" id="cookieAnalytics" checked>
                        <strong>Cookies de análisis (Google Analytics)</strong>
                        <span>Nos ayudan a entender cómo usas nuestra web para mejorar.</span>
                    </label>
                </div>
                <div class="cookie-setting">
                    <label>
                        <input type="checkbox" id="cookieMarketing" checked>
                        <strong>Cookies de publicidad (Google AdSense)</strong>
                        <span>Muestran anuncios relevantes para ti.</span>
                    </label>
                </div>
                <div class="cookie-settings-buttons">
                    <button id="cookieSaveSettings" class="cookie-btn save">Guardar preferencias</button>
                    <button id="cookieCloseSettings" class="cookie-btn close">Cerrar</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Estilos del banner
        const style = document.createElement('style');
        style.textContent = `
            #cookieConsentBanner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                color: white;
                z-index: 10000;
                padding: 1rem;
                box-shadow: 0 -5px 20px rgba(0,0,0,0.3);
                border-top: 3px solid var(--secundario, #f72585);
                font-family: 'Segoe UI', sans-serif;
            }
            .cookie-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
            }
            .cookie-banner-text {
                flex: 2;
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            .cookie-banner-text i {
                font-size: 2rem;
                color: var(--secundario, #f72585);
            }
            .cookie-banner-text p {
                margin: 0;
                font-size: 0.9rem;
                opacity: 0.9;
            }
            .cookie-banner-buttons {
                display: flex;
                gap: 0.8rem;
                flex-wrap: wrap;
            }
            .cookie-btn {
                padding: 0.6rem 1.2rem;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.2s;
            }
            .cookie-btn.accept-all {
                background: linear-gradient(135deg, var(--secundario, #f72585), #e53888);
                color: white;
            }
            .cookie-btn.necessary {
                background: transparent;
                border: 2px solid var(--gris, #6c757d);
                color: white;
            }
            .cookie-btn.settings {
                background: transparent;
                border: 2px solid var(--primario, #4361ee);
                color: white;
            }
            .cookie-btn:hover {
                transform: translateY(-2px);
                opacity: 0.9;
            }
            .cookie-settings-panel {
                max-width: 500px;
                margin: 1rem auto 0;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 16px;
                padding: 1rem;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .cookie-settings-panel h4 {
                margin: 0 0 1rem 0;
                color: white;
            }
            .cookie-setting {
                margin-bottom: 1rem;
                padding: 0.5rem;
                border-radius: 8px;
                background: rgba(255,255,255,0.05);
            }
            .cookie-setting label {
                display: flex;
                flex-direction: column;
                gap: 0.3rem;
                cursor: pointer;
            }
            .cookie-setting input {
                width: 18px;
                height: 18px;
                margin-right: 0.5rem;
                vertical-align: middle;
            }
            .cookie-setting span {
                font-size: 0.8rem;
                opacity: 0.7;
                margin-left: 1.8rem;
            }
            .cookie-settings-buttons {
                display: flex;
                gap: 0.8rem;
                justify-content: flex-end;
                margin-top: 1rem;
            }
            .cookie-btn.save {
                background: var(--primario, #4361ee);
                color: white;
            }
            .cookie-btn.close {
                background: var(--gris, #6c757d);
                color: white;
            }
            @media (max-width: 768px) {
                .cookie-banner-content {
                    flex-direction: column;
                    text-align: center;
                }
                .cookie-banner-text {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Eventos del banner
        document.getElementById('cookieAcceptAll')?.addEventListener('click', () => {
            saveConsent(true, true);
            loadGoogleAnalytics();
            loadAdSense();
            banner.remove();
        });
        
        document.getElementById('cookieAcceptNecessary')?.addEventListener('click', () => {
            saveConsent(false, false);
            banner.remove();
        });
        
        document.getElementById('cookieSettings')?.addEventListener('click', () => {
            const panel = document.getElementById('cookieSettingsPanel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });
        
        document.getElementById('cookieSaveSettings')?.addEventListener('click', () => {
            const analytics = document.getElementById('cookieAnalytics').checked;
            const marketing = document.getElementById('cookieMarketing').checked;
            saveConsent(analytics, marketing);
            if (analytics) loadGoogleAnalytics();
            if (marketing) loadAdSense();
            banner.remove();
        });
        
        document.getElementById('cookieCloseSettings')?.addEventListener('click', () => {
            document.getElementById('cookieSettingsPanel').style.display = 'none';
        });
    }
    
    // Inicializar
    function init() {
        loadScriptsBasedOnConsent();
        showCookieBanner();
    }
    
    // Ejecutar al cargar la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();