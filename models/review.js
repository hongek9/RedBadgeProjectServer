module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Review;
}