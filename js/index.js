const searchBox = document.getElementById("search-box");
const submitBtn = document.getElementById("submit");

// find data
const findData = async (searchIteam) => {
  const promisedData = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchIteam}`
  );
  const parsedData = await promisedData.json();
  const alldata = parsedData.data;
  alldata.forEach((el) => {
    console.log(el);
  });
};
// Set data on website
// Initial event listener function
const handleSubmit = (e) => {
  e.preventDefault();
  const searchIteam = searchBox.value;
  findData(searchIteam);
};
submitBtn.addEventListener("click", handleSubmit);
