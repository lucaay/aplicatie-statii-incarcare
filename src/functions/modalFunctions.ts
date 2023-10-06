export function crowdingLevelChange() {
    console.log("test crowding");
}

export function plugScoreRatingChange({
    currentValue,
    newValue,
}: {
    currentValue: number;
    newValue: number;
}) {
    console.log("test plug score");
    const newRating: number = Math.round(((currentValue + newValue) / 2));
    alert("Multumim pentru rating!" + newRating);
}
