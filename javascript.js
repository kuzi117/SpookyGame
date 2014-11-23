var heartTimer = null;
var maxHeartCount = 10;
var heartCount = maxHeartCount;
var status = "";

// Hides unused panels
function hidePanels() {
    compassAccordion.style.display = "none";
    compassLabel.style.display = "none";

    inventoryAccordion.style.display = "none";
    inventoryLabel.style.display = "none";

    placesObjectsAccordion.style.display = "none";
    placesObjectsLabel.style.display = "none";
}

// Starts the timer and sets the heart rate
function setHeartRate(heartRate) {
    if (heartTimer != null) {
        clearInterval(heartTimer);
    }

    heartTimer = setInterval(function(){ heartbeat() }, heartRate);
}

// Ticks down the heart beat and takes a turn if necessary
function heartbeat() {
    heartCount--;
    
    if (heartCount <= 0) {
        ASLEvent("TimeOut", "");
    }
    
    updateStatus(status);
}

// Resets the heart counter to max
function resetHeartCount() {
    heartCount = maxHeartCount;
}

// Update status with injected counter
function updateStatus(text) {
    var heartChar = ((heartCount % 2) == 0) ? "&#9825;" : "&#9829;";
    status = text;
    
    if (text.length > 0) {
        showStatusVisible(true);
        $("#statusVars").html(heartChar + " " + heartCount + "<br/><inject/>" + text.replace(/\n/g, "<br/>"));
    }
    else {
        showStatusVisible(false);
    }
}