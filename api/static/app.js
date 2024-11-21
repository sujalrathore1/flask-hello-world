let apiResponse = null; // Store the response from the backend

// Function to update the displayed response based on selected filters
const updateFilteredResponse = () => {
    const filterSelect = document.getElementById("filter");
    const selectedFilters = Array.from(filterSelect.selectedOptions).map(option => option.value);
    const responseDiv = document.getElementById("filteredResponse");
    const activeFiltersDiv = document.getElementById("activeFilters");

    if (!apiResponse) {
        responseDiv.innerText = "No Data";
        return;
    }

    // If no filters are selected, show all data
    if (selectedFilters.length === 0) {
        responseDiv.innerText = `Numbers: ${apiResponse.numbers.join(", ")}\nAlphabets: ${apiResponse.alphabets.join(", ")}`;
        activeFiltersDiv.innerHTML = ""; // Clear active filters section
        return;
    }

    // Display active filters with close icons
    activeFiltersDiv.innerHTML = ""; // Clear current filters
    selectedFilters.forEach(filter => {
        const filterDiv = document.createElement("div");
        filterDiv.className = "filter-tag";

        const filterText = document.createElement("span");
        filterText.innerText = filter.charAt(0).toUpperCase() + filter.slice(1); // Capitalize first letter

        const closeIcon = document.createElement("span");
        closeIcon.innerText = "✖"; // Close icon
        closeIcon.className = "close-icon";

        // Add click event to remove filter
        closeIcon.onclick = () => {
            removeFilter(filter);
        };

        filterDiv.appendChild(filterText);
        filterDiv.appendChild(closeIcon);
        activeFiltersDiv.appendChild(filterDiv);
    });

    // Filter response based on selected filters
    let filteredData = "";
    if (selectedFilters.includes("numbers")) {
        filteredData += `Numbers: ${apiResponse.numbers.join(", ")}\n`;
    }
    if (selectedFilters.includes("alphabets")) {
        filteredData += `Alphabets: ${apiResponse.alphabets.join(", ")}\n`;
    }

    responseDiv.innerText = filteredData || "No Data"; // Show filtered data or default message
};

// Function to remove a filter from the dropdown
const removeFilter = filter => {
    const filterSelect = document.getElementById("filter");
    const options = Array.from(filterSelect.options);

    // Deselect the filter in the dropdown
    options.forEach(option => {
        if (option.value === filter) {
            option.selected = false;
        }
    });

    // Update the response after removing the filter
    updateFilteredResponse();
};

// Submit API data and fetch response
const submitApiData = async () => {
    const apiInput = document.getElementById("apiInput").value;

    try {
        const response = await fetch("/bfhl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: apiInput
        });

        if (response.ok) {
            apiResponse = await response.json();
            updateFilteredResponse(); // Update response display
        } else {
            document.getElementById("filteredResponse").innerText = "Error: Invalid Response";
        }
    } catch (error) {
        document.getElementById("filteredResponse").innerText = "Error: Unable to fetch data";
    }
};

// Attach event listeners
document.getElementById("submitButton").addEventListener("click", submitApiData);
document.getElementById("filter").addEventListener("change", updateFilteredResponse);
