function buildTable(objectList) {

  //https://www.npmjs.com/package/json2csv
  //https://www.npmjs.com/package/fast-csv

  let tableTitleHTML = "<h2 class='tableTitle'><i class='" + objectList.getIconName() + "'></i> " + capitalize(objectList.getCategory()) + " Clubs</h2>";

  let tableExtras = "<div id='extras-" + objectList.getCategory() + "' class='tableExtras'>";
  tableExtras += "<button class='btn btn-info' id='extras-import-" + objectList.getCategory() + "' data-toggle='modal' data-target='#import-" + objectList.getCategory() + "'>Import</button>";
  tableExtras += "<button id='extras-export-" + objectList.getCategory() + "'  class='btn btn-info' data-toggle='modal' data-target='#export-" + objectList.getCategory() + "'>Export</button>";
  tableExtras += "<button id='extras-selectAll-" + objectList.getCategory() + "'  class='btn btn-info'>Select all</button></div>";
  tableExtras += "<form action='/search' method='post' id='search-" + objectList.getCategory() + "' class='search-form'><div class='input-group searchbox'><div class='input-group-prepend'>";
  tableExtras += "<span class='input-group-text' id=''><i class='fas fa-search'></i></span></div>";
  tableExtras += "<input type='text' class='form-control' id='searchTerm' placeholder='Guangzhou Evergrande' name='search'><button type='submit' id='search-btn' class='btn'>Search</button>";
  tableExtras += "</form></div></div>";

  let tableHeaderHTML = "<table id='table-" + objectList.getCategory() + "' class='table table-hover table-bordered'><thead><tr>";

  tableHeaderHTML += "<th scope='row' class=''></th>";

  objectList.getAttributes().forEach(function(attribute) {

    if (attribute != "category") {
      tableHeaderHTML += "<th scope='col'>" + capitalize(attribute) + "</th>";
    }

  });

  tableHeaderHTML += "</tr></thead>";

  let tableContentHTML = "<tbody>";

  if (objectList.getObjects().length != 0) {
    objectList.getObjects().forEach(function(object) {

      tableContentHTML += "<tr class=''>";

      tableContentHTML += "<td scope='row'><div class='form-check'>";
      tableContentHTML += "<input class='form-check-input checkbox' type='checkbox' value='" + objectList.getCategory() + "-" + object.getClubDetails()["id"] + "' id='object-" + objectList.getCategory() + "-" + object.getClubDetails()["id"] + "'>";
      tableContentHTML += "</div></td>";

      for (let detailName in object.getTableDetails()) {
        if (object.getTableDetails().hasOwnProperty(detailName)) {

          let detailValue = object.getTableDetails()[detailName];

          switch (detailName) {

            case "name":
              tableContentHTML += "<td scope='row'><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal-" + object.getClubDetails()['category'] + '-' + object.getClubDetails()["id"] + "'>" + detailValue + "</button></td>";
              break;

            case "website":

              if (detailValue != '') {
                tableContentHTML += "<td scope='row'><a href='http://" + detailValue + "' target='_blank'>" + object.getTableDetails()["name"] + "</a></td>";
              } else {
                tableContentHTML += "<td scope='row'><a href=''></a></td>";
              }

              break;

            default:
              tableContentHTML += "<td scope='row'>" + detailValue + "</td>";
              break;
          }
        }
      }
      tableContentHTML += "<td class='text-center' scope='row'><button id='remove-" + object.getClubDetails()["id"] + "' class='btn btn-danger removeBtn' title='Delete'><i class='fas fa-trash-alt'></i></button></td>";
      tableContentHTML += "</tr>";
    })
  } else {
    tableContentHTML += "<tr><td class='text-danger' colspan='" + objectList.getAttributes().length + 1 + "'>There were no records found for this category.</td><tr>";
  }

  tableContentHTML += "</tbody></table>";

  tableContentHTML += "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#newRecord-" + objectList.getCategory() + "'>+ Add a new record</button>";

  return tableTitleHTML + tableExtras + tableHeaderHTML + tableContentHTML;
};

