import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    boolean,
    index,
    integer,
    pgEnum,
} from "drizzle-orm/pg-core";

//BETTER AUTH TABLES
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
    games: many(games),
    characters: many(characters),
    teamCategories: many(teamCategories),
    teams: many(teams),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

//GACHAHUB TABLES

export const games = pgTable("games", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text()
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    title: text().notNull(),
    imageUrl: text().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const roleEnum = pgEnum("role", ["dps", "sub_dps", "support", "tank"]);

export const characters = pgTable("characters", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    gameId: integer()
        .references(() => games.id, { onDelete: "cascade" })
        .notNull(),
    userId: text()
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    name: text().notNull(),
    imageUrl: text().notNull(),
    role: roleEnum().notNull(),
    rarity: text(),
    owned: boolean().default(true),
    equipmentNotes: text(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamCategories = pgTable("team_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    gameId: integer()
        .references(() => games.id, { onDelete: "cascade" })
        .notNull(),
    userId: text()
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    name: text().notNull(),
    order: integer(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teams = pgTable("teams", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    categoryId: integer()
        .references(() => teamCategories.id, { onDelete: "cascade" })
        .notNull(),
    gameId: integer()
        .references(() => games.id, { onDelete: "cascade" })
        .notNull(),
    userId: text()
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    title: text().notNull(),
    notes: text(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamMembers = pgTable("team_members", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    teamId: integer()
        .references(() => teams.id, { onDelete: "cascade" })
        .notNull(),
    characterId: integer()
        .references(() => characters.id, { onDelete: "cascade" })
        .notNull(),
    slotOrder: integer(),
});

export const gamesRelations = relations(games, ({ one, many }) => ({
    user: one(user, {
        fields: [games.userId],
        references: [user.id],
    }),
    characters: many(characters),
    teamCategories: many(teamCategories),
    teams: many(teams),
}));

export const charactersRelations = relations(characters, ({ one, many }) => ({
    user: one(user, {
        fields: [characters.userId],
        references: [user.id],
    }),
    games: one(games, {
        fields: [characters.gameId],
        references: [games.id],
    }),
    teamMembers: many(teamMembers),
}));

export const teamCategoriesRelations = relations(
    teamCategories,
    ({ one, many }) => ({
        user: one(user, {
            fields: [teamCategories.userId],
            references: [user.id],
        }),
        games: one(games, {
            fields: [teamCategories.gameId],
            references: [games.id],
        }),
        teams: many(teams),
    }),
);
export const teamsRelations = relations(teams, ({ one, many }) => ({
    user: one(user, {
        fields: [teams.userId],
        references: [user.id],
    }),
    games: one(games, {
        fields: [teams.gameId],
        references: [games.id],
    }),
    teamCategories: one(teamCategories, {
        fields: [teams.categoryId],
        references: [teamCategories.id],
    }),
    teamMembers: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
    teams: one(teams, {
        fields: [teamMembers.teamId],
        references: [teams.id],
    }),
    characters: one(characters, {
        fields: [teamMembers.characterId],
        references: [characters.id],
    }),
}));
