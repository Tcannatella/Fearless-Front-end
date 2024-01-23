window.addEventListener('DOMContentLoaded', async () => {
  await getConferences()
 });


 function createCard(name, description, pictureUrl, start, end, locationName) {
     const formattedStart = new Date(start).toLocaleDateString()
     const formattedEnd = new Date(end).toLocaleDateString()
     return `
       <div class="card mb-4 shadow-lg">
         <img alt="..." src="${pictureUrl}" class="card-img-top">
         <div class="card-body">
           <h5 class="card-title">${name}</h5>
           <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
           <p class="card-text">${description}</p>
         </div>
         <div class="card-footer">
             ${formattedStart} - ${formattedEnd}
          </div>
       </div>
     `;
   }

   function createHorizontalCard(name, description, pictureUrl, start, end, locationName) {

     const formattedStart = new Date(start).toLocaleDateString()
     const formattedEnd = new Date(end).toLocaleDateString()
     return `
     <div class="col">
       <div class="card mb-4 shadow">
         <img alt="..." src="${pictureUrl}" class="card-img-top">
         <div class="card-body">
           <h5 class="card-title">${name}</h5>
           <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
           <p class="card-text">${description}</p>
         </div>
         <div class="card-footer">
             ${formattedStart}-${formattedEnd}
         </div>
       </div>
     </div>
     `;
   }


 async function getConferences() {
     try {

         const url = 'http://localhost:8000/api/conferences/';
         const response = await fetch(url);

         if (!response.ok){
             return alert(
                 `${response.status}: ${response.url} ${response.statusText}`
               );
         } else {
             const data = await response.json()
             console.log('data', data)
             const conferences = data.conferences;
             for (let i = 0; i < conferences.length; i++){
                 const conference = conferences[i];

                 const detailUrl = `http://localhost:8000${conference.href}`;
                 const detailResponse = await fetch(detailUrl);
                 if (!detailResponse.ok) {
                   return alert(
                     `${response.status}: ${response.url} ${response.statusText}`
                   );
                 } else {

                     const details = await detailResponse.json();
                     console.log('details', details)
                     const title = details.conference.name;
                     const description = details.conference.description;
                     const pictureUrl = details.conference.location.picture_url;
                     const starts = details.conference.starts
                     const ends = details.conference.ends
                     const locationName = details.conference.location.name


                     if (i < 2){
                         const html = createCard(title, description, pictureUrl, starts, ends, locationName);
                         const column = document.querySelector('.col');
                         column.innerHTML += html
                     } else {
                         const html = createHorizontalCard(title, description, pictureUrl, starts, ends, locationName)
                         const cardRow = document.getElementById("horizontal-conferences")
                         cardRow.innerHTML += html
                     }
                 }
             }

         }


     } catch (err){
         return alert(
             `${err?.message || "There was an unknown error that occurred"}`
           );
     }
 }


 function alert(message) {
   const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
   const wrapper = document.createElement("div");
   wrapper.innerHTML =
     '<div class="alert alert-danger' +
     ' alert-dismissible" role="alert">' +
     message +
     '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

   alertPlaceholder.append(wrapper);
 }
