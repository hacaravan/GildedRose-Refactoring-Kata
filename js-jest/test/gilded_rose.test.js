const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let gildedRose, normalItem, updatedItems, updatedNormalItem;
  beforeEach(() => {
    normalItem = new Item("normal item", 10, 20)
    gildedRose = new Shop([normalItem])
    updatedItems = gildedRose.updateQuality();
    updatedNormalItem = updatedItems[0]
  })
  describe("updateQuality()", () => {
    it("returns items you've added to a shop", function() {
      expect(updatedNormalItem.name).toBe("normal item");
    });
    describe("for a normal item", () => {
      it("decrements the sell in date by 1", () => {
        expect(updatedNormalItem.sellIn).toBe(9)
      })
      describe("before the sell in date", () => {
        it("decrements the quality by 1", () => {
          expect(updatedNormalItem.quality).toBe(19)
        })
      })
    })
  })

});
