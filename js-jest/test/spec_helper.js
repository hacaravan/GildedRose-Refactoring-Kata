"use strict"

const {Shop, Item} = require("../src/gilded_rose");

const updateItem = (item) => {
  let gildedRose = new Shop([item])
  return gildedRose.updateQuality()[0]
}

module.exports = {
  updateItem
}
