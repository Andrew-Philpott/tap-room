export const average = (array) => array.reduce((a, b) => a + b) / array.length;
export function topFiveBeers(beers) {
  return beers
    .filter((x) => x.reviews && x.reviews.length !== 0)
    .map((x) => {
      return {
        beer: x,
        averageRating: average(x.reviews.map((r) => r.rating)),
      };
    })
    .sort((a, b) => (a.averageRating < b.averageRating ? 1 : -1))
    .slice(0, 5);
}
