const searchBox = document.getElementById("search-box");
const submitBtn = document.getElementById("submit");
const cardContainer = document.getElementById("card-container");
const spinner = document.getElementById("spinner");
const nothingFound = document.getElementById("nothingFound");
let alldata;

// find data
const findData = async (searchIteam = "Iphone") => {
  const promisedData = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchIteam}`
  );
  const parsedData = await promisedData.json();
  alldata = parsedData.data;
  filterData(alldata);
};
// Filter Data and show all checker
const filterData = (alldata) => {
  let first15 = alldata.slice(0, 12);
  if (first15.length > 0) {
    first15.forEach((el) => {
      setDataOnCard(el);
    });
  } else {
    nothingFound.classList.remove("hidden");
  }
  // conditional show all button
  if (alldata.length > 12) {
    document.getElementById("showSection")?.classList?.remove("hidden");
  } else {
    document.getElementById("showSection")?.classList?.add("hidden");
  }
};
// Clear previous items
const clearPrevious = () => {
  cardContainer.innerHTML = "";
  nothingFound.classList.add("hidden");
  spinner.classList.remove("hidden");
};
// Set data on website
const setDataOnCard = (el) => {
  const div = document.createElement("div");
  div.className =
    "max-w-sm bg-white border border-gray-200 rounded-lg shadow py-3";
  div.innerHTML = `
 <img class="mx-auto" src=${el?.image} alt="${el?.phone_name} img"/>
 <div class="p-5 flex flex-col justify-center items-center">
     <h5 class="mb-2 text-2xl font-bold text-center">${el?.phone_name}</h5>
     <butoon id="${el.slug}" onclick="handleShowbuttonclick(id)" 
         class="inline-flex items-center hover:cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
         Show Details
     </butoon>
 </div>
 `;
  cardContainer.appendChild(div);
};
// handleShowbuttonclick
const handleShowbuttonclick = (id) => {
  const phone = alldata.find((el) => el.slug === id);
  console.log(phone);
};

// handleShowButton
const handleShowButton = () => {
  alldata.forEach((el) => {
    setDataOnCard(el);
  });
  document.getElementById("showSection")?.classList?.add("hidden");
};
// Initial event listener function
const handleSubmit = (e) => {
  e.preventDefault();
  clearPrevious();
  const searchIteam = searchBox.value;
  findData(searchIteam, (isShowallButtonClick = false));
  spinner.classList.add("hidden");
};

// Calling event listener
findData();
submitBtn.addEventListener("click", handleSubmit);
document.getElementById("showall").addEventListener("click", handleShowButton);
