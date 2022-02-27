import fse from "fs-extra";
import csv from "csvtojson";
import path from "path";
const axios = require("axios");
const cheerio = require("cheerio");

export default async function asyncModule() {
  try {
    const { data } = await axios(
      "https://dc22.nfshost.com/wp-json/wp/v2/pages/10"
    );
    const $ = cheerio.load(data.content.rendered);
    let classes = ["hidden"];
    $(
      ".wp-block-cover, #root, .trans, .splash, .wp-block-columns, .wp-block-column, h1, h2, h3, h4, h5, h6, p, a, li"
    ).each(function () {
      classes.push($(this).attr("class"));
    });
    fse.writeFile("./static/classes.json", JSON.stringify(classes));

    let words = await csv().fromFile("./static/words.csv");
    console.log('words',words);
  } catch (err) {
    console.log(err);
  }
}
