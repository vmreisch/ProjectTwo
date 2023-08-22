const express = require("express");
const router = express.Router();
const Smoothie = require("../models/smoothie");
const Order = require("../models/order");

router.get("/", async (req, res) => {
  let smoothies = await Smoothie.find();
  res.render("smoothie/index.ejs", { smoothies });
});

router.get("/seed", async (req, res) => {
  await Order.deleteMany({});
  await Smoothie.deleteMany({});
  let seededSmoothies = await Smoothie.create([
    {
      name: "Power-Lifters Blend",
      description: "Optimize muscle growth and recovery",
      ingredients:
        "Whey protien, Turmeric, L-Glutamin, Creatine, banana, mixed berries, rolled oats, almond butter, chai seeds, soy milk",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.Vjs9x3_Psi4j8sbJ9ls78AHaKX&pid=Api&P=0&h=220",
      price: 10,
    },
    {
      name: "Digestive Health Delight",
      description: "Promote a healthy gut",
      ingredients:
        "Plain yogurt, chia seeds, flax seeds, fennel seeds, banana, papaya, spinach, ginger root, honey, aloe very juice",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.R4waeDofkhQDc9sEMeuwQgHaLH&pid=Api&P=0&h=220",
      price: 10,
    },
    {
      name: "Antioxidant Boost",
      description: "Radiate with a free-radical fighting concoction",
      ingredients:
        "Green tea, blueberries, raspberries, pomegranate seeds, kale, walnuts, turmeric, matcha, acai, honey",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.gHuL0nBvEyHOeunWxnMJaQHaLH&pid=Api&P=0&h=220",
      price: 10,
    },
    {
      name: "Detoxification Tonic",
      description: "Cleanse with a blend that purifies from within",
      ingredients:
        "Coconut water, apple, lemon, papaya, spinach, cilantro, flax seeds, ginger root, spirulina, aloe verya juice",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.6oLFV0hyUuteT-AcOaLCZAHaJ3&pid=Api&P=0&h=220",
      price: 10,
    },
    {
      name: "Energizer Bunny Blend",
      description: "Invigorate your day",
      ingredients:
        "Almond milk, banana, mixed berries, mango, greek yogurt, flax seeds, almond butter, rolled oats, espresso shot, maca powder",
      image:
        "https://tse2.mm.bing.net/th?id=OIP.Qa7ueg9ZmJ8c0sSFRHNWHgHaLG&pid=Api&P=0&h=220",
      price: 10,
    },
    {
      name: "Immunity Elixir",
      description: "Fortify your defenses",
      ingredients:
        "Orange juice, kiwi, blueberries, papaya, spinach, chia seeds, ginger root, black pepper, kefir, raw honey, lemon juice, elerberry",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.ygyA29z6B0ka1gztIzed2QHaEK&pid=Api&P=0&h=220",
      price: 10,
    },
  ]);
  res.send(seededSmoothies);
});

router.post("/order", async (req, res) => {
  let smoothies = await Smoothie.find({ _id: { $in: req.body.smoothies } });
  req.body.userId = req.session.userId;
  let total = 0;
  req.body.smoothies.forEach(
    (smoothie) =>
      (total += smoothies.find((s) => {
        return s._id.toString() == smoothie;
      }).price)
  );
  console.log(total);
  req.body.total = total;
  let newOrder = await Order.create(req.body);

  res.json(newOrder);
});

router.get("/order/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("smoothies")
    .populate("userId");
  res.render("order/show.ejs", { order });
});

router.get("/order", async (req, res) => {
  const orders = await Order.find({ userId: req.session.userId })
    .populate("smoothies")
    .populate("userId");
  res.render("order/index.ejs", { orders });
});

module.exports = router;
