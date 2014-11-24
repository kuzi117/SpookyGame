var heartTimer = null;
var maxHeartCount = 10;
var heartRate = 1000;
var heartCount = maxHeartCount;
var status = "";
var timerEnabled = false;

// Hides unused panels
function hidePanels() {
    compassAccordion.style.display = "none";
    compassLabel.style.display = "none";

    inventoryAccordion.style.display = "none";
    inventoryLabel.style.display = "none";

    placesObjectsAccordion.style.display = "none";
    placesObjectsLabel.style.display = "none";
}

window.onload = function() {
    // Request saved values
    setTimeout(function() {
        hidePanels();
        ASLEvent("GetJS", "");
    }, 500);
};

// Sets the heart rate
function setHeartRate(newHeartRate) {
    heartRate = newHeartRate;
    
    if (timerEnabled) enableHeart();
}

// Enables the heart timer
function enableHeart() {
    disableHeart();
    timerEnabled = true;

    heartTimer = setInterval(function(){ heartbeat() }, heartRate);
}

// Disables the heart timer
function disableHeart() {
    timerEnabled = false;
    
    if (heartTimer != null) {
        clearInterval(heartTimer);
    }
}

// Ticks down the heart beat and takes a turn if necessary
function heartbeat() {
    heartCount--;
    
    if (heartCount <= 0) {
        ASLEvent("TimeOut", "");
    }
    
    updateStatus(status);
}

// Sets the heart count
function setHeartCount(newCount) {
    heartCount = newCount;
}

// Resets the heart counter to max
function resetHeartCount() {
    heartCount = maxHeartCount;
}

// Update status with injected counter
function updateStatus(text) {
    var heartChar = ((heartCount % 2) == 0) ? "&#9825;" : "&#9829;";
    var counterText;
    if (timerEnabled) {
        counterText = heartChar + " " + heartCount;
    } else {
        counterText = "&#9825; PAUSED";
    }
    status = text;
    
    if (text.length > 0) {
        showStatusVisible(true);
        $("#statusVars").html(counterText + "<br/><inject/>" + text.replace(/\n/g, "<br/>"));
    }
    else {
        showStatusVisible(false);
    }
}