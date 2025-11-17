"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FB?: { XFBML: { parse: () => void } };
    twttr?: { widgets: { load: () => void } };
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function ScriptSocialEmbeds() {
  useEffect(() => {
    // Facebook Page Plugin
    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    fbScript.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    fbScript.onload = () => window.FB?.XFBML.parse();
    document.body.appendChild(fbScript);

    // Twitter Widgets
    const twitterScript = document.createElement("script");
    twitterScript.async = true;
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.onload = () => window.twttr?.widgets.load();
    document.body.appendChild(twitterScript);

    // Instagram Embed
    const instaScript = document.createElement("script");
    instaScript.async = true;
    instaScript.src = "https://www.instagram.com/embed.js";
    instaScript.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(instaScript);
  }, []);

  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="titulo-seccion text-center mb-4">
          Eventos en nuestras redes
        </h2>

        <div className="row g-4 justify-content-center align-items-stretch">
          {/* Facebook */}
          <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="sombra-logo card-red-social flex-fill d-flex flex-column h-100">
              <h6 className="text-center mb-3">Facebook Timeline</h6>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div
                  className="fb-page"
                  data-href="https://www.facebook.com/XLHMexico"
                  data-tabs="timeline"
                  data-width=""
                  data-height="510"
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                ></div>
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="sombra-logo card-red-social flex-fill d-flex flex-column h-100">
              <h6 className="text-center mb-3">Último tweet</h6>
              <div className="flex-grow-1 d-flex align-items-start justify-content-center">
                <blockquote className="twitter-tweet">
                  <a href="https://twitter.com/space/status/877996013147086848/photo/1"></a>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="sombra-logo card-red-social flex-fill d-flex flex-column h-100">
              <h6 className="text-center mb-3">Última publicación</h6>
              <div className="flex-grow-1 d-flex align-items-start justify-content-center">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DGgpW7Mt4O2/"
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    margin: "0 auto",
                    maxWidth: "100%",
                  }}
                ></blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
