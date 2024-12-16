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

### Arquitectura de la aplicación:
- Se utilizó Next.js con el App Router, aprovechando las últimas características de React y Next.js para una mejor performance y SEO.
- Se implementó una estructura de componentes modular para facilitar el mantenimiento y la reutilización del código.

### Gestión del estado:
- Se eligió Zustand como biblioteca de gestión de estado por su simplicidad y eficiencia en comparación con alternativas más complejas como Redux.
- El estado global almacena la información del clima de las ciudades, permitiendo un acceso fácil desde diferentes componentes.

### Diseño y estilización:
- Se utilizó Tailwind CSS para un desarrollo rápido y consistente de la interfaz de usuario.
- Se implementó un diseño responsivo para garantizar una buena experiencia en dispositivos móviles y de escritorio.
- Se incluyó un tema oscuro para mejorar la accesibilidad y la preferencia del usuario.

### Manejo de datos:
- Se implementó una capa de abstracción para las llamadas a la API del clima, facilitando posibles cambios futuros de proveedor.
- Se utilizó el almacenamiento en caché para reducir las llamadas innecesarias a la API y mejorar el rendimiento.

### Filtrado y búsqueda:
- Se implementaron filtros de temperatura y condiciones climáticas para permitir a los usuarios encontrar rápidamente la información que necesitan.
- La función de búsqueda permite a los usuarios agregar nuevas ciudades a la lista.

### Optimización del rendimiento:
- Se utilizaron componentes del lado del servidor cuando fue posible para mejorar el tiempo de carga inicial.
- Se implementó la carga diferida (lazy loading) para componentes pesados como los gráficos.

### Pruebas:
- Se escribieron pruebas unitarias para los componentes principales y las funciones de utilidad.
- Se implementaron pruebas de integración para asegurar el correcto funcionamiento de los flujos principales de la aplicación.

### Accesibilidad:
- Se siguieron las mejores prácticas de accesibilidad, incluyendo el uso correcto de etiquetas ARIA y asegurando un buen contraste de colores.