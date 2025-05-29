"use client";

import L, { Icon } from "leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../dialog";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import { formatDateToLocal } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapLibreTileLayer } from "./map-libre-tile-layer";

export default function Map({ markers, genres }) {
  const center = [51.974077, 19.451946];
  const zoom = 6;
  const [dialog, setDialog] = useState(false);
  const [cityValue, setCityValue] = useState("");
  const [festValue, setFestValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [cityPopOpen, setCityPopOpen] = useState(false);
  const [festPopOpen, setFestPopOpen] = useState(false);
  const [genrePopOpen, setGenrePopOpen] = useState(false);

  const mapRef = useRef(null);
  const cities = new Set(markers.map((marker) => marker.location.city));
  const names = new Set(markers.map((marker) => marker.alt));
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

  const handleCityChange = function (val) {
    const filteredMarkers = markers.filter(
      (marker) => marker.location.city === val
    );
    setCityValue(val);
    setFilteredMarkers(filteredMarkers);
    if (mapRef.current != null) {
      mapRef.current.setView(filteredMarkers[0].position, 10, { duration: 1 });
    }
    setCityPopOpen(false);
  };

  const handleFestChange = function (val) {
    const filteredMarkers = markers.filter((marker) => marker.alt == val);
    setFestValue(val);
    setFilteredMarkers(filteredMarkers);
    if (mapRef.current != null) {
      mapRef.current.setView(filteredMarkers[0].position, 10, { duration: 1 });
    }
    setFestPopOpen(false);
  };

  const handleGenreChange = function (val) {
    const filteredMarkers = markers.filter((marker) =>
      marker.music_types?.some((g) => g.name === val)
    );

    setGenreValue(val);
    setFilteredMarkers(filteredMarkers);
    if (mapRef.current != null) {
      mapRef.current.setView(center, zoom, { duration: 1 });
    }
    setGenrePopOpen(false);
  };

  const handleReset = function () {
    setFilteredMarkers(markers);
    setCityValue("");
    setFestValue("");
    setGenreValue("");
    if (mapRef.current != null) {
      mapRef.current.setView(center, zoom, { duration: 1 });
    }
  };

  const customIcon = new Icon({
    iconUrl: "/icons8-stage-64.png",
    iconSize: [30, 30], // size of the icon
  });

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<p class="text-neutral-100">${cluster.getChildCount()}</p>`,
      className:
        "flex! justify-center! items-center! bg-teal-600 rounded-[50%] text-[#fff] font-bold w-full h-full",
      iconSize: L.point(30, 30, true),
    });
  };

  return (
    <section className="relative">
      <MapContainer
        ref={mapRef}
        preferCanvas={true}
        center={center}
        maxZoom={14}
        zoom={zoom}
        minZoom={zoom}
        scrollWheelZoom={true}
        className="w-[100svw] h-[calc(100svh-56px)]"
      >
        <MapLibreTileLayer
          attribution='&copy; <a href="https://openfreemap.org/" target="_blank">OpenFreeMap</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.openfreemap.org/styles/positron"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {filteredMarkers.map((marker) => (
            <Dialog key={marker.id}>
              <Marker
                alt={marker.alt}
                position={marker.position}
                icon={customIcon}
              >
                <Popup closeButton={false} closeOnEscapeKey offset={[0, 5]}>
                  <div className="text-center flex flex-col gap-4">
                    <h4 className="font-bold text-[16px]">{marker.popup}</h4>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer" variant={"default"}>
                        Szczegóły
                      </Button>
                    </DialogTrigger>
                  </div>
                </Popup>
              </Marker>
              <DialogContent className="border-none flex flex-col justify-between items-center max-w-[60em] max-h-full overflow-y-hidden">
                <Image
                  src={marker.imageSrc}
                  alt={marker.imageAlt}
                  width={marker.imageWidth}
                  height={marker.imageHeight}
                  className="rounded-sm aspect-video"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <DialogTitle className="my-0">
                  <Link
                    target="_blank"
                    className="hover:underline text-teal-400"
                    href={`/tags/${marker.slug}`}
                  >
                    {marker.alt}
                  </Link>
                </DialogTitle>

                <div className="flex flex-col items-center justify-center">
                  <p className="text-foreground m-0">
                    {marker.location.city} - {marker.location.place}
                  </p>
                  {marker.fromDate && marker.endDate ? (
                    <p className="m-0">
                      {formatDateToLocal(marker.fromDate.toString())} -{" "}
                      {formatDateToLocal(marker.endDate.toString())}
                    </p>
                  ) : marker.date && !marker.fromDate && !marker.endDate ? (
                    <p className="m-0">
                      {formatDateToLocal(marker.date.toString())}
                    </p>
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
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer z-900 absolute left-[50%] translate-x-[-50%] top-10  w-[200px]"
              variant={"default"}
              onClick={() => setDialog(true)}
            >
              Filtruj
            </Button>
          </DialogTrigger>
          <DialogContent className="border-none flex flex-col items-center justify-start max-w-[60em] h-130 md:h-120">
            <DialogHeader>
              <DialogTitle className="m-0">Filtruj mapę</DialogTitle>
            </DialogHeader>
            <DialogDescription className="m-0">
              Wybierz jeden z poniszych filtrów
            </DialogDescription>
            <div className="flex flex-col justify-around md:flex-row gap-4">
              <Popover open={cityPopOpen} onOpenChange={setCityPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={festValue !== "" || genreValue !== ""}
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityPopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {cityValue
                      ? [...cities].find((city) => city === cityValue)
                      : "Wybierz miasto..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                  <Command>
                    <CommandInput
                      placeholder="Wybierz miasto..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak miasta</CommandEmpty>
                      <CommandGroup>
                        {[...cities].sort().map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={(currentValue) => {
                              handleCityChange(currentValue);
                              setDialog(false);
                            }}
                          >
                            {city}
                            <Check
                              className={cn(
                                "ml-auto",
                                cityValue === city ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Popover open={festPopOpen} onOpenChange={setFestPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={cityValue !== "" || genreValue !== ""}
                    variant="outline"
                    role="combobox"
                    aria-expanded={festPopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {festValue
                      ? [...names].find((name) => name === festValue)
                      : "Wybierz festiwal..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                  <Command>
                    <CommandInput
                      placeholder="Wybierz festiwal..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak festiwalu</CommandEmpty>
                      <CommandGroup>
                        {[...names].sort().map((name) => (
                          <CommandItem
                            key={name}
                            value={name}
                            onSelect={(currentValue) => {
                              handleFestChange(currentValue);
                              setDialog(false);
                            }}
                          >
                            {name}
                            <Check
                              className={cn(
                                "ml-auto",
                                festValue === name ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Popover open={genrePopOpen} onOpenChange={setGenrePopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={festValue !== "" || cityValue !== ""}
                    variant="outline"
                    role="combobox"
                    aria-expanded={genrePopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {genreValue
                      ? [...genres].find((genre) => genre === genreValue)
                      : "Wybierz gatunek..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                  <Command>
                    <CommandInput
                      placeholder="Wybierz gatunek..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak gatunku</CommandEmpty>
                      <CommandGroup>
                        {[...genres].sort().map((genre) => (
                          <CommandItem
                            key={genre}
                            value={genre}
                            onSelect={(currentValue) => {
                              handleGenreChange(currentValue);
                              setDialog(false);
                            }}
                          >
                            {genre}
                            <Check
                              className={cn(
                                "ml-auto",
                                genreValue === genre
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </DialogContent>
        </Dialog>
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
