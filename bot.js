const T = require("./config/keys");
const track = require("./config/track");

T.get("account/settings", (err, data, response) => {
  user = data;
});

const stream = T.stream("statuses/filter", { track });
console.log("Bot is starting\n");

try {
  stream.on("tweet", tweet => {

    T.post("favorites/create", { id: tweet.id_str }, (err, response) => {

      if (err) {
        console.log('CANNOT BE FAVORITE... Error');
      }
      else {
        console.log(`Liked user "@${tweet.user.screen_name}":\n"${tweet.text}"\n`);
      }

    });

  });
} catch (err) {
  console.log("An error ocurred:\n" + err + "\n");
}