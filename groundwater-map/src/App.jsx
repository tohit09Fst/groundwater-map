import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geoUrl = "/india.geojson";

const contaminationData = {
  Rajasthan: "Fluoride",
  Punjab: "Uranium",
  Bihar: "Arsenic",
  "West Bengal": "Arsenic",
  Gujarat: "Salinity",
  Karnataka: "Nitrate",
};

const contaminationColors = {
  Fluoride: "#22d3ee",
  Arsenic: "#3b82f6",
  Uranium: "#facc15",
  Nitrate: "#22c55e",
  Safe: "#1e293b",
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 text-white flex flex-col items-center p-6">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
          Groundwater Contamination Map of India
        </h1>

        <p className="text-gray-400">
          Hover on states to see groundwater contamination
        </p>
      </div>

      {/* Map */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6">

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [82, 22],
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName =
                  geo.properties.st_nm || geo.properties.NAME_1 || geo.properties.name;

                const contamination =
                  contaminationData[stateName] || "Safe";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      toast.info(
                        `${stateName} → ${contamination}`,
                        {
                          position: "top-right",
                          autoClose: 1200,
                          hideProgressBar: true,
                          theme: "dark",
                        }
                      );
                    }}
                    style={{
                      default: {
                        fill:
                          contamination !== "Safe"
                            ? contaminationColors[contamination]
                            : "#1e293b",
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s ease",
                      },

                      hover: {
                        fill:
                          contamination !== "Safe"
                            ? contaminationColors[contamination]
                            : "#334155",
                        outline: "none",
                        cursor: "pointer",
                      },

                      pressed: {
                        fill: "#0ea5e9",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="mt-8 w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg">
          <div className="w-5 h-5 bg-cyan-400 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-gray-300">Fluoride</p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg">
          <div className="w-5 h-5 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-gray-300">Arsenic</p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg">
          <div className="w-5 h-5 bg-yellow-400 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-gray-300">Uranium</p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg">
          <div className="w-5 h-5 bg-green-400 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-gray-300">Nitrate</p>
        </div>

      </div>

      {/* References */}
      <div className="mt-10 w-full max-w-3xl bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6">

        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          References
        </h2>

        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Central Ground Water Board (CGWB)</li>
          <li>• WHO Drinking Water Guidelines</li>
          <li>• NITI Aayog Water Quality Reports</li>
        </ul>
      </div>

      {/* Toast container */}
      <ToastContainer />

    </div>
  );
}

export default App;