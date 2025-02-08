"use client";

import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import { formatDateToLocal } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function Map({ markers }) {
  const customIcon = new Icon({
    iconUrl: "/icons8-stage-64.png",
    iconSize: [30, 30], // size of the icon
  });

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<p>${cluster.getChildCount()}</p>`,
      className:
        "flex! justify-center! items-center! bg-purple-900 rounded-[50%] text-[#fff] font-bold w-full h-full",
      iconSize: L.point(30, 30, true),
    });
  };

  return (
    <section className="relative">
      <MapContainer
        preferCanvas={true}
        center={[51.974077, 19.451946]}
        zoom={6}
        scrollWheelZoom={true}
        className="w-[100svw] h-[calc(100svh-56px)]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker) => (
            <Dialog key={marker.id}>
              <Marker
                alt={marker.alt}
                position={marker.position}
                icon={customIcon}
              >
                <Popup>
                  <DialogTrigger asChild>
                    <div className="text-center">
                      <p className="font-bold my-0!">{marker.popup}</p>
                      <Button className="cursor-pointer" variant={"ghost"}>
                        Szczegóły
                      </Button>
                    </div>
                  </DialogTrigger>
                </Popup>
              </Marker>
              <DialogContent className="flex flex-col justify-between items-center max-w-[60em] max-h-full overflow-y-hidden">
                <Image
                  src={marker.imageSrc}
                  alt={marker.imageAlt}
                  width={marker.imageWidth}
                  height={marker.imageHeight}
                />
                <DialogTitle className="my-0">
                  <Link
                    target="_blank"
                    className="hover:underline"
                    href={`/tags/${marker.slug}`}
                  >
                    {marker.alt}
                  </Link>
                </DialogTitle>
                <div className="flex flex-row justify-center gap-1">
                  {marker.fromDate && marker.endDate ? (
                    <p>
                      {formatDateToLocal(marker.fromDate.toString())} -{" "}
                      {formatDateToLocal(marker.endDate.toString())}
                    </p>
                  ) : marker.date && !marker.fromDate && !marker.endDate ? (
                    <p>{formatDateToLocal(marker.date.toString())}</p>
                  ) : (
                    <p>Brak daty</p>
                  )}
                </div>
                {marker.tickets && (
                  <Button variant={"ghost"} className="w-fit mx-auto">
                    <Link
                      target="_blank"
                      className="font-bold"
                      href={`${marker.tickets}`}
                    >
                      Bilety
                    </Link>
                  </Button>
                )}
                <DialogDescription>{marker.description}</DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <div className="absolute bottom-8 right-0 sm:bottom-0 sm:left-0 z-500 text-neutral-700 bg-neutral-100 font-normal px-[5px] text-[12px] w-fit">
        <a
          className="text-blue-500"
          target="_blank"
          href="https://icons8.com/icon/hWDCzzX8jyhy/stage"
        >
          Stage
        </a>{" "}
        icon by{" "}
        <a className="text-blue-500" target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </section>
  );
}
