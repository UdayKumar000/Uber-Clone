import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description || suggestion.name);
    } else if (activeField === "destination") {
      setDestination(suggestion.description || suggestion.name);
      setVehiclePanel(true);
      // setPanelOpen(false);
    }
  };

  // Use suggestions from backend if available, otherwise use default locations
  const locationsToShow = suggestions;

  return (
    <div>
      {locationsToShow.map(function (location, key) {
        return (
          <div
            key={key}
            onClick={() => handleSuggestionClick(location)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">
              {typeof location === "string"
                ? location
                : location.description || location.name}
            </h4>
          </div>
        );
      })}
      {suggestions && suggestions.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p>No suggestions found. Try typing a different location.</p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
