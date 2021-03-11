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
    describe("for a normal item before the sell by date", () => {
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
    describe("for a low quality item before the sell by date", () => {
      it("does not reduce quality below 0", () => {
        let lowQualityItem = new Item("low quality item", 10, 0)
        let updatedLowQualityItem = updateItem(lowQualityItem)
        expect(updatedLowQualityItem.quality).toBe(0)
      })
    })
    describe("for a normal item after the sell in date", () => {
      it("decrements quality by 2", () => {
        let normalOutdatedItem = new Item("outdated", -1, 20)
        let updatedNormalOutdatedItem = updateItem(normalOutdatedItem)
        expect(updatedNormalOutdatedItem.quality).toBe(18)
      })
    })
    describe("for a low quality item after the sell by date", () => {
      it("does not reduce quality below 0", () => {
        let lowQualityItem = new Item("low quality item", -1, 0)
        let updatedLowQualityItem = updateItem(lowQualityItem)
        expect(updatedLowQualityItem.quality).toBe(0)
      })
    })
  })

});
