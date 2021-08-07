import * as fs from "fs/promises";
import _ from "lodash";
import smartTruncate from "smart-truncate";
import terminalArt from "terminal-art";

import { srcDir } from "#src/helpers/_index";
import { Art, Artist } from "#src/models/_index";

await Art.deleteMany({});
await Artist.deleteMany({});

const artists = [];

const artDir = `${srcDir}/assets/art`;
const artFiles = _.shuffle(await fs.readdir(artDir))
  .map((file) => `${artDir}/${file}`)
  .filter((file) => file.endsWith(".png"));

for (let file of artFiles) {
  try {
    const filename = file.split("/").slice(-1)[0];
    const [artist, ...artworkSplit] = filename.split(" - ");
    const data = await fs.readFile(file);
    const title = artworkSplit.join(" - ").split(".").slice(0, -1).join(".");

    if (!artists[artist]) {
      await Artist.create({ name: artist });
      artists.push(artist);
    }

    console.log(
      `artist: "${artist}", title: "${title}", file: "${smartTruncate(
        file,
        80,
        {
          position: 10,
        }
      )}"`
    );
    await terminalArt.print(file, {
      output: "debug",
      maxCharWidth: 40,
    });
    await Art.create({
      img: { contentType: `image/png`, data, filename },
      title,
      artist,
    });
  } catch (e) {
    console.error(e);
    console.error(`Failed to parse "${file}"`);
  }
}

// fs.readdir(`${srcDir}`);

// const art = {};

// for (let entry of ordersJSON) {
//   let { id, restaurant, item, quantity, price, order_items } = entry;
//   if (!restaurants[restaurant]) {
//     restaurants[restaurant] = new Restaurant({
//       name: restaurant,
//       menu: [],
//     });
//   }
//   if (!orders[id]) {
//     orders[id] = new Order({
//       items: [],
//       date: faker.date.between(moment().subtract(7, "days"), moment()),
//     });
//   }
//   if (!items[restaurant + item]) {
//     items[restaurant + item] = new Item({
//       name: item,
//       price: price,
//       restaurant: restaurants[restaurant].id,
//     });
//     restaurants[restaurant].menu.push(items[restaurant + item]);
//   }
//   while (quantity > 0) {
//     orders[id].items.push(items[restaurant + item].id);
//     quantity--;
//   }
// }

// await Restaurant.insertMany(_(restaurants).values().flatten().value());
// await Order.insertMany(_(orders).values().flatten().value());
// await Item.insertMany(_(items).values().flatten().value());

// console.log(`${"Items:".padEnd(30, " ")}${await Item.count()}`);
// console.log(`${"Orders:".padEnd(30, " ")}${await Order.count()}`);
// console.log(`${"Restaurants:".padEnd(30, " ")}${await Restaurant.count()}`);
