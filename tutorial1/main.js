/**
 * Imports
 */
import { Racer } from "./racer.js";

/**
 * Race
 */
const race = {
    active: false,
    time: 0, // How long the race has been going on in centiseconds
    racers: [],
    textToType: "This is some generic text that doesn't really mean anything and is just here to extend the typing times.",

    /**
     * This updates the text to type container using the Player Racer's current position
     * @param {Racer} playerRacer The player racer that is currently playing
     */
    updateTextToTypeContainer(playerRacer) {
        let element = document.getElementById("textToTypeContainer");

        element.innerHTML = `<span id="past">${this.textToType.slice(0, playerRacer.typingIndex)}</span><span id="current">${this.textToType.charAt(playerRacer.typingIndex)}</span>${this.textToType.slice(playerRacer.typingIndex + 1, this.textToType.length)}`;
    }
};

// Initialize the player racer
const playerRacer = new Racer("Player", true);

// Append the player racer to the race's list of racers
race.racers.push(playerRacer);

/**
 * When the user presses any key
 */
document.addEventListener(("keypress"), (event) => {
    // If the race is not currently active then return early
    if (!race.active) return;

    // Process the input
    if (event.key == race.textToType.charAt(playerRacer.typingIndex)) {
        // The user types the right key so increase their typing index and update the screen
        playerRacer.typingIndex++;
        race.updateTextToTypeContainer(playerRacer);

        // If this player has finished the race then call the racer's finish race method
        if (playerRacer.typingIndex >= race.textToType.length) playerRacer.finishRace(race.time, race.textToType);
    } else if (event.key == "Enter") {
        // The user pressed enter and wants to skip a word
        playerRacer.useWordSkip(race.textToType);
        race.updateTextToTypeContainer(playerRacer);
    } else {
        // The user pressed the wrong key that is not present in the text to type
        playerRacer.errorCount++;
    }
});

/**
 * Run every 1 centisecond
 */
setInterval(() => {
    // If the race is active then increment the race time
    if (race.active) race.time++;
}, 10);

/**
 * Live update the player's current stats throughtout the 
 * Runs every 1 second
 */
setInterval(() => {
    // If the race is currently active and the player has not completed their race then update the player stats
    if (race.active && !playerRacer.completedRace) playerRacer.updateStats(race.time, race.textToType);
}, 1000);

// Initalize
race.active = true; // Start the race when the page loads (change later)
race.updateTextToTypeContainer(playerRacer);