function buildResultTable(objectList) {

  let tableHeaderHTML = "<table id='" + objectList.getCategory() + "' class='table table-hover table-bordered col'><thead><tr>";

  tableHeaderHTML += "<th scope='row' class=''></th>";

  objectList.getAttributes().forEach(function(attribute) {

    if (attribute != "category") {
      tableHeaderHTML += "<th scope='col'>" + capitalize(attribute) + "</th>";
    }

  });

  tableHeaderHTML += "</tr></thead>";

  let tableContentHTML = "<tbody>";

  if (objectList.getObjects().length != 0) {
    objectList.getObjects().forEach(function(object) {

      tableContentHTML += "<tr class=''>";

      tableContentHTML += "<td scope='row'><div class='form-check'>";
      tableContentHTML += "<input class='form-check-input checkbox' type='checkbox' value='" + objectList.getCategory() + "-" + object.getClubDetails()["id"] + "' id='object-" + objectList.getCategory() + "-" + object.getClubDetails()["id"] + "'>";
      tableContentHTML += "</div></td>";

      for (let detailName in object.getResultDetails()) {
        if (object.getResultDetails().hasOwnProperty(detailName)) {

          let detailValue = object.getResultDetails()[detailName];

          console.log("OBJECT", object);

          switch (detailName) {

            case "name":
              tableContentHTML += "<td scope='row'><button type='button' class='btn btn-primary' data-dismiss='modal' id='result-" + object.getClubDetails()['category'] + '-' + object.getClubDetails()["id"] + "'>" + detailValue + "</button></td>";
              break;

            default:
              tableContentHTML += "<td scope='row'>" + detailValue + "</td>";
              break;
          }
        }
      }
      tableContentHTML += "<td class='text-center' scope='row'><button id='remove-" + object.getClubDetails()["id"] + "' class='btn btn-danger removeBtn' title='Delete'><i class='fas fa-trash-alt'></i></button></td>";
      tableContentHTML += "</tr>";
    })
  } else {
    tableContentHTML += "<tr><td class='text-danger' colspan='" + objectList.getAttributes().length + 1 + "'>There were no records found for this category.</td><tr>";
  }

  tableContentHTML += "</tbody></table>";

  return tableHeaderHTML + tableContentHTML;
};

function buildModal(object) {

  let modalsHTML = "";

  let modalHTML = '<div class="modal fade" id="modal-' + object.getClubDetails()["category"] + '-' + object.getClubDetails()["id"] + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel-' + object.getClubDetails()["category"] + '-' + object.getClubDetails()["id"] + '" aria-hidden="true">';
  modalHTML += '<div class="modal-dialog modal-lg" role="document">';
  modalHTML += '<div class="modal-content"><div class="modal-header">';

  modalHTML += '<h5 class="modal-title" id="modalLabel-' + object.getClubDetails()["category"] + '-' + object.getClubDetails()["id"] + '">' + capitalize(object.getClubDetails()["name"]) + '</h5>';

  modalHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

  modalHTML += '<div class="modal-body">';

  modalHTML += '<form>';

  modalHTML += '<p><span class="badge badge-primary">Current club name</span> <span id="currentValue-clubName-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["name"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-clubName-' + object.getClubDetails()["id"] + '">Club name</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="clubName-' + object.getClubDetails()["id"] + '" aria-describedby="label-clubName-' + object.getClubDetails()["id"] + '">';
  modalHTML += '</div>';

  modalHTML += '<p><span class="badge badge-primary">Current leaugue</span> <span id="currentValue-league-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["league"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-league-' + object.getClubDetails()["id"] + '">League</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="league-' + object.getClubDetails()["id"] + '" aria-describedby="label-league-' + object.getClubDetails()["id"] + '">';
  modalHTML += '</div>';

  modalHTML += '<p><span class="badge badge-primary">Current president</span> <span id="currentValue-president-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["president"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-president-' + object.getClubDetails()["id"] + '">President</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="president-' + object.getClubDetails()["id"] + '" aria-describedby="label-president-' + object.getClubDetails()["id"] + '">';
  modalHTML += '</div>';

  modalHTML += '<p><span class="badge badge-primary">Current contact</span> <span id="currentValue-contact-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["contact"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-contact-' + object.getClubDetails()["id"] + '">Contact</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="contact-' + object.getClubDetails()["id"] + '" aria-describedby="label-contact-' + object.getClubDetails()["id"] + '">';
  modalHTML += '</div>';

  modalHTML += '<p><span class="badge badge-primary">Current location</span> <span id="currentValue-location-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["location"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-location-' + object.getClubDetails()["id"] + '">Location</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="location-' + object.getClubDetails()["id"] + '" aria-describedby="label-location-' + object.getClubDetails()["id"] + '">';
  modalHTML += '</div>';

  modalHTML += '<p><span class="badge badge-primary">Current country</span> <span id="currentValue-country-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["country"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-country-' + object.getClubDetails()["id"] + '">Country</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="country-' + object.getClubDetails()["id"] + '" aria-describedby="label-country-' + object.getClubDetails()["id"] + ' required">';
  modalHTML += '</div>';

  modalHTML += '<p><span class="badge badge-primary">Current website</span> <span id="currentValue-website-' + object.getClubDetails()["id"] + '">' + object.getClubDetails()["website"] + '</span></p>';
  modalHTML += '<div class="input-group mb-3">';
  modalHTML += '<div class="input-group-prepend">';
  modalHTML += '<span class="input-group-text" id="label-website-' + object.getClubDetails()["id"] + '">Website</span>';
  modalHTML += '</div>';
  modalHTML += '<input type="text" class="form-control" id="website-' + object.getClubDetails()["id"] + '" aria-describedby="label-website-' + object.getClubDetails()["id"] + '">';
  modalHTML += '</div>';

  modalHTML += '</form>';

  modalHTML += '</div>';

  modalHTML += '<div class="modal-footer">';
  modalHTML += '<button type="button" class="btn btn-danger" id="modal-' + object.getClubDetails()["id"] + '-close">Close</button>';
  modalHTML += '<button type="button" class="btn btn-success" id="modal-' + object.getClubDetails()["id"] + '-save">Save</button>';
  modalHTML += '</div>';
  modalHTML += '</div></div></div>';

  modalsHTML += modalHTML;

  return modalsHTML;
};

