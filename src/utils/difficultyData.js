function chooseDifficultyColor( difficultyLevel ) {

    const DIFFICULTIES_COLORS = [ "green", "orange", "red"];

    return DIFFICULTIES_COLORS[difficultyLevel-1];

};

function chooseDifficultyName( difficultyLevel ) {

    const DIFFICULTIES_NAMES = [ "Facile", "Moyen", "Difficile"];
    
    return DIFFICULTIES_NAMES[difficultyLevel-1];

};

module.exports = {
    chooseDifficultyColor,
    chooseDifficultyName
}