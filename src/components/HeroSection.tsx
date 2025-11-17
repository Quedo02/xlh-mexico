"use client";

import React, { useEffect, useState } from "react";

interface HeroSectionProps {
  sectionName: string;
  title?: string;
  subtitle?: string;
  overlayColor?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

type Media = { url: string; alt?: string; caption?: string };
type SlotMedia = { media: Media };
type MediaSlot = { slotMedias: SlotMedia[] };

export default function HeroSection({
  sectionName,
  title,
  subtitle,
  overlayColor = "rgba(0, 0, 0, 0.45)",
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroSectionProps) {
  const [image, setImage] = useState<Media | null>(null);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const configRes = await fetch("/api/config/slots");
        const configData = await configRes.json();
        const config = configData?.config || {};

        const slotName = config[sectionName];

        if (!slotName) {
          setImage(null);
          setBgUrl(null);
          setLoading(false);
          return;
        }

        const slotRes = await fetch(`/api/media/slots?slot=${slotName}`);
        const slotData = await slotRes.json();
        const slot: MediaSlot | undefined = slotData.data?.[0];

        const img = slot?.slotMedias?.[0]?.media || null;
        setImage(img);

        const candidate = img?.url ? img.url.replace(/ /g, "%20") : null;

        if (candidate) {
          const pre = new Image();
          pre.onload = () => {
            setBgUrl(candidate);
            setLoading(false);
          };
          pre.onerror = () => {
            setBgUrl(null);
            setLoading(false);
          };
          pre.src = candidate;
        } else {
          setBgUrl(null);
          setLoading(false);
        }
      } catch (err) {
        setBgUrl(null);
        setImage(null);
        setLoading(false);
      }
    };

    load();
  }, [sectionName]);

  return (
    <section
      aria-roledescription="hero"
      className="hero-section rounded-b-3xl shadow-xl"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >
      {/* Fallback sin imagen */}
      {!bgUrl && <div className="hero-bg" />}

      {/* Overlay desde CSS + color dinámico */}
      <div
        className="overlay"
        style={{
          backgroundColor: overlayColor,
          backgroundImage: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0.15) 0%,
              rgba(0,0,0,0.35) 40%,
              rgba(0,0,0,0.60) 100%
            )
          `,
        }}
      />

      {/* Texto */}
      <div className="hero-text-container">
        {title && <h1 className="hero-title">{title}</h1>}

        {subtitle && (
          <p className="hero-subtitle">
            {subtitle}
          </p>
        )}

        {(primaryButtonText || secondaryButtonText) && (
          <div className="mt-6 flex gap-4 justify-center flex-wrap">
            {primaryButtonText && primaryButtonLink && (
              <a
                href={primaryButtonLink}
                className="
                  px-6 py-2.5 bg-white/90 text-black font-semibold 
                  rounded-lg shadow-md hover:bg-white transition
                "
              >
                {primaryButtonText}
              </a>
            )}

            {secondaryButtonText && secondaryButtonLink && (
              <a
                href={secondaryButtonLink}
                className="
                  px-6 py-2.5 border border-white text-white rounded-lg 
                  hover:bg-white hover:text-black transition
                "
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="absolute bottom-3 right-3 text-white text-sm opacity-70">
          Cargando...
        </div>
      )}
    </section>
  );
}
