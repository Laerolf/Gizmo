const express = require("express");
const bodyParser = require("body-parser");
const nano = require('nano')('http://localhost:5984');
const session = require("client-sessions");
const pug = require('pug');

const port = 8888;

const sessionSettings = {
  cookieName: 'session',
  secret: 'gizmo was my cat',
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
  ephemeral: true,
  httpOnly: true
};

const app = express();

let gizmoDB = nano.use("gizmo");

gizmoDB.info(function(error, body) {

  "use strict";

  if (error !== null && error.error === "not_found") {
    nano.db.create("gizmo", function(error) {

      if (error) {
        console.log("GIZMO-CREATION-ERROR:", error);
      }

      gizmoDB = nano.use("gizmo");

      gizmoDB.info(function(error, body) {

        if (error) {
          console.log("GIZMO-ERROR:", error);
        } else {
          console.log("GIZMO-INFO", body);

        }

      });
    })
  }

});

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session(sessionSettings));

app.listen(port, () => {
  console.log("Listening on port " + port + "...");
});

//ROOT

app.get("/", (request, response, next) => {

  /*console.log("SESSION: ", request.session);

  if (request.session.user === undefined) {
    response.redirect("/login");
  } else {
    next();
  }*/

  //res.render('index', { title: 'Hey', message: 'Hello there!' })
  response.render('home');

  //next();
});

//POSTERS

app.post("/login", (request, response, next) => {

  const potentialUser = request.body.user;

  userDB.get(potentialUser.emailAddress, function(error, user) {

    let feedback = {
      value: undefined,
      status: undefined
    };

    if (error) {
      console.log("LOGIN-ERROR:", error.message);

      feedback.status = "error";
      feedback.value = "There is no user registered with this email address.";
    } else {
      console.log("POTENTIAL USER:", user);

      if (user.password !== potentialUser.password) {
        console.log("Incorrect password.");
        error = "Sorry, wrong password.";
        feedback = {
          value: error,
          status: "error"
        };
      } else {
        console.log(user.emailAddress + " is successfully logged on!");
        request.session.user = user;
        request.session.active = true;
        feedback = {
          value: user,
          status: "success"
        };
      }
    }

    response.send(feedback);
  });
});

app.post("/register", (request, response) => {

  const userData = request.body;

  console.log("USER:", userData);

  const registrationDate = new Date().toJSON();

  //const newUser = new User(userData.emailAddress, userData.password, registrationDate);

  /*userDB.insert(newUser.toJSON(), function(error, user) {
    "use strict";

    if (error) {
      console.log("REGISTER-INSERT-ERROR:", error);
    } else {

      console.log("USER:", user);

      response.send(user.ok);

      /*gameDB.insert({game:undefined},user.id+"-game", function (error, game) {

       if (error) {
       console.log("GAME-INSERT-ERROR:", error);
       }
       else {
       console.log("GAME-ATTACHMENT:", game);
       console.log(newUser.username + " has been added to the pack.");
       response.redirect("/login");
       }


       })


    }
  });*/

});

app.post("/passwordchange", (request, response) => {

  const currentPassword = request.body.passwordChange.currentPassword;
  const newPassword = request.body.passwordChange.newPassword;
  const confirmNewPassword = request.body.passwordChange.confirmNewPassword;

  userDB.get(request.session.user.playerName).then(function(user) {

    if (user.password === currentPassword && newPassword === confirmNewPassword) {
      user.password = newPassword;

      userDB.put(user);

      console.log("Password successfully changed!");
    }

    response.end();

  });

});

app.post("/addNewClub", (request, response) => {

  const newClubData = request.body;

  sportclubDB.insert(newClubData, function(error, success) {

    if (error) {
      console.log("CLUB-PUT-ERROR:", error);
    }

    console.log("SUCCESS:", success);

  });

  response.end();

});

