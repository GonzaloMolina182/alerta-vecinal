import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationSelector({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });
  return null;
}

export default function App() {
  const [reportes, setReportes] = useState([]);
  const [zona, setZona] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    fetchReportes();
    const channel = supabase
      .channel("realtime:reportes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reportes" },
        () => fetchReportes()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchReportes() {
    const { data, error } = await supabase
      .from("reportes")
      .select("*")
      .order("fecha", { ascending: false });

    if (error) {
      console.error("Error trayendo reportes:", error);
    } else {
      setReportes(data);
    }
  }

  function obtenerUbicacion() {
    if (!navigator.geolocation) {
      alert("Geolocalización no disponible");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        alert("Error al obtener ubicación: " + err.message);
      }
    );
  }

  async function enviarReporte(e) {
    e.preventDefault();
    if (!zona.trim() || !mensaje.trim()) {
      alert("Completá la zona y el mensaje");
      return;
    }
    if (lat === null || lng === null) {
      alert("Primero elegí u obtené tu ubicación");
      return;
    }

    const { error } = await supabase.from("reportes").insert([
      {
        zona: zona.trim(),
        mensaje: mensaje.trim(),
        fecha: new Date().toISOString(),
        lat,
        lng,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Reporte enviado");
      setZona("");
      setMensaje("");
      setLat(null);
      setLng(null);
    }
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h1
        style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem" }}
      >
        📢 Alerta Vecinal
      </h1>

      <form onSubmit={enviarReporte} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          style={{ marginRight: 10, padding: 8, width: 180 }}
        />
        <input
          type="text"
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={{ marginRight: 10, padding: 8, width: 280 }}
        />
        <button
          type="button"
          onClick={obtenerUbicacion}
          style={{ marginRight: 10, padding: "8px 12px" }}
        >
          Obtener ubicación real
        </button>
        <button type="submit" style={{ padding: "8px 12px" }}>
          Enviar
        </button>
      </form>

      <div style={{ height: "500px", marginBottom: "2rem" }}>
        <MapContainer
          center={[-34.61, -58.38]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationSelector setLat={setLat} setLng={setLng} />
          {reportes.map((r) =>
            r.lat && r.lng ? (
              <Marker key={r.id} position={[r.lat, r.lng]}>
                <Popup>
                  <strong>{r.zona}</strong>: {r.mensaje}
                  <br />
                  <small>{new Date(r.fecha).toLocaleString()}</small>
                </Popup>
              </Marker>
            ) : null
          )}
          {lat && lng && (
            <Marker position={[lat, lng]}>
              <Popup>Ubicación seleccionada</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>
          📞 Números de Emergencia
        </h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>Defensa Civil:</strong> 103
          </li>
          <li>
            <strong>Bomberos:</strong> 100
          </li>
          <li>
            <strong>Policía:</strong> 911
          </li>
          <li>
            <strong>SAME (Emergencias médicas):</strong> 107
          </li>
          <li>
            <strong>Línea gratuita de Provincia:</strong> 147
          </li>
        </ul>
      </section>

      <section>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>
          💧 Cómo protegerte en caso de inundación
        </h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>📍 Evitá zonas bajas y calles inundadas.</li>
          <li>🔌 Desconectá la energía eléctrica si hay riesgo de que el agua ingrese a tu casa.</li>
          <li>📦 Subí objetos de valor a lugares altos.</li>
          <li>🧃 Almacená agua potable y alimentos no perecederos.</li>
          <li>📻 Mantenete informado a través de medios oficiales o radio local.</li>
          <li>🚫 No uses el auto si no es imprescindible.</li>
          <li>📲 Tené el celular cargado para emergencias.</li>
        </ul>
      </section>
    </div>
  );
}
