import { ModelAttributes, QueryInterface, literal } from "sequelize";

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out
   *

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable("movies", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: "varchar" },
      duration: { type: "varchar", allowNull: true },
      cinemaId: { type: "integer", allowNull: true },
      onAir: { type: "timestamp", allowNull: false },
      status: { type: "enum", values: ["Pre-release", "open", "booked"] },
      description: { type: "string", allowNull: true },
      createdAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    } as ModelAttributes);
    await queryInterface.createTable("movie_cast", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: "varchar",
        allowNull: false,
      },
      image: {
        type: "string",
        allowNull: true,
      },
      movieId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      type: {
        type: "enum",
        values: ["cast", "crew"],
      },
      createdAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    } as ModelAttributes);
    await queryInterface.createTable("movie_timings", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      onAirTime: {
        type: "timestamp",
        allowNull: false,
      },
      createdAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    } as ModelAttributes);
    await queryInterface.createTable("movie_pricing", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      movieTimingId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movie_timings",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      price: {
        type: "integer",
        allowNull: false,
      },
      vip_seat_premium: {
        type: "integer",
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    } as ModelAttributes);
    await queryInterface.createTable("movie_seats", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      movieTimingId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movie_timings",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      show_room: {
        type: "string",
        allowNull: false,
      },
      price: {
        type: "integer",
        allowNull: false,
      },
      is_available: {
        type: "boolean",
        allowNull: false,
        defaultValue: 1,
      },
      seat_type: {
        type: "string",
        allowNull: true,
      },
      createdAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    } as ModelAttributes);
    await queryInterface.createTable("user_booked_seats", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      movieSeatId: {
        type: "integer",
        allowNull: false,
        references: {
          model: {
            tableName: "movie_seats",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      total: {
        type: "integer",
        allowNull: false,
      },
      user_id: {
        type: "integer",
        allowNull: false,
        // TODD: create user and make foreign key
      },
      createdAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "timestamp",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    } as ModelAttributes);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
