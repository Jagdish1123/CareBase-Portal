import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { json, integer, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

// Users Table
const Users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  folders: json('folders').notNull().default('{}'),
  treatmentCounts: integer('treatment_counts').notNull(),
  folder: json('folder').notNull().default('{}'),
  createdBy: varchar('created_by', { length: 255 }).notNull(),
});

// Doctors Table
const Doctors = mysqlTable('doctors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  specialization: varchar('specialization', { length: 255 }).notNull(),
  experience: integer('experience').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  createdBy: varchar('created_by', { length: 255 }).notNull(),
});

// DoctorUsers Table
const DoctorUsers = mysqlTable('doctor_users', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id').notNull().references(() => Doctors.id),
  userId: integer('user_id').notNull().references(() => Users.id),
});
