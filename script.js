 function navigateToLink() {
    var dropdown = document.getElementById("user");
    var selectedValue = dropdown.value;

    if (selectedValue === "apply") {
      window.location.href = "./application.html";
    } else if (selectedValue === "tailor") {
      window.location.href = "./index.html";
    }
}
  
// Function to fetch account details
function fetchAccountDetails() {
  const accountNumber = document.getElementById("accountNumber").value;
  const bankNameInput = document.getElementById("bankName");
  const accountNameInput = document.getElementById("accountName");
  const errorMessage = document.getElementById("error-message");

  // Reset account name and error message
  accountNameInput.value = "";
  errorMessage.textContent = "";
  errorMessage.classList.remove("error-message"); // Remove the error class initially

  // Fetch account details from the API
  fetch(`https://fitted-portal-api.herokuapp.com/api/v1/bank/banks/${accountNumber}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Check if the data contains the account name
      if (data && data.accountName) {
        accountNameInput.value = data.accountName;

        //Redirect to success.html
        window.location.href = "./success.html";
      } else {
        errorMessage.textContent = "Oops, Account details not found.";
        errorMessage.classList.add("error-message"); // Add the error class if account details not found
      }
    })
    .catch((error) => {
      errorMessage.textContent = "Error fetching account details: " + error.message;
      errorMessage.classList.add("error-message"); // Add the error class in case of other errors
      console.log(error);
    });
}

