"use strict"

const {Shop, Item} = require("../src/gilded_rose");

const createAndUpdateItem = (name, sellIn, quality) => {
  let item = new Item(name, sellIn, quality)
  let gildedRose = new Shop([item])
  return gildedRose.updateQuality()[0]
}

module.exports = {
  createAndUpdateItem
}
