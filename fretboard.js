// Requires: NOTES, SCALES, STANDARD_TUNING from constants.js

// return index of a note in NOTES; throws if unknown
function noteIndex(note) {
    const i = NOTES.indexOf(note)
    if (i === -1) {
        throw new Error(`Unknown note: ${note}`);
    }
    return i;
}

// generates frets for a single string. Ret array of {fret, note, noteIndex}
function generateStringFrets(openNote, numFrets = 21) {
    const start = noteIndex(openNote);
    const frets = [];
    for (let fret = 0; fret <= numFrets; fret++) {
        const idx = (start + fret) % NOTES.length;
        frets.push({
            fret,
            note: NOTES[idx],
            noteIndex: idx
        });
    }
    return frets;
}

/** generate the full fretboard (arr of strings with their frets)
* tuning: array like ['E', 'A', 'D', 'G', 'B', 'E']
* numFrets: integer (this case 21, can be more)
* opts.reverse: if true, reverse strings (for a left-handed option in the future)
*/
function generateFretboard(tuning = STANDARD_TUNING, numFrets = 21, opts = {}) {
    const board = tuning.map(openNote => ({
        openNote,
        frets: generateStringFrets(openNote, numFrets)
    }));
    if (opts.reverse) board.reverse();
    return board;
}

/**
 * map a named scale (root + scaleName) onto the fretboard
 * returns a board where each fret object has extra fields:
 *      semitoneFromRoot, inScale (bool), degree, isRoot (bool)
 */
function mapScaleToFretboard(root, scaleName, tuning = STANDARD_TUNING, numFrets = 21, opts = {}) {
    const intervals = SCALES[scaleName];
    if (!intervals) throw new Error(`Unknown scale: ${scaleName}`);
    const rootIdx = noteIndex(root);
    const board = generateFretboard(tuning, numFrets, opts);

    // map semitone offset -> degree number (1-based)
    const semitoneToDegree = Object.create(null);
    intervals.forEach((semitone, i) => {
        semitoneToDegree[semitone] = i + 1;
    });

    for (const string of board) {
        for (const fretObj of string.frets) {
            const semitoneFromRoot = (fretObj.noteIndex - rootIdx + 12) % 12;
            const degree = semitoneFromRoot in semitoneToDegree
                ? semitoneToDegree[semitoneFromRoot]
                : null;

            fretObj.semitoneFromRoot = semitoneFromRoot;
            fretObj.inScale = degree !== null;
            fretObj.degree = degree;
            fretObj.isRoot = semitoneFromRoot === 0;
        }
    }

    return board;
}%  
