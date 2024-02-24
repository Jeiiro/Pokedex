const inputElement = document.querySelector("#search_input");
const search_icon = document.querySelector("#search_close_icon");
const sort_wrapper = document.querySelector(".sort_wrapper");

inputElement.addEventListener("input", () => {
  handleInputChange(inputElement);
});
search_icon.addEventListener("click", handleSearchCloseOnClick);
sort_wrapper.addEventListener("click", handleSortIconOnClick);

function handleInputChange(inputElement) {
  const inputValue = inputElement.value;

  if (inputValue !== "") {
    document
      .querySelector("#search_close_icon")
      .classList.add("search_close_icon-visible");
  } else {
    document
      .querySelector("#search_close_icon")
      .classList.remove("search_close_icon-visible");
  }
}

function handleSearchCloseOnClick() {
  document.querySelector("#search_input").value = "";
  document
    .querySelector("#search_close_icon")
    .classList.remove("search_close_icon-visible");
}

function handleSortIconOnClick() {
  document
    .querySelector(".filter_wrapper")
    .classList.toggle("filter_wrapper-open");
  document.querySelector("body").classList.toggle("filter_wrapper-overlay");
}
