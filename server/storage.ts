import { type User, type InsertUser, type Vehicle, type InsertVehicle, users, vehicles } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle operations
  getAllVehicles(): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicleLocation(id: string, lat: string, lng: string, location: string): Promise<Vehicle>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vehicles: Map<string, Vehicle>;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    
    // Initialize with some sample vehicles for demonstration
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleVehicles: Vehicle[] = [
      {
        id: randomUUID(),
        routeNumber: '101',
        driverId: null,
        currentLat: '28.6139',
        currentLng: '77.2090',
        currentLocation: 'Central Station',
        nextStop: 'Market Square (5 mins)',
        occupancyPercentage: '65',
        status: 'active',
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        routeNumber: '205',
        driverId: null,
        currentLat: '28.6319',
        currentLng: '77.2219',
        currentLocation: 'University Campus',
        nextStop: 'City Hall (12 mins)',
        occupancyPercentage: '80',
        status: 'delayed',
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        routeNumber: '150',
        driverId: null,
        currentLat: '28.5982',
        currentLng: '77.1995',
        currentLocation: 'Shopping District',
        nextStop: 'Train Station (8 mins)',
        occupancyPercentage: '45',
        status: 'active',
        lastUpdated: new Date(),
      },
    ];

    sampleVehicles.forEach(vehicle => {
      this.vehicles.set(vehicle.id, vehicle);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      licenseNumber: insertUser.licenseNumber || null,
      vehicleNumber: insertUser.vehicleNumber || null
    };
    this.users.set(id, user);
    return user;
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = randomUUID();
    const vehicle: Vehicle = { 
      ...insertVehicle, 
      id, 
      lastUpdated: new Date(),
      status: insertVehicle.status || 'inactive',
      driverId: insertVehicle.driverId || null,
      currentLat: insertVehicle.currentLat || null,
      currentLng: insertVehicle.currentLng || null,
      currentLocation: insertVehicle.currentLocation || null,
      nextStop: insertVehicle.nextStop || null,
      occupancyPercentage: insertVehicle.occupancyPercentage || null
    };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicleLocation(id: string, lat: string, lng: string, location: string): Promise<Vehicle> {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    const updatedVehicle: Vehicle = {
      ...vehicle,
      currentLat: lat,
      currentLng: lng,
      currentLocation: location,
      lastUpdated: new Date(),
    };

    this.vehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return await db.select().from(vehicles);
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    const result = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
    return result[0];
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const result = await db.insert(vehicles).values(insertVehicle).returning();
    return result[0];
  }

  async updateVehicleLocation(id: string, lat: string, lng: string, location: string): Promise<Vehicle> {
    const result = await db
      .update(vehicles)
      .set({
        currentLat: lat,
        currentLng: lng,
        currentLocation: location,
        lastUpdated: new Date(),
      })
      .where(eq(vehicles.id, id))
      .returning();
    
    if (!result[0]) {
      throw new Error('Vehicle not found');
    }
    
    return result[0];
  }

  async initializeSampleData(): Promise<void> {
    // Check if vehicles already exist
    const existingVehicles = await this.getAllVehicles();
    if (existingVehicles.length > 0) {
      return; // Data already seeded
    }

    // Seed sample vehicles
    const sampleVehicles: InsertVehicle[] = [
      {
        routeNumber: '101',
        currentLat: '28.6139',
        currentLng: '77.2090',
        currentLocation: 'Central Station',
        nextStop: 'Market Square (5 mins)',
        occupancyPercentage: '65',
        status: 'active',
      },
      {
        routeNumber: '205',
        currentLat: '28.6319',
        currentLng: '77.2219',
        currentLocation: 'University Campus',
        nextStop: 'City Hall (12 mins)',
        occupancyPercentage: '80',
        status: 'delayed',
      },
      {
        routeNumber: '150',
        currentLat: '28.5982',
        currentLng: '77.1995',
        currentLocation: 'Shopping District',
        nextStop: 'Train Station (8 mins)',
        occupancyPercentage: '45',
        status: 'active',
      },
    ];

    for (const vehicle of sampleVehicles) {
      await this.createVehicle(vehicle);
    }
  }
}

export const storage = new DatabaseStorage();
