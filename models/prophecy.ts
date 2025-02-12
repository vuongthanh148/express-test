import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Prophecy extends Model {
  // we have to declare the members
  // for TypeScript to properly work.
  public id!: number | null;
  public title!: string | null;
  public description!: string | null;
}

Prophecy.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "prophecy",

    // this is necessary, otherwise
    // sequelize will overwrite your
    // tablename with a pluralised
    // form. i.e. prophecies.
    freezeTableName: true,

    // sequelize will also try to add
    // createdAt, updatedAt, deletedAt
    // timestamp columns by default.
    timestamps: false,
  }
);

export default Prophecy;
