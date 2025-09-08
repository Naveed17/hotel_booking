"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHotelFilters } from "@src/context/hotelFilterContext";
import { formatPrice } from "@src/utils/formatNumber";

export default function HotelsMap() {
    const { data: hotels } = useHotelFilters(); // 🔹 fetch hotels dynamically

    // Custom Price Marker
    const getMarkerIcon = (price: number, currency: string) =>
        new L.DivIcon({
            html: `<div style="
        background:#fff;
        padding:4px 12px;
        box-shadow: 0px 4.61px 22.47px 0px rgba(167, 167, 167, 0.25);
        border:1.5px solid rgba(212, 212, 212, 1);
        text-align:center;
        min-width:60px;
        border-radius:20px;
        box-shadow:0 2px 6px rgba(0,0,0,0.2);
        font-size:14px;
        font-weight:600;
        line-height:20px;
      ">${formatPrice(price, currency)}</div>`,
            className: "",
        });

    // Default center (UK-ish) or first hotel
    const defaultCenter =
        hotels && hotels.length > 0
            ? [parseFloat(hotels[0].latitude), parseFloat(hotels[0].longitude)]
            : [51.0, -1.8];

    return (
        <MapContainer
            center={defaultCenter as [number, number]}
            zoom={12}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            {hotels?.map((hotel: any) => (
                <Marker
                    key={hotel.hotel_id}
                    position={[
                        parseFloat(hotel.latitude),
                        parseFloat(hotel.longitude),
                    ]}
                    icon={getMarkerIcon(hotel.actual_price, hotel.currency)}
                >
                    <Popup>
                        <strong>{hotel.name}</strong>
                        <br />
                        {hotel.location}
                        <br />
                        Price: {formatPrice(hotel.actual_price, hotel.currency)}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
export { HotelsMap }
