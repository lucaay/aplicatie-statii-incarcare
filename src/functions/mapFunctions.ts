export const handleIconBasedOnPlugScore = (plugScore: number) => {
    const greenMarker = "http://maps.google.com/mapfiles/ms/icons/green.png";
    const yellowMarker = "http://maps.google.com/mapfiles/ms/icons/yellow.png";
    const redMarker = "http://maps.google.com/mapfiles/ms/icons/red.png";

    if (plugScore >= 4) {
        return greenMarker;
    } else if (plugScore >= 2) {
        return yellowMarker;
    } else {
        return redMarker;
    }
};
