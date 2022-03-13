const { model, Schema } = require("mongoose");

const BoardgameSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  id: {
    type: "String",
  },
  handle: {
    type: "String",
  },
  url: {
    type: "String",
  },
  edit_url: {
    type: "String",
  },
  name: {
    type: "String",
  },
  price: {
    type: "Date",
  },
  distributors: {
    type: ["Mixed"],
  },
  price_ca: {
    type: "String",
  },
  price_uk: {
    type: "String",
  },
  price_au: {
    type: "String",
  },
  msrp: {
    type: "Number",
  },
  msrps: {
    type: ["Mixed"],
  },
  discount: {
    type: "String",
  },
  year_published: {
    type: "Number",
  },
  min_players: {
    type: "Number",
  },
  max_players: {
    type: "Number",
  },
  min_playtime: {
    type: "Number",
  },
  max_playtime: {
    type: "Number",
  },
  min_age: {
    type: "Number",
  },
  description: {
    type: "String",
  },
  commentary: {
    type: "String",
  },
  faq: {
    type: "String",
  },
  thumb_url: {
    type: "String",
  },
  image_url: {
    type: "String",
  },
  matches_specs: {
    type: "Mixed",
  },
  specs: {
    type: "Array",
  },
  mechanics: {
    type: ["Mixed"],
  },
  categories: {
    type: ["Mixed"],
  },
  publishers: {
    type: ["Mixed"],
  },
  designers: {
    type: ["Mixed"],
  },
  primary_publisher: {
    id: {
      type: "String",
    },
    name: {
      type: "String",
    },
    url: {
      type: "String",
    },
  },
  primary_designer: {
    id: {
      type: "String",
    },
    name: {
      type: "String",
    },
    url: {
      type: "String",
    },
  },
  developers: {
    type: "Array",
  },
  related_to: {
    type: "Array",
  },
  artists: {
    type: ["String"],
  },
  names: {
    type: "Array",
  },
  rules_url: {
    type: "String",
  },
  amazon_rank: {
    type: "Number",
  },
  cs_rating: {
    type: "Number",
  },
  official_url: {
    type: "String",
  },
  comment_count: {
    type: "Number",
  },
  num_user_ratings: {
    type: "Number",
  },
  average_user_rating: {
    type: "Number",
  },
  weight_amount: {
    type: "Number",
  },
  weight_units: {
    type: "String",
  },
  size_height: {
    type: "Number",
  },
  size_depth: {
    type: "Number",
  },
  size_units: {
    type: "String",
  },
  historical_low_prices: {
    type: ["Mixed"],
  },
  active: {
    type: "Boolean",
  },
  num_user_complexity_votes: {
    type: "Number",
  },
  average_learning_complexity: {
    type: "Number",
  },
  average_strategy_complexity: {
    type: "Number",
  },
  visits: {
    type: "Number",
  },
  lists: {
    type: "Number",
  },
  mentions: {
    type: "Number",
  },
  links: {
    type: "Number",
  },
  plays: {
    type: "Number",
  },
  rank: {
    type: "Number",
  },
  type: {
    type: "String",
  },
  num_distributors: {
    type: "Number",
  },
  trending_rank: {
    type: "Number",
  },
  listing_clicks: {
    type: "Number",
  },
  is_historical_low: {
    type: "Boolean",
  },
  msrp_text: {
    type: "String",
  },
  price_text: {
    type: "Date",
  },
  tags: {
    type: ["String"],
  },
  images: {
    thumb: {
      type: "String",
    },
    small: {
      type: "String",
    },
    medium: {
      type: "String",
    },
    large: {
      type: "String",
    },
    original: {
      type: "String",
    },
  },
  description_preview: {
    type: "String",
  },
});

const Boardgame = model("Boardgame", BoardgameSchema, "boardgames-collection");

module.exports = Boardgame;
