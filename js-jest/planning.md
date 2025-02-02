## Improving Tests

- [ ] Create item*( double?)*s in before loop to be reused in tests
- [x] Test for updateQuality() on normal item
  - [x] Quality degrades by 1 before sell in date
  - [x] Sell in date decrements by 1
  - [x] Quality degrades by 2 after sell in date
  - [x] Quality does not go below 0
- [x] Test for updateQuality() on aged brie
  - [x] Quality increases by 1 before sell in date
  - [x] Sell in date decrements by 1
  - [x] Quality increases by 2 after sell in date
  - [x] Quality does not go above 50
- [x] Test for updateQuality() on sulfuras
  - [x] Quality does not change
  - [x] Sell in date does not change
- [x] Test for updateQuality() on backstage passes
  - [x] Quality increases by 1 up to 11 days before sell in date
  - [x] Quality increases by 2 between 10 and 6 days before sell in date
  - [x] Quality increases by 3 between 5 and 1 days before sell in date
  - [x] Sell in date decrements by 1
  - [x] Quality is 0 after sell in date (i.e. sellIn < 0)
  - [x] Quality does not go above 50

## Adding conjured items
- [ ] Test for updateQuality() on Conjured items
  - [ ] Quality degrades by 2 before sell in date
  - [ ] Sell in date decrements by 1
  - [ ] Quality degrades by 4 after sell in date
  - [ ] Quality does not go below 0


## Things to note
- Sell in date goes negative
