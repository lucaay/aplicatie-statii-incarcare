export function crowdingLevelChange({
    currentValue,
    newValue,
}: {
    currentValue: number;
    newValue: number;
}) {
    const newLevel: number = Math.round((currentValue + newValue) / 2);
    alert("Multumim pentru informare!");
}

export function plugScoreRatingChange({
    currentValue,
    newValue,
}: {
    currentValue: number;
    newValue: number;
}) {
    const newRating: number = Math.round((currentValue + newValue) / 2);
    alert("Multumim pentru rating!");
}
