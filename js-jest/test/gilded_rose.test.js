"use strict"

const {Shop, Item} = require("../src/gilded_rose");
const {updateItem} = require("./spec_helper.js")

describe("Gilded Rose", function() {
  describe("updateQuality()", () => {
    it("returns items you've added to a shop", function() {
      let item = new Item("item", 10, 10)
      let updatedItem = updateItem(item)
      expect(updatedItem.name).toBe("item");
    });
    describe("for a normal item", () => {
      describe("before the sell by date", () => {
        let normalItem, updatedNormalItem;
        beforeEach(() => {
          normalItem = new Item("normal item", 10, 20)
          updatedNormalItem = updateItem(normalItem)
        })
        it("decrements the sell in date by 1", () => {
          expect(updatedNormalItem.sellIn).toBe(9)
        })
        it("decrements the quality by 1", () => {
          expect(updatedNormalItem.quality).toBe(19)
        })
      })
      describe("after the sell in date", () => {
        let normalOutdatedItem, updatedNormalOutdatedItem;
        beforeEach(() => {
          normalOutdatedItem = new Item("normal item", -1, 20)
          updatedNormalOutdatedItem = updateItem(normalOutdatedItem)
        })
        it("decrements quality by 2", () => {
          expect(updatedNormalOutdatedItem.quality).toBe(18)
        })
        it("decrements sell in date by 1", () => {
          expect(updatedNormalOutdatedItem.sellIn).toBe(-2)
        })
      })
      describe("with low quality", () => {
        describe("before the sell by date", () => {
          it("does not reduce quality below 0", () => {
            let lowQualityItem = new Item("low quality item", 10, 0)
            let updatedLowQualityItem = updateItem(lowQualityItem)
            expect(updatedLowQualityItem.quality).toBe(0)
          })
        })
        describe("after the sell by date", () => {
          it("does not reduce quality below 0", () => {
            let lowQualityItem = new Item("low quality item", -1, 0)
            let updatedLowQualityItem = updateItem(lowQualityItem)
            expect(updatedLowQualityItem.quality).toBe(0)
          })
        })
      })
    })

    describe("for aged brie", () => {
      describe("before the sell in date", () => {
        let brie, updatedBrie;
        beforeEach( () => {
          brie = new Item("Aged Brie", 10, 10)
          updatedBrie = updateItem(brie)
        })
        it("increases quality by 1", () => {
          expect(updatedBrie.quality).toBe(11)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBrie.sellIn).toBe(9)
        })
      })
      describe("after the sell in date", () => {
        let oldBrie, updatedOldBrie;
        beforeEach( () => {
          oldBrie = new Item("Aged Brie", -1, 10)
          updatedOldBrie = updateItem(oldBrie)
        })
        it("increases quality by 2", () => {
          expect(updatedOldBrie.quality).toBe(12)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedOldBrie.sellIn).toBe(-2)
        })
      })
      describe("with high quality", () => {
        describe("before the sell in date", () => {
          it("does not increase quality above 50", () => {
            let premiumBrie = new Item("Aged Brie", 10, 50)
            let updatedPremiumBrie = updateItem(premiumBrie)
            expect(updatedPremiumBrie.quality).toBe(50)
          })
        })
        describe("after the sell in date", () => {
          it("does not increase quality above 50", () => {
            let premiumOldBrie = new Item("Aged Brie", -1, 50)
            let updatedPremiumOldBrie = updateItem(premiumOldBrie)
            expect(updatedPremiumOldBrie.quality).toBe(50)
          })
        })
      })
    })
  })

});
