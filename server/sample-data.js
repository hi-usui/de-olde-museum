import * as fs from "fs/promises";
import _ from "lodash";
import smartTruncate from "smart-truncate";
import terminalArt from "terminal-art";

import { srcDir } from "#src/helpers/_index";
import { Art, Artist } from "#src/models/_index";

await Art.deleteMany({});
await Artist.deleteMany({});

const artists = [];

// https://www.figma.com/file/lwGToAET7pKxC3mpvOIBKa/prototypes?node-id=139%3A2
// https://www.figma.com/file/lwGToAET7pKxC3mpvOIBKa/prototypes?node-id=140%3A2
// Artist Name
// Title
// femmeGarment, femmeShoes
// neutralGarment, neutralShoes

// Monet
// #A09DBF, #F4F4EA
// #BBB4F5, #C5C5C7

// Monet
// #8BB6BC, #F4F4EA
// #C4DFDD, #C5C5C7

// Monet
// #C099A1, #AEA183
// #D62424, #E8D39E

// Monet
// #8BB6BC, #F4F4EA
// #C4DFDD, #C5C5C7

// Monet
// #8DB6E4, #F4F4EA
// #B5E4FE, #E8D39E

// Monet
// #A09DBF, #AEA183
// #BBB4F5, #7D5A46

// O’Keeffe
// #8DB6E4, #F9F9F9
// #B5E4FE, #F9F9F9

// O’Keeffe
// #A09DBF, #F9F9F9
// #BBB4F5, #F9F9F9

// O’Keeffe
// #F58299, #F9F9F9
// #F8B3C1, #F9F9F9

// O’Keeffe
// #8DB6E4, #000001
// #C4DFDD, #F9F9F9

// O’Keeffe
// #CB5C37, #000001
// #DB6060, #F9F9F9

// O’Keeffe
// #79977F, #000001
// #3E5A83, #F9F9F9

// Picasso
// #449E83, #AEA183
// #8EC4B1, #7D5A46

// Picasso
// #273B4E, #F4F4EA
// #3E5A83, #F9F9F9

// Picasso
// #C099A1, #AEA183
// #F8B3C1, #E8D39E

// Picasso
// #273B4E, #AEA183
// #3E5A83, #7D5A46

// Picasso
// #273B4E, #F4F4EA
// #767678, #F7F2DB

// Picasso
// #AEA183, #F4F4EA
// #767678, #C5C5C7

// Warhol
// #D0B15C, #F4F4EA
// #DB6060, #F7F2DB

// Warhol
// #C099A1, #F4F4EA
// #BBB4F5, #E8D39E

// Warhol
// #C0679F, #000000
// #FF800B, #F9F9F9

// Warhol
// #BF142D, #F9F9F9
// #DB6060, #C5C5C7

// Warhol
// #273B4E, #000000
// #3E5A83, #C5C5C7

// Warhol
// #CB5C37, #000000
// #FF800B, #F9F9F9

// Van Gogh
// #A2D1BD, #F4F4EA
// #B1DC9C, #F9F9F9

// Van Gogh
// #D0B15C, #F4F4EA
// #8EC4B1, #E8D39E

// Van Gogh
// #8BB6BC, #F4F4EA
// #8EC4B1, #F9F9F9

// Van Gogh
// #273B4E, #000000
// #8EC4B1, #F7F2DB

// Van Gogh
// #253A75, #F4F4EA
// #3E5A83, #F9F9F9

// Van Gogh
// #8DB6E4, #AEA183
// #7DACD7, #E8D39E

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
