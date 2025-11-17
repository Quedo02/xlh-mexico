"use client";

import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayColor?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  overlayColor = "rgba(238, 49, 107, 0.5)",
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroSectionProps) {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="overlay"
        style={{ backgroundColor: overlayColor }}
      ></div>
      <div className="hero-text-container">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>

        {(primaryButtonText || secondaryButtonText) && (
          <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
            {primaryButtonText && primaryButtonLink && (
              <Link href={primaryButtonLink} className="btn btn-primary btn-lg">
                {primaryButtonText}
              </Link>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link href={secondaryButtonLink} className="btn btn-outline-light btn-lg">
                {secondaryButtonText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
