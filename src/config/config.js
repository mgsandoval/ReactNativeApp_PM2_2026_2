// export const API_BASE_URL = "http://localhost:81/movil2"; // Base de datos localhost
export const API_BASE_URL = "http://marlon.bonaquian.com/"; // Base de datos nube
// export const API_BASE_URL = "http://localhost:81/movil2"; // Base de datos en casa

export const API_URLS = {
    CHECKDB: `${API_BASE_URL}/api/auth/checkdb.php`,
    LOGIN: `${API_BASE_URL}/api/auth/login.php`,
    REGISTRAR_DISPOSITIVO: `${API_BASE_URL}/core/dispositivo.php`,
    REGISTRAR_BITACORA: `${API_BASE_URL}/core/logger.php`
};