app.post("/adjustClub", (request, response) => {

  const newClubData = request.body;

  sportclubDB.get(newClubData.id, function(error, oldClub) {

    if (error) {
      console.log("AJUSTCLUB-GET-ERROR:", error);
    }

    let differences = {};

    differences["id"] = newClubData.id;

    for (let attribute in newClubData) {
      if (newClubData.hasOwnProperty(attribute)) {

        let newAttributeValue = newClubData[attribute];
        let oldAttributeValue = oldClub[attribute];

        if (newAttributeValue !== oldAttributeValue && newAttributeValue !== '') {
          differences[attribute] = newAttributeValue;
        }

      }
    }

    let updatedClub = oldClub;

    for (let attribute in differences) {
      if (differences.hasOwnProperty(attribute) && attribute != 'id') {

        let differenceValue = differences[attribute];

        updatedClub[attribute] = differenceValue;

      }
    }

    sportclubDB.insert(updatedClub, function(error, success) {

      if (error) {
        console.log("ADJUSTCLUB-PUT-ERROR:", error);
      }

      console.log("SUCCESS:", success);

      response.end();
    })
  });
});

app.post("/search", (request, response) => {

  const query = request.body;

  sportclubDB.list({include_docs: true}, function(error, clubs) {

    if (error) {
      console.log("SEARCH-LIST-ERROR:", error);
    }

    let categoryList = [];

    for (let club in clubs.rows) {
      if (clubs.rows.hasOwnProperty(club)) {

        let resultClub = clubs.rows[club];

        if (resultClub.doc.category === query.category) {
          categoryList.push(resultClub.doc);
        }

      }
    }

    let results = [];

    categoryList.forEach(function(club) {

      for (let attribute in club) {
        if (club.hasOwnProperty(attribute)) {

          let selectedValue = club[attribute].toLowerCase();

          if (results.indexOf(club) === -1 && selectedValue.indexOf(query.searchTerm) != -1) {
            results.push(new Club(club).getClubDetails());
          }
        }
      }
    })

    response.send(results);

  })

});

app.post("/removeClub", (request, response) => {

  const clubToDelete = request.body;

  sportclubDB.get(clubToDelete.id, function(error, selectedClubToDelete) {

    if (error) {
      console.log("ERROR:", error);
    }

    sportclubDB.destroy(selectedClubToDelete._id, selectedClubToDelete._rev, function(deleteError, success) {

      if (error) {
        console.log("ERROR:", deleteError)
      };

      response.send(success.ok);

    })

  })

});

//GETTERS

app.get("/getClubs", (request, response) => {

  sportclubDB.list(function(error, clubs) {

    if (error) {
      console.log("GETCLUBS-ERROR:", error);
    } else {

      let clubList = [];

      clubs.rows.forEach(function(club) {

        sportclubDB.get(club.id, function(error, clubData) {

          if (error) {
            console.log("GETCLUBS-LIST-GET-ERROR:", error);
          }

          clubList.push(new Club(clubData).getClubDetails());

          if (clubs.total_rows === clubList.length) {
            response.send(clubList);
          }

        });
      });

      if (clubs.total_rows === 0) {
        response.send(clubList);
      }

    }
  })
});

app.get("/logout", (request, response) => {
  request.session.reset();
  response.redirect("/");
});

app.get("/session", (request, response) => {

  const filteredSession = {
    emailAddress: request.session.user.emailAddress,
    active: request.session.active
  };

  console.log("SESSION:", filteredSession);

  response.send(filteredSession);
});

app.get("/getActiveUser", (request, response) => {

  const wantedUser = request.session.user.emailAddress;

  console.log("WANTED USER:", wantedUser);

  userDB.get(wantedUser, function(error, user) {

    if (error) {
      console.log("GET-USER-ERROR:", error);
    }

    let userInfo = {
      emailAddress: user.emailAddress,
      registrationDate: user.registrationDate,
      game: user.game
    };

    response.send(userInfo);

  });

});

app.get("/register", (request, response) => {
  response.render('register');
});

app.get("/login", (request, response) => {
  response.render("login");
});

app.get("/gizes", (request, response) => {
  response.render("gizes", {gizes: {}});
});

app.get("/makeAGiz", (request, response) => {
  response.render("makeAGiz");
});

//SETTINGS

app.use(express.static(__dirname + "/public"));

/*app.use(function(request, response) {
  console.log("ROUTE", request.route);
  console.log("Route", request.url);
  if (!request.route) {
    response.statusCode = 404;
    response.sendFile(__dirname + "/web/404.html");
  }

});*/
