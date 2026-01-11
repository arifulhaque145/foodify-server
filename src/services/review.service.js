const { foodifyDB } = require("../config/mongoClient");
const { ObjectId } = require("mongodb");

const reviewCollection = foodifyDB.collection("reviews");

const getAllReviewByUserFromDB = async (id) => {
  const reviews = await reviewCollection
    .find({ userId: new ObjectId(id) })
    .toArray();
  return reviews;
};

const addOneReviewToDB = async (userId, foodItemId, rating, comment) => {
  const review = {
    userId: new ObjectId(userId),
    foodItemId: new ObjectId(foodItemId),
    rating,
    comment,
    addedAt: new Date(),
  };
  const result = await reviewCollection.insertOne(review);
  return result;
};

const updateOneReviewFromDB = async (reviewId, reviewData) => {
  const filter = { _id: new ObjectId(reviewId) };
  const updateDoc = {
    $set: reviewData,
  };
  const updatedReview = await reviewCollection.updateOne(filter, updateDoc);
  return updatedReview;
};

const removeOneReviewFromDB = async (id) => {
  const result = await reviewCollection.deleteOne({
    _id: new ObjectId(id),
  });
  return result;
};

module.exports = {
  getAllReviewByUserFromDB,
  addOneReviewToDB,
  updateOneReviewFromDB,
  removeOneReviewFromDB,
};
