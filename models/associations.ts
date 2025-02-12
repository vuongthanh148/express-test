import Prophecy from "./prophecy";
import Prophet from "./prophet";

// adds association to Prophecy model
Prophecy.belongsTo(Prophet, {
  foreignKey: "prophet_id",
});

// adds association to Prophet model
Prophet.hasMany(Prophecy, {
  foreignKey: "prophet_id",
});
