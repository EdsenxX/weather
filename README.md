# Weather App

Puedes acceder al proyecto en producción en [https://weather.edsen.dev](https://weather.edsen.dev)

## Requisitos previos

- Node.js (v22 o superior)
- Yarn o npm
- Contar con una API KEY de [OpenWeather](https://openweathermap.org)

## Pasos para ejecutar el proyecto en desarrollo

1. Clonar el repositorio:

```bash
git clone https://github.com/EdsenxX/weather
```

2. Instalar las dependencias:

```bash
cd weather-app
npm install
# or
yarn install
```

3. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_API_KEY
```

4. Ejecutar el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
```

5. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto en acción.

## Pasos para ejecutar pruebas unitarias

1. Instalar las dependencias de pruebas:

```bash
npm install
# or
yarn install
```

2. Ejecutar los tests unitarios:

```bash
npm run test
# or
yarn test
```

## Explicación de decisiones técnicas
