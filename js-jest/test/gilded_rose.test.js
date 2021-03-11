"use strict"

const {createAndUpdateItem} = require("./spec_helper.js")
const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe("updateQuality()", () => {
    describe("when passed nothing", () => {
      it("returns an empty array", () => {
        let emptyShop = new Shop()
        expect(emptyShop.updateQuality()).toStrictEqual([])
      })
    })
    it("returns items you've added to a shop", function() {
      let updatedItem = createAndUpdateItem("item", 10, 10)
      expect(updatedItem.name).toBe("item");
    });
    describe("for a normal item", () => {
      describe("before the sell by date", () => {
        let updatedNormalItem;
        beforeEach(() => {
          updatedNormalItem = createAndUpdateItem("normal item", 10, 20)
        })
        it("decrements the sell in date by 1", () => {
          expect(updatedNormalItem.sellIn).toBe(9)
        })
        it("decrements the quality by 1", () => {
          expect(updatedNormalItem.quality).toBe(19)
        })
      })
      describe("after the sell in date", () => {
        let updatedNormalOutdatedItem;
        beforeEach(() => {
          updatedNormalOutdatedItem = createAndUpdateItem("normal item", -1, 20)
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
            let updatedLowQualityItem = createAndUpdateItem("low quality item", 10, 0)
            expect(updatedLowQualityItem.quality).toBe(0)
          })
        })
        describe("after the sell by date", () => {
          it("does not reduce quality below 0", () => {
            let updatedLowQualityItem = createAndUpdateItem("low quality item", -1, 0)
            expect(updatedLowQualityItem.quality).toBe(0)
          })
        })
      })
    })

    describe("for aged brie", () => {
      describe("before the sell in date", () => {
        let updatedBrie;
        beforeEach( () => {
          updatedBrie = createAndUpdateItem("Aged Brie", 10, 10)
        })
        it("increases quality by 1", () => {
          expect(updatedBrie.quality).toBe(11)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBrie.sellIn).toBe(9)
        })
      })
      describe("after the sell in date", () => {
        let updatedOldBrie;
        beforeEach( () => {
          updatedOldBrie = createAndUpdateItem("Aged Brie", -1, 10)
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
            let updatedPremiumBrie = createAndUpdateItem("Aged Brie", 10, 50)
            expect(updatedPremiumBrie.quality).toBe(50)
          })
        })
        describe("after the sell in date", () => {
          it("does not increase quality above 50", () => {
            let updatedPremiumOldBrie = createAndUpdateItem("Aged Brie", -1, 50)
            expect(updatedPremiumOldBrie.quality).toBe(50)
          })
        })
      })
    })

    describe("for sulfuras", () => {
      let updatedSulfuras = createAndUpdateItem("Sulfuras, Hand of Ragnaros", 10, 80)
      it("does not change the sell in date", () => {
        expect(updatedSulfuras.sellIn).toBe(10)
      })
      it("does not change the quality", () => {
        expect(updatedSulfuras.quality).toBe(80)
      })
    })

    describe("for backstage passes", () => {
      describe("more than 10 days before the concert", () => {
        let updatedBackstagePass;
        beforeEach( () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 11, 20)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBackstagePass.sellIn).toBe(10)
        })
        it("increases quality by 1", () => {
          expect(updatedBackstagePass.quality).toBe(21)
        })
        it("doesn't increase quality above 50", () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 11, 50)
          expect(updatedBackstagePass.quality).toBe(50)
        })
      })
      describe("between 10 and 6 days before the concert", () => {
        let updatedBackstagePass;
        beforeEach( () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 6, 20)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBackstagePass.sellIn).toBe(5)
        })
        it("increases quality by 2", () => {
          expect(updatedBackstagePass.quality).toBe(22)
        })
        it("doesn't increase quality above 50", () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 6, 50)
          expect(updatedBackstagePass.quality).toBe(50)
        })
      })
      describe("between 5 and 1 days before the concert", () => {
        let updatedBackstagePass;
        beforeEach( () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 1, 20)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBackstagePass.sellIn).toBe(0)
        })
        it("increases quality by 2", () => {
          expect(updatedBackstagePass.quality).toBe(23)
        })
        it("doesn't increase quality above 50", () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 1, 50)
          expect(updatedBackstagePass.quality).toBe(50)
        })
      })
      describe("on the day of the concert", () => {
        let updatedBackstagePass;
        beforeEach( () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', 0, 20)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBackstagePass.sellIn).toBe(-1)
        })
        it("reduces quality to 0", () => {
          expect(updatedBackstagePass.quality).toBe(0)
        })
      })
      describe("after the day of the concert", () => {
        let updatedBackstagePass;
        beforeEach( () => {
          updatedBackstagePass = createAndUpdateItem('Backstage passes to a TAFKAL80ETC concert', -1, 0)
        })
        it("decreases sell in date by 1", () => {
          expect(updatedBackstagePass.sellIn).toBe(-2)
        })
        it("keeps quality at 0", () => {
          expect(updatedBackstagePass.quality).toBe(0)
        })
      })
    })
  })

});
