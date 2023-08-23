let moviesList = [];
let currentId = 0;

//Checks for form Errors
$("#movie-input").on("blur change", function (event) {
  const minLength = 2;
  const charLength = $(this).val().length;
  if (charLength < minLength) {
    $(".movieName-feedback")
      .text("Title must be more than 2 characters!")
      .css("color", "red")
      .show();
    return;
  }
});
$("#rating-input").on("blur change", function (event) {
  const minRating = 0;
  const maxRating = 10;
  const userRating = $(this).val();
  if (!(userRating >= minRating && userRating <= maxRating)) {
    $(".rating-feedback")
      .text("Rating range is from 1-10")
      .css("color", "red")
      .show();
    return;
  }
});

//On form submission
$("form").on("submit", function (event) {
  event.preventDefault();
  let title = $("#movie-input").val();
  let rating = $("#rating-input").val();

  let movieData = { title, rating };
  currentId++;
  //push it to array; used for deletion later
  moviesList.push(movieData);

  const appendToTable = appendMovieToTable(movieData);

  $("#movie-table-body").append(appendToTable);

  //Resets the form
  $(this).trigger("reset");
});

//dynamically adds data to table and creates the delete button using jquery
function appendMovieToTable(movieData) {
  return `
    <tr>
        <td class ="title-cell"> ${movieData.title} </td>
        <td class ="rating-cell"> ${movieData.rating} </td>
        <td> <button class="btn btn-danger delete-btn"> Delete </button> </td>
    </tr>;
    `;
}

//Event Delegation on parent to remove children using delete button
$("tbody").on("click", ".delete-btn", function () {
  const $row = $(this).closest("tr"); //"this" refers to delete button

  //index from array from calling the closest table row
  const index = $row.index();

  // Remove the movie from the moviesList array
  moviesList.splice(index, 1);

  // Remove the row from the table
  $row.remove();
});

//Sorting

$("#rating").on("click", function (evt) {
  //Direction set to either down or up

  let direction = $(evt.target).hasClass("fa-sort-up") ? "down" : "up";
  const $rows = $("tbody tr");
  const tbody = $("tbody");
  tbody.empty();

  $rows
    .sort(function (a, b) {
      const rating1 = parseInt($(a).find("td.rating-cell").text());
      const rating2 = parseInt($(b).find("td.rating-cell").text());
      if (direction === "down") {
        return rating1 - rating2;
      } else {
        return rating2 - rating1;
      }
    })
    .appendTo(tbody);

  $(evt.target).toggleClass("fa-sort-up");
  $(evt.target).toggleClass("fa-sort-down");

  // $rows.sort().appendTo(tbody);
});

$("#title").on("click", function (evt) {
  let direction = $(evt.target).hasClass("fa-sort-up") ? "down" : "up";
  const $rows = $("tbody tr");
  const tbody = $("tbody");
  tbody.empty();

  $rows
    .sort(function (a, b) {
      const title1 = $(a).find("td.title-cell").text();
      const title2 = $(b).find("td.title-cell").text();
      if (direction === "down") {
        return title1.localeCompare(title2);
      } else {
        return title2.localeCompare(title1);
      }
    })
    .appendTo(tbody);

  $(evt.target).toggleClass("fa-sort-up");
  $(evt.target).toggleClass("fa-sort-down");
});
