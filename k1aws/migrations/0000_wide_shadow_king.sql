CREATE TABLE `appointments` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`customer_phone` text NOT NULL,
	`customer_email` text NOT NULL,
	`service_names` text NOT NULL,
	`booking_date` text,
	`start_at` text NOT NULL,
	`end_at` text NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`appointment_notes` text,
	`customer_notes` text,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL
);
