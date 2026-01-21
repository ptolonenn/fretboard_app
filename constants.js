// ALL THE CONSTANTS FOR THE PROJECT

// Musical notes
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Scale patterns (intervals from root in semitones)

const SCALES = {
    ionian:        [0, 2, 4, 5, 7, 9, 11], // Major
    dorian:        [0, 2, 3, 5, 7, 9, 10],
    phrygian:      [0, 1, 3, 5, 7, 8, 10],
    lydian:        [0, 2, 4, 6, 7, 9, 11],
    mixolydian:    [0, 2, 4, 5, 7, 9, 10],
    aeolian:       [0, 2, 3, 5, 7, 8, 10], // Natural minor
    locrian:       [0, 1, 3, 5, 6, 8, 10],
    minorPent:     [0, 3, 5, 7, 10],
    majorPent:     [0, 2, 4, 7, 9],
    blues:         [0, 3, 5, 6, 7, 10],
    harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
    melodicMinor:  [0, 2, 3, 5, 7, 9, 11]
};

// Standard tuning
const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];

function noteIndex(note) {
    const idx = NOTES.indexOf(note);
    if (idx === -1) throw new Error(`Invalid note: ${note}`);
    return idx;
}

function getScaleNotes(root, scaleName) {
    const rootIdx = noteIndex(root);
    const intervals = SCALES[scaleName];
    if (!intervals) throw new Error(`Unknown scale: ${scaleName}`);
    return intervals.map(semitone => NOTES[(rootIdx + semitone) % NOTES.length]);
}%   