function buildNavigation(sportClubLists) {

  let navigationHTML = "<ul class='navbar-nav mr-auto mt-2 mt-lg-0'>";

  sportClubLists.forEach(function(list) {

    navigationHTML += "<li class='nav-item'><a class='nav-link' id='" + list.getCategory() + "' href='#" + list.getCategory() + "'><i class='" + list.getIconName() + "'></i> " + capitalize(list.getCategory()) + "</a></li>";

  });

  navigationHTML += "</ul>";

  return navigationHTML;

};

function buildAddNewModal(category) {

  let newModalHTML = '<div class="modal fade" id="newRecord-' + category + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel-newRecord" aria-hidden="true">';
  newModalHTML += '<div class="modal-dialog  modal-lg" role="document">';
  newModalHTML += '<div class="modal-content"><div class="modal-header">';

  newModalHTML += '<h5 class="modal-title" id="modalLabel-newRecord">Add a new record</h5>';

  newModalHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

  newModalHTML += '<div class="modal-body">';

  newModalHTML += '<form>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-clubName">Club name</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-clubName" aria-describedby="label-clubName" required>';
  newModalHTML += '</div>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-league">League</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-league" aria-describedby="label-league" required>';
  newModalHTML += '</div>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-president">President</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-president" aria-describedby="label-president" required>';
  newModalHTML += '</div>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-contact">Contact</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-contact" aria-describedby="label-contact">';
  newModalHTML += '</div>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-location">Location</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-location" aria-describedby="label-location">';
  newModalHTML += '</div>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-country">Country</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-country" aria-describedby="label-country" required>';
  newModalHTML += '</div>';

  newModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  newModalHTML += '<span class="input-group-text" id="label-website">Website</span>';
  newModalHTML += '</div>';
  newModalHTML += '<input type="text" class="form-control" id="newRecord-' + category + '-website" aria-describedby="label-website">';
  newModalHTML += '</div>';

  newModalHTML += '</form>';

  newModalHTML += '</div>';

  newModalHTML += '<div class="modal-footer">';
  newModalHTML += '<button type="button" class="btn btn-danger" id="newRecord-' + category + '-close">Close</button>';
  newModalHTML += '<button type="button" class="btn btn-success" id="newRecord-' + category + '-add">Add</button>';
  newModalHTML += '</div>';
  newModalHTML += '</div></div></div>';

  return newModalHTML;
};

