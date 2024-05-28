"use strict";

// Select the modal, overlay, close button, and all open modal buttons
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelectorAll(".show-modal");

// Function to open the modal
const openModal = () => {
  // Remove the 'hidden' class to display the modal and overlay
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Function to close the modal
const closeModal = function () {
  // Add the 'hidden' class to hide the modal and overlay
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Add click event listeners to all buttons that open the modal
for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener("click", openModal);
}

// Add click event listener to the close button to close the modal
btnCloseModal.addEventListener("click", closeModal);

// Add click event listener to the overlay to close the modal when overlay is clicked
overlay.addEventListener("click", closeModal);

// Add keyboard event listener to close the modal when the Escape key is pressed
document.addEventListener("keydown", function (event) {
  // Check if the Escape key is pressed and the modal is not hidden
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
