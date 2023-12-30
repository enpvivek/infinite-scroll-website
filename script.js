console.log("test ....");

// Declaring required varibales for API
let photosArr = [];
const ACCESS_KEY = "tNpsgjttOHnUPjN_PEI2cdW4XLzeTCzK6SGp0M9nhAM";
const COUNT = 30;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=${COUNT}`;

// Getting required elements from DOM
const setImage = document.querySelector("#setimage");
const setDesc = document.querySelector("#aboutimage");
const imagesContainer = document.getElementById("imagescontainer");
const imageDiv = document.getElementById("imagediv");
const loader = document.getElementById("loadercontainer");

// ...

function displayPhotos() {
  // Loop over the photos and create a copy of the image div for each photo
  photosArr.forEach((photo) => {
    // Clone the existing image div
    const newImageDiv = imageDiv.cloneNode(true);

    // Set the new image source and alt attributes
    const newSetImage = newImageDiv.querySelector("#setimage");
    newSetImage.src = photo.urls.regular;
    newSetImage.alt = photo.alt_description;

    // Set the new description text content
    const newSetDesc = newImageDiv.querySelector("#aboutimage");
    newSetDesc.textContent = `Photo by ${photo.user.name}`;

    // Append the new image div to the images container
    imagesContainer.appendChild(newImageDiv);
  });
}

// Getting Images from API
async function getImages() {
  try {
    const response = await fetch(API_URL);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("Error Code: ", error);
  }
}

// Function to check if we are near the bottom of the page
function isNearBottomOfPage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  const clientHeight =
    window.innerHeight ||
    Math.min(document.documentElement.clientHeight, document.body.clientHeight);

  return scrollTop + clientHeight >= scrollHeight - 100;
}

// Function to show the loader
function showLoader() {
  loader.style.display = "block";
}

// Function to hide the loader
function hideLoader() {
  loader.style.display = "none";
}

// Function to handle the scroll event
function handleScroll() {
  if (isNearBottomOfPage()) {
    showLoader();
    getImages().then(() => {
      hideLoader();
    });
  }
}

// Event listener for the scroll event
window.addEventListener("scroll", handleScroll);

