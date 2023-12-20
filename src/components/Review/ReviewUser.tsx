export default function ReviewUser({
    rating
} : {
    rating: number
}) {
    return (
        <div className="absolute bg-background border-2 border-accent-1 rounded-xl h-10 w-12 flex justify-center items-center">
            <p className="text-accent-1 font-bold text-lg">
                {rating}
            </p>
        </div>
    )
}