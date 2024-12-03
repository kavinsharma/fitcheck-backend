const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const {
  upload: uploadController,
  uploadOtherUser,
} = require("../controllers/upload.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").post(upload.single("files"), uploadController);

const spellchecker = require("spellchecker");
const natural = require("natural");

const categories = {
  upper: [
    "jacket",
    "blazer",
    "shirt",
    "blouse",
    "sweatshirt",
    "tank",
    "hoodie",
    "coat",
    "sweater",
    "cardigan",
    "tunic",
    "top",
    "vest",
    "jumper",
    "turtleneck",
    "bralette",
  ],
  lower: [
    "pant",
    "jean",
    "short",
    "skirt",
    "legging",
    "chino",
    "culotte",
    "cargo",
    "palazzo",
    "capri",
    "trunk",
    "brief",
    "boxer",
    "loungewear",
  ],
  overall: [
    "dress",
    "tracksuit",
    "gown",
    "robe",
    "saree",
    "kurtas",
    "uniform",
    "swim",
    "pajama",
    "nightgown",
    "onesie",
    "thermal",
    "kimono",
    "sarong",
    "wrap",
  ],
};

function sanitizeInput(input) {
  const sanitized = input
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(" ")
    .map(word =>
      spellchecker.isMisspelled(word)
        ? spellchecker.getCorrectionsForMisspelling(word)[0] || word
        : word,
    )
    .join(" ");
  return sanitized;
}

function findClosestMatch(sanitizedTag) {
  let closestCategory = null;
  let closestDistance = Infinity;

  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      const distance = natural.LevenshteinDistance(sanitizedTag, keyword);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCategory = category;
      }
    }
  }

  return closestCategory;
}

function classifyMetaTag(metaTag) {
  const sanitizedTag = sanitizeInput(metaTag);

  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");
      if (regex.test(sanitizedTag)) {
        return category;
      }
    }
  }

  return findClosestMatch(sanitizedTag);
}

router.route("/classify").post((req, res) => {
  const { metaTags } = req.body;

  if (!metaTags || !Array.isArray(metaTags)) {
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide an array of meta tags." });
  }

  const results = metaTags.map(tag => ({
    metaTag: tag,
    category: classifyMetaTag(tag),
  }));

  res.json({ results });
});

router
  .route("/member-image")
  .post(verifyToken, upload.single("files"), uploadOtherUser);

module.exports = router;
