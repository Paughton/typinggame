const util = {
    /**
     * Gets a random number between the minimum and maximum value
     * @param {int} minimum The absolute minimum value
     * @param {int} maximum The absolute maximum value
     * @returns A random number between the minimum and maximum value
     */
    randomNumber(minimum, maximum) {
        maximum++;
        return Math.floor(Math.random() * (maximum - minimum)) + minimum;
    }
};

export { util };