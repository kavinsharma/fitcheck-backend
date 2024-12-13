const spellchecker = require("spellchecker");
const natural = require("natural");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const {
  CustomError,
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");
const { responseHandler } = require("../../core/handlers/response.handlers");
const { vtonWrapper } = require("../../core/utils/api.utils");

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
    "pants",
    "jeans",
    "shorts",
    "skirt",
    "legging",
    "chinos",
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
const getClassify = async metaTags => {
  try {
    if (!metaTags || !Array.isArray(metaTags)) {
      throw new CustomError("Please send the metatag", 400);
    }

    const results = metaTags.map(tag => ({
      metaTag: tag,
      category: classifyMetaTag(tag),
    }));

    return results[0]?.category;
  } catch (error) {
    console.log("🚀 ~ getClassify ~ error:", error);
  }
};
const getImage = async (req, res, next) => {
  try {
    const body = req.body;
    console.log("🚀 ~ getImage ~ body:", body);
    let metaTags = req.body.metaTags;

    if (!metaTags || !Array.isArray(metaTags)) {
      throw new CustomError("Please send the metatag", 400);
    }
    const metatag = await getClassify(body?.metaTags);
    const payload = {
      inputs: {
        person_image_url: req.body.personImageUrl,
        cloth_image_url: req.body.clothImageUrl,
        cloth_type: metatag,
        num_inference_steps: 50,
        guidance_scale: 2.5,
        seed: 42,
      },
    };
    const imageGenerated = await vtonWrapper(payload);
    responseHandler(res, { imageGenerated }, 200, "ok");
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

module.exports = { getImage };
