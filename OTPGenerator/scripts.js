 // Function to generate a random 6-digit OTP
 function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
    return otp;
}

// Get the button and result elements
const generateOtpButton = document.getElementById('generateOtp');
const resultElement = document.getElementById('result');

// Add click event listener to the button
generateOtpButton.addEventListener('click', function () {
    const otp = generateOTP(); // Generate the OTP
    resultElement.textContent = `${otp}`; // Display the OTP
});

  // Copy OTP to clipboard when clicked
  resultElement.addEventListener('click', function () {
    const otp = resultElement.textContent;
    if (otp) {
        navigator.clipboard.writeText(otp) 
            .then(() => {
                copiedMessage.style.display = 'block'; 
                setTimeout(() => {
                    copiedMessage.style.display = 'none'; // Hide message after 2 seconds
                }, 2000);
            })
            .catch(err => console.error('Failed to copy OTP:', err));
    }
});