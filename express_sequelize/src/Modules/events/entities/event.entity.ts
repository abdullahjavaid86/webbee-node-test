import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { ModelAttributeColumnOptions } from "sequelize";
import Workshop from "./workshop.entity";

@Table({
  updatedAt: false,
})
export default class Event extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  name: string;

  @Column({ type: "datetime" } as ModelAttributeColumnOptions)
  declare createdAt: Date;

  @HasMany(() => Workshop, "eventId")
  workshops: Workshop[];
}
