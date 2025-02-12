import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Achievement extends Model {
  public id!: number;
  public date!: Date;
  public title!: string;
  public description!: string;
}

Achievement.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "achievement",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Achievement;