function buildImportModal(category) {

  let importModalHTML = '<div class="modal fade" id="import-' + category + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel-import" aria-hidden="true">';
  importModalHTML += '<div class="modal-dialog  modal-lg" role="document">';
  importModalHTML += '<div class="modal-content"><div class="modal-header">';

  importModalHTML += '<h5 class="modal-title" id="modalLabel-import">Import</h5>';

  importModalHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

  importModalHTML += '<div class="modal-body">';

  importModalHTML += '<form>';

  importModalHTML += '<div class="input-group mb-3"><div class="custom-file">';
  importModalHTML += '<input type="file" class="custom-file-input" id="import-' + category + '-file">';
  importModalHTML += '<label class="custom-file-label" for="import-' + category + '-file">Choose file</label>';
  importModalHTML += '</div>';
  importModalHTML += '<div class="input-group-append">';
  importModalHTML += '<span class="input-group-text" id="">Upload</span>';
  importModalHTML += '</div></div>';

  importModalHTML += '</form>';

  importModalHTML += '</div>';

  importModalHTML += '<div class="modal-footer">';
  importModalHTML += '<button type="button" class="btn btn-danger" id="import-' + category + '-close">Close</button>';
  importModalHTML += '<button type="button" class="btn btn-success" id="import-' + category + '-import">Import</button>';
  importModalHTML += '</div>';
  importModalHTML += '</div></div></div>';

  return importModalHTML;
};

function buildExportModal(category) {

  let exportModalHTML = '<div class="modal fade" id="export-' + category + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel-export" aria-hidden="true">';
  exportModalHTML += '<div class="modal-dialog  modal-lg" role="document">';
  exportModalHTML += '<div class="modal-content"><div class="modal-header">';

  exportModalHTML += '<h5 class="modal-title" id="modalLabel-export">Export</h5>';

  exportModalHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

  exportModalHTML += '<div class="modal-body">';

  exportModalHTML += '<form>';

  exportModalHTML += '<div class="input-group mb-3"><div class="input-group-prepend">';
  exportModalHTML += '<span class="input-group-text" id="label-president">President</span>';
  exportModalHTML += '</div>';
  exportModalHTML += '<input type="text" class="form-control" id="export-' + category + '-president" aria-describedby="label-president" required>';
  exportModalHTML += '</div>';

  exportModalHTML += '</form>';

  exportModalHTML += '</div>';

  exportModalHTML += '<div class="modal-footer">';
  exportModalHTML += '<button type="button" class="btn btn-danger" id="export-' + category + '-close">Close</button>';
  exportModalHTML += '<button type="button" class="btn btn-success" id="export-' + category + '-export">Export</button>';
  exportModalHTML += '</div>';
  exportModalHTML += '</div></div></div>';

  return exportModalHTML;
};

function buildSearchResultModal(searchResultList, searchTerm) {

  let resultModalHTML = '<div class="modal fade" id="searchResults-' + searchResultList.getCategory() + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel-searchResults" aria-hidden="true">';
  resultModalHTML += '<div class="modal-dialog  modal-lg" role="document">';
  resultModalHTML += '<div class="modal-content"><div class="modal-header">';

  resultModalHTML += '<h5 class="modal-title" id="modalLabel-searchResults">Search results for "' + searchTerm + '"</h5>';

  resultModalHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

  resultModalHTML += '<div class="modal-body">';

  switch (searchResultList.getObjects().length) {
    case 0:

      break;

    case 1:
      resultModalHTML += "<p class='text-success'>There was only 1 record found.</p>";
      break;

    default:
      resultModalHTML += "<p class='text-success'>There were " + searchResultList.getObjects().length + " records found.</p>";
      break;
  }

  resultModalHTML += buildResultTable(searchResultList);

  resultModalHTML += '<div class="modal-footer">';
  resultModalHTML += '<button type="button" class="btn btn-danger" data-dismiss="modal" id="searchResults-' + searchResultList.getCategory() + '-close">Close</button>';
  resultModalHTML += '</div>';
  resultModalHTML += '</div></div></div>';

  return resultModalHTML;
};

