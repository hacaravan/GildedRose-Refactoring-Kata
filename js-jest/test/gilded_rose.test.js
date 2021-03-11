"use strict"

const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let gildedRose, normalItem, updatedItems, updatedNormalItem, normalOutdatedItem, lowQualityItem;
  describe("updateQuality()", () => {
    beforeEach(() => {
      normalItem = new Item("normal item", 10, 20)
      normalOutdatedItem = new Item("old normal item", -1, 20)
      lowQualityItem = new Item("low quality item", 10, 0)
      gildedRose = new Shop([normalItem, normalOutdatedItem, lowQualityItem])
      updatedItems = gildedRose.updateQuality();
      updatedNormalItem = updatedItems[0]
    })
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
        it("does not reduce quality below 0", () => {
          let updatedLowQualityItem = updatedItems[2]
          expect(updatedLowQualityItem.quality).toBe(0)
        })
      })
      describe("after the sell in date", () => {
        it("decrements quality by 2", () => {
          let updatedNormalOutdatedItem = updatedItems[1]
          expect(updatedNormalOutdatedItem.quality).toBe(18)
        })
      })
    })
  })

});
