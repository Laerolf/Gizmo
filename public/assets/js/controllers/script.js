$(document).ready(function() {

  console.log("Loaded!");

  $.get("/getClubs", function(clubs) {

    let sportClubLists = [];

    const soccerClubList = new ObjectList("soccer","fas fa-futbol");
    soccerClubList.addAttribute(["name", "country", "president", "website", "actions"]);

    clubs.forEach(function(club) {
      soccerClubList.addObject(new Club(club));
    });

    sportClubLists.push(soccerClubList);

    console.log("clubs", soccerClubList);

    buildMain(sportClubLists);

    $("#main-navbar").append(buildNavigation(sportClubLists));

  });

});
