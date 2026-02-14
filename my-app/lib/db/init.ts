/**
 * 🧠 Second Brain - Database Initialization
 * Crea/recreate la base de datos con el esquema PARA
 */

import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

const DB_PATH = path.join(process.cwd(), 'second-brain.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

console.log('🧠 Initializing Second Brain database...');
console.log(`📁 Database: ${DB_PATH}`);

// Read schema
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

// Create/recreate database
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Execute schema
db.exec(schema);

console.log('✅ Schema created successfully');

// Insert default workspaces
db.exec(`
  INSERT OR IGNORE INTO workspaces (id, name, description, is_personal) VALUES
    ('personal', 'Personal', 'Tu knowledge base personal', 1),
    ('sparkplug', 'Sparkplug', 'Notas del equipo Sparkplug', 0),
    ('amber', 'Amber Studio', 'Notas de Amber Studio', 0);
`);

console.log('✅ Default workspaces created');

// Insert sample PARA categories
db.exec(`
  INSERT OR IGNORE INTO projects (id, name, description) VALUES
    ('second-brain-v1', 'Second Brain v1.0', 'Knowledge base personal con IA'),
    ('sparkchatbots', 'SparkChatbots', 'Plataforma de chatbots');
`);

db.exec(`
  INSERT OR IGNORE INTO areas (id, name, description) VALUES
    ('engineering', 'Engineering', 'Desarrollo y tecnología'),
    ('product', 'Product Management', 'Gestión de producto'),
    ('leadership', 'Leadership', 'Liderazgo y equipo');
`);

console.log('✅ Sample PARA data created');

// Show stats
const noteCount = db.prepare('SELECT COUNT(*) as count FROM notes').get() as { count: number };
const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
const areaCount = db.prepare('SELECT COUNT(*) as count FROM areas').get() as { count: number };

console.log('\n📊 Database Stats:');
console.log(`   Notes: ${noteCount.count}`);
console.log(`   Projects: ${projectCount.count}`);
console.log(`   Areas: ${areaCount.count}`);

console.log('\n🎉 Second Brain database ready!');

db.close();
