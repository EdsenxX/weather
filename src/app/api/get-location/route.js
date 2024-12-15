import requestIp from "request-ip";

export async function GET(req) {
  const clientIp = requestIp.getClientIp(req) || "8.8.8.8"; // IP predeterminada para pruebas

  try {
    const geoRes = await fetch(`http://ip-api.com/json/${clientIp}`);
    if (!geoRes.ok) {
      throw new Error(`Error en la respuesta de la API: ${geoRes.statusText}`);
    }

    const locationData = await geoRes.json();

    return new Response(
      JSON.stringify({
        ip: clientIp,
        city: locationData.city,
        country: locationData.country,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo obtener la ubicación." }),
      {
        status: 500,
      }
    );
  }
}
