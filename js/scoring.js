/* =====================================
   SGR Tamim IELTS
   Scoring Engine
===================================== */

function normalizeAnswer(answer){

    return answer
        .trim()
        .toLowerCase()
        .replace(/\s+/g," ");

}

function checkGap(user, correct){

    user = normalizeAnswer(user);

    if(Array.isArray(correct)){

        return correct.some(ans=>normalizeAnswer(ans)==user);

    }

    return normalizeAnswer(correct)==user;

}

function calculateBand(score){

    const bands={
        40:9,
        39:8.5,
        38:8.5,
        37:8,
        36:8,
        35:8,
        34:7.5,
        33:7.5,
        32:7.5,
        31:7,
        30:7,
        29:6.5,
        28:6.5,
        27:6.5,
        26:6,
        25:6,
        24:6,
        23:6,
        22:5.5,
        21:5.5,
        20:5.5,
        19:5,
        18:5,
        17:5,
        16:5,
        15:4.5
    };

    return bands[score] || "Below 4.5";

}