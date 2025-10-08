export const getReviewWordWithEnding = (reviewCount: number) => {
	const lastTwo = reviewCount % 100
	const lastDigit = reviewCount % 10

	if (lastTwo >= 11 && lastTwo <= 19) {
		return `${reviewCount} отзывов`
	}

	switch (lastDigit) {
		case 1:
			return `${reviewCount} отзыв`
		case 2:
		case 3:
		case 4:
			return `${reviewCount} отзыва`
		default:
			return `${reviewCount} отзывов`
	}
}
