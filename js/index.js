const searchBox = document.getElementById("search-box");
const submitBtn = document.getElementById("submit");
const cardContainer = document.getElementById("card-container");

// find data
const findData = async (searchIteam) => {
  const promisedData = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchIteam}`
  );
  const parsedData = await promisedData.json();
  const alldata = parsedData.data;

  alldata.forEach((el) => {
    setDataOnCard(el);
  });
};

// Set data on website
const setDataOnCard = (el) => {
  const div = document.createElement("div");
  div.className = "max-w-sm bg-white border border-gray-200 rounded-lg shadow";
  div.innerHTML = `
 <img class=${el?.image} alt="${el?.phone_name} img"/>
 <div class="p-5 flex flex-col justify-center items-center">
     <h5 class="mb-2 text-2xl font-bold text-center">${el?.phone_name}</h5>
     
     <a id=${el.slug} href="#"
         class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
         Show Details
     </a>
 </div>
 `;
  cardContainer.appendChild(div);
};
// Initial event listener function
const handleSubmit = (e) => {
  e.preventDefault();
  const searchIteam = searchBox.value;
  findData(searchIteam);
};
submitBtn.addEventListener("click", handleSubmit);
