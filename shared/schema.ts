import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  password: text("password").notNull(),
  accountType: varchar("account_type", { enum: ["passenger", "driver"] }).notNull(),
  licenseNumber: text("license_number"),
  vehicleNumber: text("vehicle_number"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  routeNumber: text("route_number").notNull(),
  driverId: varchar("driver_id").references(() => users.id),
  currentLat: decimal("current_lat"),
  currentLng: decimal("current_lng"),
  currentLocation: text("current_location"),
  nextStop: text("next_stop"),
  occupancyPercentage: decimal("occupancy_percentage"),
  status: varchar("status", { enum: ["active", "delayed", "inactive"] }).default("inactive"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
