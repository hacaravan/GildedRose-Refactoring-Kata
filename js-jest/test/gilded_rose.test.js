const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let gildedRose, normalItem;
  beforeEach(() => {
    normalItem = new Item("normal item", 10, 20)
    gildedRose = new Shop([normalItem])
  })
  describe("updateQuality()", () => {
    it("returns items you've added to a shop", function() {
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("normal item");
    });
  })

});
