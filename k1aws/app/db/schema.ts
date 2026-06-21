import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const usersTable = sqliteTable('users', {
    id: text('id').primaryKey(),
    customerName: text('customerName').notNull(),
    customerPhone: text('customerPhone').notNull(),
    customerEmail: text('customerEmail').notNull(),
    nailSize: text('nailSize'),
    userNotes: text('userNotes'),
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const appointmentsTable = sqliteTable('appointments', {
    id: text('id'),
    services: text('services').notNull(),
    serviceStart: text('serviceStart'),
    serviceEnd: text('serviceEnd'),
    serviceDate: text('serviceDate'),
    createdAt: integer('createdAt').default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
    status: text('status').notNull().default('confirmed'),
    appointmentNotes: text('appointmentNotes'),
});

export type InsertAppointment = typeof usersTable.$inferInsert;
export type SelectAppointment = typeof appointmentsTable.$inferSelect;


