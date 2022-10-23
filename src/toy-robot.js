var roboto = document.getElementById("roboto");
var reportLog = document.getElementById("reportLog");
var xPos, yPos, direction, robotDropped = false;
var Directions;
(function (Directions) {
    Directions["North"] = "North";
    Directions["South"] = "South";
    Directions["East"] = "East";
    Directions["West"] = "West";
})(Directions || (Directions = {}));
// Set toy robot start position and direction according to the input values
// Reporting is automatic.
function placeRobot() {
    var x = document.getElementById("x-axis").value;
    var y = document.getElementById("y-axis").value;
    var f = document.getElementById("direction").value;
    xPos = parseInt(x);
    yPos = parseInt(y);
    direction = f;
    validateDirection(direction);
}
//Move toy robot in its current facing direction
function move() {
    if (Board()) {
        switch (direction) {
            case Directions.North:
                if (yPos > 0) {
                    yPos -= 20;
                    roboto.style.top = yPos + "%";
                    roboto.classList.remove("edge");
                }
                else {
                    console.log("Change direction!");
                    roboto.classList.add("edge");
                }
                break;
            case Directions.South:
                if (yPos < 80) {
                    yPos += 20;
                    roboto.style.top = yPos + "%";
                    roboto.classList.remove("edge");
                }
                else {
                    console.log("Change direction!");
                    roboto.classList.add("edge");
                }
                break;
            case Directions.East:
                if (xPos < 80) {
                    xPos += 20;
                    roboto.style.left = xPos + "%";
                    roboto.classList.remove("edge");
                }
                else {
                    console.log("Change direction!");
                    roboto.classList.add("edge");
                }
                break;
            case Directions.West:
                if (xPos > 0) {
                    xPos -= 20;
                    roboto.style.left = xPos + "%";
                    roboto.classList.remove("edge");
                }
                else {
                    console.log("Change direction!");
                    roboto.classList.add("edge");
                }
                break;
            default:
                console.log("Invalid direction");
                break;
        }
        if (reportLog.style.visibility == "visible") {
            reportLog.innerHTML = "PLACE  ".concat(xPos, ", ").concat(yPos, ", ").concat(direction);
        }
    }
    else {
        console.log("Toy Robot has left the board");
    }
    report();
}
//turn to the left
function turnLeft() {
    if (Board()) {
        if (direction == Directions.North) {
            direction = Directions.West;
        }
        else if (direction == Directions.West) {
            direction = Directions.South;
        }
        else if (direction == Directions.South) {
            direction = Directions.East;
        }
        else if (direction == Directions.East) {
            direction = Directions.North;
        }
        roboto.className = direction;
    }
    else {
        console.log("Toy robot has left the board");
    }
}
//turn to the right
function turnRight() {
    if (Board()) {
        if (direction == Directions.North) {
            direction = Directions.East;
        }
        else if (direction == Directions.West) {
            direction = Directions.North;
        }
        else if (direction == Directions.South) {
            direction = Directions.West;
        }
        else if (direction == Directions.East) {
            direction = Directions.South;
        }
        roboto.className = direction;
    }
    else {
        console.log("Toy robot has left the board");
    }
}
// turn robot to oposite direction
function turnBack() {
    if (Board()) {
        if (direction == Directions.North) {
            direction = Directions.South;
        }
        else if (direction == Directions.West) {
            direction = Directions.East;
        }
        else if (direction == Directions.South) {
            direction = Directions.North;
        }
        else if (direction == Directions.East) {
            direction = Directions.West;
        }
        roboto.className = direction;
    }
    else {
        console.log("Toy robot has left the board");
    }
}
//validate direction
function validateDirection(direction) {
    robotDropped = direction != "";
    roboto.style.display = "block";
    roboto.style.left = xPos + "%";
    roboto.style.top = yPos + "%";
    roboto.className = direction;
    report();
}
//Position Reporting
function report() {
    var xRealPos = xPos / 2 / 10;
    var yRealPos = (100 - yPos) / 2 / 10 - 1;
    var message = !robotDropped
        ? "Kindly select direction and place the robot on the board"
        : "PLACE  ".concat(xRealPos, ", ").concat(yRealPos, ", ").concat(direction);
    reportLog.innerHTML = message;
}
// validate toy robot position
function Board() {
    if (xPos < 0 || xPos > 80 || yPos < 0 || yPos > 80)
        return false;
    return true;
}
document.onkeydown = checkKey;
//keyboad controls
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == "38") {
        move();
    }
    else if (e.keyCode == "40") {
        turnBack();
    }
    else if (e.keyCode == "37") {
        turnLeft();
    }
    else if (e.keyCode == "39") {
        turnRight();
    }
    else {
        console.log("Invalid key");
    }
}
