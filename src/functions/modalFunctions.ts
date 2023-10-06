export function plugScoreRatingChange({
    currentValue,
    newValue,
    setAlertOptions,
}: {
    currentValue: number;
    newValue: number;
    setAlertOptions: React.Dispatch<
        React.SetStateAction<{
            text: string;
            type: "success" | "error";
        } | null>
    >;
}) {
    const newRating: number = Math.round((currentValue + newValue) / 2);
    setAlertOptions({
        text: "Ratingul a fost inregistrat cu success!",
        type: "success",
    });
}
