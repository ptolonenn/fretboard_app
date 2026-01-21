document.addEventListener("DOMContentLoaded", () => {
    console.log("Fretboard app loaded!");

    const keySelect = document.getElementById('keySelect');
    const scaleSelect = document.getElementById('scaleSelect');
    const fretboardDiv = document.getElementById('fretboard');

    NOTES.forEach(note => {
        const opt = document.createElement('option');
        opt.value = note;
        opt.textContent = note;
        keySelect.appendChild(opt);
    });

    Object.keys(SCALES).forEach(scale => {
        const opt = document.createElement('option');
        opt.value = scale;
        opt.textContent = scale;
        scaleSelect.appendChild(opt);
    });

    keySelect.value = 'A';
    scaleSelect.value = 'aeolian';

    function renderFretboard() {
        fretboardDiv.innerHTML = '';

        const board = mapScaleToFretboard(keySelect.value, scaleSelect.value, STANDARD_TUNING, 21);

        board.forEach(string => {
            const stringDiv = document.createElement('div');
            stringDiv.classList.add('string');

            string.frets.forEach(fret => {
                const fretDiv = document.createElement('div');
                fretDiv.classList.add('fret');
                if (fret.inScale) fretDiv.classList.add('in-scale');
                if (fret.isRoot) fretDiv.classList.add('root');
                fretDiv.textContent = fret.note;

                stringDiv.appendChild(fretDiv);
            });

            fretboardDiv.appendChild(stringDiv);
        });

        renderFretMarkers(21);
    }

    // New function to render fret numbers below fretboard
    function renderFretMarkers(numFrets) {
        const fretMarkersDiv = document.getElementById('fret-markers');
        fretMarkersDiv.innerHTML = '';

        for (let fret = 0; fret <= numFrets; fret++) {
            const labelDiv = document.createElement('div');
            labelDiv.classList.add('fret-marker-label');

            // Show fret numbers only on these frets:
            if ([3, 5, 7, 9, 12, 15, 17].includes(fret)) {
                labelDiv.textContent = fret;
            } else {
                labelDiv.textContent = '';
            }

            fretMarkersDiv.appendChild(labelDiv);
        }
    }

    keySelect.addEventListener('change', renderFretboard);
    scaleSelect.addEventListener('change', renderFretboard);

    renderFretboard();
});
