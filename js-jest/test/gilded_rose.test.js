const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe("when you add items to a new shop", () => {
    describe("updateQuality()", () => {
      it("returns items you've added to the shop", function() {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe("foo");
      });
    })
  })
});
