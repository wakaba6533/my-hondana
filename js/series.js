function guessSeriesName(title) {
    if (!title) {
        return '';
    }

    const patterns = [
        /^(.*?)[ 　]+第\d+巻$/,
        /^(.*?)第\d+巻$/,
        /^(.*?)[ 　]+\d+巻$/,
        /^(.*?)\d+巻$/,
        /^(.*?)[ 　]+\d+$/,
        /^(.*?)\d+$/,
    ];

    for (const pattern of patterns) {
        const match = title.match(pattern);

        if (match) {
            const name = match[1].trim();

            if (isSeriesCandidate(name)) {
                return name;
            }
        }
    }

    return '';
}

function isSeriesCandidate(name) {
    if (!name) {
        return false;
    }

    if (/^\d+$/.test(name)) {
        return false;
    }

    if (/^[A-Za-z]?\d+[A-Za-z]*$/.test(name)) {
        return false;
    }

    return true;
}

window.guessSeriesName = guessSeriesName;