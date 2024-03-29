window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/states/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      for (const state of data.states) {
        let option = document.createElement("option");
        option.value = state.abbreviation;
        option.innerHTML = state.name;
        document.getElementById("state").appendChild(option);
      }

      const formTag = document.getElementById("create-location-form");
      formTag.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("need to submit the form data");

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);

        const locationUrl = "http://localhost:8000/api/locations/";
        const fetchConfig = {
          method: "post",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          formTag.reset();
          const newLocation = await response.json();
          console.log(newLocation);
        }
      });
    }
  });
