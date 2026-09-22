const button = document.getElementById("checkServer");
const statusText = document.getElementById("status");

button.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    statusText.textContent = data.message;
  } catch (error) {
    statusText.textContent = "Không thể kết nối server.";
  }
});
