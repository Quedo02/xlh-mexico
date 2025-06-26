"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FB?: { XFBML: { parse: () => void } };
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function ScriptSocialEmbeds() {
  useEffect(() => {
    // Facebook
    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    fbScript.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    fbScript.onload = () => {
      window.FB?.XFBML.parse();
    };
    document.body.appendChild(fbScript);

    // Twitter
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    // Instagram
    const instaScript = document.createElement("script");
    instaScript.src = "https://www.instagram.com/embed.js";
    instaScript.async = true;
    instaScript.onload = () => {
      window.instgrm?.Embeds.process();
    };
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
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="sombra-logo card-red-social flex-fill d-flex flex-column">
              <h6 className="text-center mb-3">Última publicación en Facebook</h6>
              <div
                className="fb-post"
                data-href="https://www.facebook.com/XLHMexico/posts/pfbid02oPKKoPzotbhUXgDNN2LeZe342AqiJDgtCYujVSR8azf73wdqX1JMP2bWqY689eLbl"
                data-width="100%"
                data-show-text="true"
              ></div>
            </div>
          </div>

          {/* Twitter */}
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="sombra-logo card-red-social flex-fill d-flex flex-column">
              <h6 className="text-center mb-3">Último tweet</h6>
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/space/status/877996013147086848/photo/1"></a>
              </blockquote>
            </div>
          </div>

          {/* Instagram */}
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="sombra-logo card-red-social flex-fill d-flex flex-column">
              <h6 className="text-center mb-3">Última publicación</h6>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/xlhmexico/"
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
    </section>
  );
}