function buildMain(sportClubLists) {

  for (let objectList in sportClubLists) {
    if (sportClubLists.hasOwnProperty(objectList)) {

      let selectedObjectList = sportClubLists[objectList];

      $("#main").html(buildTable(selectedObjectList));

      $("#main").append(buildAddNewModal(selectedObjectList.getCategory()));
      $("#main").append(buildImportModal(selectedObjectList.getCategory()));
      $("#main").append(buildExportModal(selectedObjectList.getCategory()));


      $("#extras-selectAll-" + selectedObjectList.getCategory()).on("click", function() {
        const selectBoxes =  $("#table-" + selectedObjectList.getCategory() + " .checkbox");

        console.log("CHECKBOX",selectBoxes);
        /*for(let checkbox in selectBoxes){
          if(selectBoxes.hasOwnProperty(checkbox)){

            let selectedBox = selectBoxes[checkbox];

            console.log("CHECKBOX", selectedBox);

          }
        }*/

      });

      $("#newRecord-" + selectedObjectList.getCategory() + "-add").on('click', function(e) {

        $("#newRecord-" + selectedObjectList.getCategory()).modal("hide");

        const newData = {
          website: $('#newRecord-' + selectedObjectList.getCategory() + '-website').val(),
          name: $('#newRecord-' + selectedObjectList.getCategory() + '-clubName').val(),
          category: selectedObjectList.getCategory(),
          contact: $('#newRecord-' + selectedObjectList.getCategory() + '-contact').val(),
          location: $('#newRecord-' + selectedObjectList.getCategory() + '-location').val(),
          president: $('#newRecord-' + selectedObjectList.getCategory() + '-president').val(),
          country: $('#newRecord-' + selectedObjectList.getCategory() + '-country').val(),
          league: $('#newRecord-' + selectedObjectList.getCategory() + '-league').val()
        };

        $('#newRecord-' + selectedObjectList.getCategory() + '-website').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-clubName').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-contact').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-location').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-president').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-country').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-league').val("");

        $.post("/addNewClub", newData, function(result) {
          window.location.replace("/");
        })
      });

      $("#newRecord-" + selectedObjectList.getCategory() + "-close").on('click', function(e) {

        $("#newRecord-" + selectedObjectList.getCategory()).modal("hide");

        $('#newRecord-' + selectedObjectList.getCategory() + '-website').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-clubName').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-contact').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-location').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-president').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-country').val("");
        $('#newRecord-' + selectedObjectList.getCategory() + '-league').val("");

      });

      for (let object in selectedObjectList.getObjects()) {
        if (selectedObjectList.getObjects().hasOwnProperty(object)) {

          let selectedObject = selectedObjectList.getObjects()[object];

          $("#main").append(buildModal(selectedObject));

          $('#modal-' + selectedObject.getClubDetails()["id"] + '-save').on('click', function(e) {

            e.preventDefault();

            $('#modal-' + selectedObject.getClubDetails()["id"]).modal("hide");

            const newData = {
              website: $('#website-' + selectedObject.getClubDetails()["id"]).val(),
              name: $('#clubName-' + selectedObject.getClubDetails()["id"]).val(),
              contact: $('#contact-' + selectedObject.getClubDetails()["id"]).val(),
              location: $('#location-' + selectedObject.getClubDetails()["id"]).val(),
              president: $('#president-' + selectedObject.getClubDetails()["id"]).val(),
              country: $('#country-' + selectedObject.getClubDetails()["id"]).val(),
              league: $('#league-' + selectedObject.getClubDetails()["id"]).val(),
              id: selectedObject.getClubDetails()["id"]
            };

            $('#website-' + selectedObject.getClubDetails()["id"]).val("");
            $('#clubName-' + selectedObject.getClubDetails()["id"]).val("");
            $('#contact-' + selectedObject.getClubDetails()["id"]).val("");
            $('#location-' + selectedObject.getClubDetails()["id"]).val("");
            $('#president-' + selectedObject.getClubDetails()["id"]).val("");
            $('#country-' + selectedObject.getClubDetails()["id"]).val("");
            $('#league-' + selectedObject.getClubDetails()["id"]).val("");

            $.post("/adjustClub", newData, function(result) {
              window.location.replace("/");
            });

          });

          $('#modal-' + selectedObject.getClubDetails()["id"] + '-close').on('click', function(e) {

            $('#modal-' + selectedObject.getClubDetails()["id"]).modal("hide");

            $('#website-' + selectedObject.getClubDetails()["id"]).val("");
            $('#clubName-' + selectedObject.getClubDetails()["id"]).val("");
            $('#contact-' + selectedObject.getClubDetails()["id"]).val("");
            $('#location-' + selectedObject.getClubDetails()["id"]).val("");
            $('#president-' + selectedObject.getClubDetails()["id"]).val("");
            $('#country-' + selectedObject.getClubDetails()["id"]).val("");
            $('#league-' + selectedObject.getClubDetails()["id"]).val("");

          });

        }
      }
    }
  }

  $(".removeBtn").on("click", function() {

    const clubToRemove = ($(this)[0].id).split("-")[1];

    $.post("/removeClub", {
      id: clubToRemove
    }, function(result) {

      if (result) {
        window.location.replace("/");
      }

    });

  });

  $(".search-form").on("submit", function(e) {
    e.preventDefault();

    const query = {
      searchTerm: $("#searchTerm").val().toLowerCase(),
      category: ($(this)[0].id).split("-")[1]
    };

    $.post("/search", query, function(results) {

      let resultList = new ObjectList(query.category, "fas fa-futbol");
      resultList.addAttribute(["name", "country", "actions"]);

      results.forEach(function(club) {
        resultList.addObject(new Club(club));
      });

      $("#main").append(buildSearchResultModal(resultList, query.searchTerm));

      $("#searchResults-" + resultList.getCategory()).modal();

      resultList.getObjects().forEach(function(selectedObject) {

        $("#main").append(buildModal(selectedObject));

        $("#result-" + selectedObject.getClubDetails()['category'] + '-' + selectedObject.getClubDetails()["id"]).on("click", function() {

          const selectedClub = $(this)[0].id.split("-")[2];

          $("#main").append(buildModal(resultList.getClubById(selectedClub)));

          $("#searchResults-" + resultList.getCategory()).on('hidden.bs.modal', function(e) {

            $("#modal-" + selectedObject.getClubDetails()["category"] + '-' + selectedObject.getClubDetails()["id"]).modal('show');

          })

          $("#searchResults-" + resultList.getCategory()).modal("hide");

        });

        $('#modal-' + selectedObject.getClubDetails()["id"] + '-save').on('click', function(e) {

          e.preventDefault();

          $('#modal-' + selectedObject.getClubDetails()["id"]).modal("hide");

          const newData = {
            website: $('#website-' + selectedObject.getClubDetails()["id"]).val(),
            name: $('#clubName-' + selectedObject.getClubDetails()["id"]).val(),
            contact: $('#contact-' + selectedObject.getClubDetails()["id"]).val(),
            location: $('#location-' + selectedObject.getClubDetails()["id"]).val(),
            president: $('#president-' + selectedObject.getClubDetails()["id"]).val(),
            country: $('#country-' + selectedObject.getClubDetails()["id"]).val(),
            league: $('#league-' + selectedObject.getClubDetails()["id"]).val(),
            id: selectedObject.getClubDetails()["id"]
          };

          $('#website-' + selectedObject.getClubDetails()["id"]).val("");
          $('#clubName-' + selectedObject.getClubDetails()["id"]).val("");
          $('#contact-' + selectedObject.getClubDetails()["id"]).val("");
          $('#location-' + selectedObject.getClubDetails()["id"]).val("");
          $('#president-' + selectedObject.getClubDetails()["id"]).val("");
          $('#country-' + selectedObject.getClubDetails()["id"]).val("");
          $('#league-' + selectedObject.getClubDetails()["id"]).val("");

          $.post("/adjustClub", newData, function(result) {
            window.location.replace("/");
          });

        });

        $('#modal-' + selectedObject.getClubDetails()["id"] + '-close').on('click', function(e) {

          $('#modal-' + selectedObject.getClubDetails()["id"]).modal("hide");

          $('#website-' + selectedObject.getClubDetails()["id"]).val("");
          $('#clubName-' + selectedObject.getClubDetails()["id"]).val("");
          $('#contact-' + selectedObject.getClubDetails()["id"]).val("");
          $('#location-' + selectedObject.getClubDetails()["id"]).val("");
          $('#president-' + selectedObject.getClubDetails()["id"]).val("");
          $('#country-' + selectedObject.getClubDetails()["id"]).val("");
          $('#league-' + selectedObject.getClubDetails()["id"]).val("");

        });

      })

      $("#searchResults-" + resultList.getCategory()).on('hidden.bs.modal', function(e) {
        $(this).modal("dispose");
        $(this).remove();
      })
    });

  });


}
