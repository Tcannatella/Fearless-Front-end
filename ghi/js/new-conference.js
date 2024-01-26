window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      for (const location of data.locations) {
        let option = document.createElement("option");
        option.value = location.id;
        option.innerHTML = location.name;
        document.getElementById("location").appendChild(option);
      }

      const formTag = document.getElementById("create-conference-form");
      formTag.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);

        const blueberry = "http://localhost:8000/api/conferences/";
        const fetchConfig = {
          method: "post",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(blueberry, fetchConfig);
        if (response.ok) {
          formTag.reset();
          const newLocation = await response.json();
          console.log(newLocation);
        }
      });
    }
  });
