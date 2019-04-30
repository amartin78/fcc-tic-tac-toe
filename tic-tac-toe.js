var user, role, machine, grid;
var exit,
  blocked,
  completed = false;
var uScore = 0;
var mScore = 0;
var turn = "user";

$("input").on("click", function() {
  if ($(this).val() == "" && role && !blocked) {
    var cellId = Number($(this).attr("id")[1]) - 1;
    grid[cellId] = user;
    $(this).val(user);

    matchRow(rows(grid), "user");
    if (exit) {
      exit = false;
      return;
    }

    if (grid.indexOf("") < 0) {
      setTimeout(function() {
        resetGame();
      }, 1000);
      return;
    }

    var empties = [];
    for (var g in grid) {
      if (grid[g] === "") empties.push(g);
    }

    setTimeout(function() {
      if (win(rows(grid), machine)) {
        matchRow(rows(grid), "machine");
      }

      if (exit) {
        exit = false;
        return;
      }

      if (block(rows(grid), user) || machineTurn(empties)) {
        matchRow(rows(grid), "machine");
      }

      if (exit) {
        exit = false;
        return;
      }

      if (grid.indexOf("") < 0) {
        setTimeout(function() {
          resetGame();
        }, 1000);
        return;
      }
    }, 500);
  }
});

function machineTurn(e) {
  var i = Math.floor(Math.random() * e.length);
  var j = e[i];
  grid[j] = machine;
  j++;
  $("#i" + j).val(machine);
  return true;
}

function selectPlayer(p) {
  user = p;
  grid = ["", "", "", "", "", "", "", "", ""];
  p == "X" ? (machine = "O") : (machine = "X");
  role = true;
}

function startGame() {
  $("#i5").val(machine);
  grid = ["", "", "", "", machine, "", "", "", ""];
  blocked = false;
}

function rows(g) {
  var subGrid1 = [g[0], g[1], g[2], "012"];
  var subGrid2 = [g[3], g[4], g[5], "345"];
  var subGrid3 = [g[6], g[7], g[8], "678"];
  var subGrid4 = [g[0], g[3], g[6], "036"];
  var subGrid5 = [g[1], g[4], g[7], "147"];
  var subGrid6 = [g[2], g[5], g[8], "258"];
  var subGrid7 = [g[0], g[4], g[8], "048"];
  var subGrid8 = [g[2], g[4], g[6], "246"];
  var subGrids = [
    subGrid1,
    subGrid2,
    subGrid3,
    subGrid4,
    subGrid5,
    subGrid6,
    subGrid7,
    subGrid8
  ];
  return subGrids;
}

function matchRow(rows, player) {
  for (var r in rows) {
    if (
      (rows[r][0] == "X" && rows[r][1] == "X" && rows[r][2] == "X") ||
      (rows[r][0] == "O" && rows[r][1] == "O" && rows[r][2] == "O")
    ) {
      for (var i = 0; i < 3; i++) {
        var k = Number(rows[r][3][i]) + 1;
        $("#i" + k).css("background-color", "#0a0");
      }
      player == "user" ? uScore++ : mScore++;
      $("#user").val(uScore);
      $("#machine").val(mScore);
      setTimeout(function() {
        resetGame();
      }, 1000);
      exit = true;
      break;
    }
  }
  return;
}

function win(rows, player) {
  for (var row in rows) {
    var counts = {};
    for (var i = 0; i < 3; i++) {
      var ele = rows[row][i];
      counts[ele] = counts[ele] ? counts[ele] + 1 : 1;
      if (counts[""] === 1 && counts[player] === 2) {
        var pos = rows[row].indexOf("");
        var idx = Number(rows[row][3][pos]);
        grid[idx] = machine;
        idx++;
        $("#i" + idx).val(machine);
        return true;
      }
    }
  }
  return false;
}

function block(rows, user) {
  for (var row in rows) {
    var counts = {};
    for (var i = 0; i < 3; i++) {
      var ele = rows[row][i];
      counts[ele] = counts[ele] ? counts[ele] + 1 : 1;
      if (counts[""] === 1 && counts[user] === 2) {
        var pos = rows[row].indexOf("");
        var idx = Number(rows[row][3][pos]);
        grid[idx] = machine;
        idx++;
        $("#i" + idx).val(machine);
        return true;
      }
    }
  }
  return false;
}

function fork() {}

function resetGame() {
  $(".grid").val("");
  $("input").css("background-color", "#fff");
  grid = ["", "", "", "", "", "", "", "", ""];
  turn == "user" ? (turn = "machine") : (turn = "user");
  if (turn != "user") {
    blocked = true;
    setTimeout(function() {
      startGame();
    }, 700);
  }
}
