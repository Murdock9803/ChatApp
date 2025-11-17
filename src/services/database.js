import * as SQLite from 'expo-sqlite';
import { generateDemoData } from '../utils/demoData';

// Databse file - Schema and functions

let db = null;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('chatapp.db');
  }
  return db;
};

const dropAllTables = async (database) => {
  try {
    await database.execAsync(`
      DROP TABLE IF EXISTS messages;
      DROP TABLE IF EXISTS contacts;
      DROP TABLE IF EXISTS config_cache;
    `);
    console.log('All tables dropped');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
};

export const initializeDatabase = async () => {
  try {
    const database = await openDatabase();
    await dropAllTables(database);

    // The Tables - contacts, messages, config_cache
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        avatar TEXT,
        online_status INTEGER DEFAULT 0,
        last_seen TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_id INTEGER NOT NULL,
        message_text TEXT NOT NULL,
        is_sent INTEGER DEFAULT 1,
        status TEXT DEFAULT 'pending',
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        synced INTEGER DEFAULT 0,
        FOREIGN KEY (contact_id) REFERENCES contacts (id)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS config_cache (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        last_updated TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database tables created');
    await populateDemoData(database);
    console.log('Database initialized successfully');
    return database;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

// Populating the database
const populateDemoData = async (database) => {
  const { contacts, messages } = generateDemoData();

  for (const contact of contacts) {
    await database.runAsync(
      'INSERT INTO contacts (name, avatar, online_status, last_seen) VALUES (?, ?, ?, ?)',
      [contact.name, contact.avatar, contact.online ? 1 : 0, contact.lastSeen]
    );
  }

  for (const message of messages) {
    await database.runAsync(
      'INSERT INTO messages (contact_id, message_text, is_sent, status, timestamp, synced) VALUES (?, ?, ?, ?, ?, ?)',
      [message.contactId, message.text, message.isSent ? 1 : 0, message.status, message.timestamp, message.synced ? 1 : 0]
    );
  }

  console.log(`Inserted ${contacts.length} contacts and ${messages.length} messages`);
};

export const getAllContacts = async () => {
  try {
    const database = await openDatabase();
    
    const contacts = await database.getAllAsync(`
      SELECT 
        c.id,
        c.name,
        c.avatar,
        c.online_status,
        c.last_seen,
        c.created_at,
        (SELECT message_text FROM messages WHERE contact_id = c.id ORDER BY timestamp DESC LIMIT 1) as last_message,
        (SELECT timestamp FROM messages WHERE contact_id = c.id ORDER BY timestamp DESC LIMIT 1) as last_message_time
      FROM contacts c
      ORDER BY last_message_time DESC NULLS LAST
    `);

    return contacts;
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    throw error;
  }
};

export const getMessagesByContactId = async (contactId) => {
  try {
    const database = await openDatabase();
    
    const messages = await database.getAllAsync(
      'SELECT * FROM messages WHERE contact_id = ? ORDER BY timestamp ASC',
      [contactId]
    );

    return messages;
  } catch (error) {
    console.error('Error in getMessagesByContactId:', error);
    throw error;
  }
};

export const insertMessage = async (contactId, messageText, isSent = true) => {
  try {
    const database = await openDatabase();
    
    const result = await database.runAsync(
      'INSERT INTO messages (contact_id, message_text, is_sent, status, synced, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [contactId, messageText, isSent ? 1 : 0, 'pending', 0, new Date().toISOString()]
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error in insertMessage:', error);
    throw error;
  }
};

export const updateMessageStatus = async (messageId, status) => {
  try {
    const database = await openDatabase();
    
    await database.runAsync(
      'UPDATE messages SET status = ?, synced = ? WHERE id = ?',
      [status, status === 'delivered' ? 1 : 0, messageId]
    );
  } catch (error) {
    console.error('Error in updateMessageStatus:', error);
    throw error;
  }
};

export const getUnsyncedMessages = async () => {
  try {
    const database = await openDatabase();
    
    const messages = await database.getAllAsync(
      'SELECT * FROM messages WHERE synced = 0 AND is_sent = 1'
    );

    return messages;
  } catch (error) {
    console.error('Error in getUnsyncedMessages:', error);
    return [];
  }
};

export const markMessagesSynced = async (messageIds) => {
  try {
    const database = await openDatabase();
    
    if (messageIds.length === 0) return;
    
    const placeholders = messageIds.map(() => '?').join(',');
    await database.runAsync(
      `UPDATE messages SET synced = 1, status = 'delivered' WHERE id IN (${placeholders})`,
      messageIds
    );
  } catch (error) {
    console.error('Error in markMessagesSynced:', error);
    throw error;
  }
};

export const searchContacts = async (searchTerm) => {
  try {
    const database = await openDatabase();
    
    const contacts = await database.getAllAsync(
      `SELECT 
        c.id,
        c.name,
        c.avatar,
        c.online_status,
        c.last_seen,
        (SELECT message_text FROM messages WHERE contact_id = c.id ORDER BY timestamp DESC LIMIT 1) as last_message,
        (SELECT timestamp FROM messages WHERE contact_id = c.id ORDER BY timestamp DESC LIMIT 1) as last_message_time
      FROM contacts c
      WHERE c.name LIKE ?
      ORDER BY last_message_time DESC NULLS LAST`,
      [`%${searchTerm}%`]
    );

    return contacts;
  } catch (error) {
    console.error('Error in searchContacts:', error);
    throw error;
  }
};
