// DOMContentLoaded indicates when the browser has finished parsing the document
document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your API URL
  const dataDropdown = document.getElementById('dataDropdown');
  const resultDiv = document.getElementById('result');
  const cache = {};

  // Function to fetch initial data and populate dropdown
  async function fetchInitialData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.title; // Assuming 'title' is a property of each item
        dataDropdown.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  }

  // Function to fetch data based on the selected item and cache it
  async function fetchDataById(id) {
    if (cache[id]) {
      displayResult(cache[id]);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      cache[id] = data;
      displayResult(data);
    } catch (error) {
      console.error('Error fetching data by ID:', error);
    }
  }

  // Function to display the fetched data
  function displayResult(data) {
    resultDiv.innerHTML = `<strong>ID:</strong> ${data.id}<br><strong>Title:</strong> ${data.title}<br><strong>Body:</strong> ${data.body}`;
  }

  // Handle dropdown selection
  dataDropdown.addEventListener('change', function () {
    const selectedId = this.value;
    if (selectedId) {
      fetchDataById(selectedId);
    } else {
      resultDiv.innerHTML = '';
    }
  });

  // Fetch initial data when the page loads
  fetchInitialData();
});
