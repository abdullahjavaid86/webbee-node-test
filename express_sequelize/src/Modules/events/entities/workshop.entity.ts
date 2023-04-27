import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import Event from "./event.entity";
import { ModelAttributeColumnOptions } from "sequelize";

@Table({
  updatedAt: false,
})
export default class Workshop extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column({ type: "datetime" } as ModelAttributeColumnOptions)
  start: string;

  @Column({ type: "datetime" } as ModelAttributeColumnOptions)
  end: string;

  @Column({
    type: "integer",
    defaultValue: null,
  } as ModelAttributeColumnOptions)
  eventId: number;

  @Column
  name: string;

  @Column({ type: "datetime" } as ModelAttributeColumnOptions)
  declare createdAt: string;

  @BelongsTo(() => Event, "eventId")
  event: Event;
}
