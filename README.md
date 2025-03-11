# Daily Trends

## Descripción
Se pide realizar un API (DailyTrends) que exponga un feed de noticias. Este feed es un agregador de noticias de diferentes periódicos. DailyTrends es un periódico que une las portadas de los periódicos número uno.
					
Cuando un usuario abre DailyTrends, se encuentra con las 5 noticias de portada de El País y El Mundo del día en el que lo abre, además se pueden añadir noticias a mano desde el API.

## Requisitos Previos
Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente en tu entorno local:
- [**Node.js v18.x (LTS)**](https://nodejs.org/en/download/) - Necesario para ejecutar la API.
- [**Docker**](https://www.docker.com/products/docker) - Utilizado para ejecutar MongoDB en un contenedor.
- [**VS Code**](https://code.visualstudio.com/download/) - Utilizado para el desarrollo.

## Configuración
### 1. Configura **Docker Desktop**
Instala Docker Desktop. Si eres completamente nuevo en Docker, primero lee [Get started | Docker Docs](https://docs.docker.com/get-started/).
- Descarga para [Mac](https://docs.docker.com/desktop/install/mac-install/)
- Descarga para [Windows](https://docs.docker.com/desktop/install/windows-install/)
- Descarga para [Linux](https://docs.docker.com/desktop/install/linux-install/)

### 2. Configura tu archivo local `.env`:
Crea un archivo `.env` en el directorio raíz y actualiza las **variables de entorno** necesarias.

Ejemplo:
```
MONGO_URI=mongodb://admin:pass@localhost:27017/dailytrends?authSource=admin
PORT=3000
```

### 3. Instala las dependencias
- Instala los paquetes del archivo `package-lock-json` en la carpeta `/node_modules`:
```shell
npm install
```

## Ejecución
### Opción 1: Modo de Desarrollo
Para iniciar la API en modo de desarrollo con recarga en caliente:
```
npm run dev
```
### Opción 2: Modo de Depuración
Para iniciar la aplicación con depuración habilitada:
```
npm run debug
```

## Endpoints Disponibles
Los siguientes endpoints están disponibles:
| Método | Endpoint         | Descripción |
|--------|-----------------|-------------|
| **GET**    | `/feeds`         | Recupera todos los feeds. |
| **GET**    | `/feeds/:id`     | Recupera un solo feed por ID. |
| **POST**   | `/feeds`         | Crea un nuevo feed manualmente. |
| **PUT**    | `/feeds/:id`     | Actualiza un feed existente por ID. |
| **DELETE** | `/feeds/:id`     | Elimina un feed por ID. |
| **POST**   | `/feeds/scrape`  | Inicia el proceso de scraping para obtener noticias de El País y El Mundo. |

Cada solicitud debe enviarse como **JSON** e incluir los parámetros necesarios cuando corresponda.

Ejemplo de cuerpo de solicitud **POST** `/feeds`:
```json
{
  "title": "Estos son los 100 mejores colegios de España",
  "url": "https://www.elmundo.es/mejores-colegios.html",
  "source": "El Mundo"
}
```

## Estructura del Código
La aplicación sigue una arquitectura por capas para una mejor organización del código.
- `config/*`: Directorio principal que contiene las configuraciones del servidor.
- `controllers/*`: Controladores de la aplicación que también contienen la lógica principal del negocio.
- `models/*`: Clases de modelos de la base de datos.
- `routes/*`: Rutas de la aplicación.
- `services/*`: Servicios utilizados como clientes HTTP.
- `tests/*`: Carpeta principal de pruebas unitarias.
- `server.ts`: Archivo principal de ejecución del servidor.

## Calidad del Código
### **1. Ejecución de Pruebas**
Este proyecto utiliza **Jest** y **Supertest** para las pruebas unitarias.
Para ejecutar las pruebas, usa el siguiente comando:
```
npm run test
```
### **2. Formateo del Código**
Asegúrate de que el código siga el formato correcto con:
```
npm run lint
```

## Arquitectura
Daily Trends está estructurado en diferentes capas para garantizar la separación de preocupaciones.

![Diagrama](/docs/architecture_diagram.png)

- **Client**: Postman, navegador o cualquier consumidor de API que envíe solicitudes HTTP.
- **Backend Services**: Los controladores de Express manejan las solicitudes y respuestas.
- **Middleware**: Capa intermedia que gestiona la validación, y manejo de errores antes de llegar a los servicios.
- **Scraping Layer**: Responsable de ejecutar procesos de scraping concurrentes para extraer datos.
- **Database**: Utiliza MongoDB (a través de Mongoose) para la persistencia.
