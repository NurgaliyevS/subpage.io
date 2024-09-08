import React, { useState, useEffect, useRef } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import PhoneMockup from "../components/PhoneMockup";

function Style() {
  const { data: session } = useSession();
  const [styleSettings, setStyleSettings] = useState({
    theme: "light",
    font: "Roboto",
  });
  const [previewSettings, setPreviewSettings] = useState({
    theme: "light",
    font: "Roboto",
  });
  const [landingPageId, setLandingPageId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);
  const [pageContent, setPageContent] = useState({});
  const [productContent, setProductContent] = useState({});

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
  ];

  const fonts = [
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Raleway",
    "Poppins",
    "Oswald",
    "Source Sans Pro",
    "Slabo 27px",
    "Merriweather",
  ];

  useEffect(() => {
    if (isInitialMount.current) {
      if (session?.user) {
        fetchLandingPage();
        isInitialMount.current = false;
      }
    }
  }, [session]);

  const fetchLandingPage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/landing-page", {
        params: { userId: session.user.id },
      });
      if (response.data && response.data.length > 0) {
        const landingPage = response.data[0];
        setLandingPageId(landingPage._id);
        const initialSettings = landingPage.customizations || { theme: "light", font: "Roboto" };
        setStyleSettings(initialSettings);
        setPreviewSettings(initialSettings);
        setPageContent(landingPage.content || {});
        setProductContent(landingPage.content.products || {});
      }
    } catch (error) {
      console.error("Error fetching landing page:", error);
      toast.error("Failed to fetch style settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = (theme) => {
    setPreviewSettings((prev) => ({ ...prev, theme }));
  };

  const handleFontChange = (font) => {
    setPreviewSettings((prev) => ({ ...prev, font }));
  };

  const handleSubmit = async () => {
    try {
      if (landingPageId) {
        await axios.put(`/api/admin/landing-page?id=${landingPageId}`, {
          customizations: previewSettings,
        });
        setStyleSettings(previewSettings);
        toast.success("Style settings updated successfully");
      } else {
        toast.error("No landing page found to update");
      }
    } catch (error) {
      console.error("Error updating style settings:", error);
      toast.error("Failed to update style settings");
    }
  };

  const renderSkeleton = () => (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin />
      <div className="md:flex p-4 h-full max-w-7xl mx-auto overflow-auto">
        <div className="max-w-3xl mx-auto md:basis-3/5 space-y-4 overflow-y-auto pb-44">
          <div className="card bg-white shadow-lg animate-pulse">
            <div className="card-body">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="card bg-white shadow-lg animate-pulse">
            <div className="card-body">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
        </div>
        <div className="hidden md:block md:basis-2/5 mx-auto max-w-sm">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-96 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return renderSkeleton();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin />
      <div className="md:flex p-4 h-full max-w-7xl mx-auto overflow-auto">
        <div className="max-w-3xl mx-auto md:basis-3/5 space-y-4 overflow-y-auto pb-44">
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Themes</h2>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    className={`btn btn-sm ${
                      previewSettings.theme === theme
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                    onClick={() => handleThemeChange(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Fonts</h2>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((font) => (
                  <button
                    key={font}
                    className={`btn btn-sm ${
                      previewSettings.font === font
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                    onClick={() => handleFontChange(font)}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="btn btn-primary w-full" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div className="hidden md:block md:basis-2/5 mx-auto max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <PhoneMockup content={pageContent} product={productContent} customizations={previewSettings} />
        </div>
      </div>
    </div>
  );
}

export default Style;
