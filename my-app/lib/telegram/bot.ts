import TelegramBot from 'node-telegram-bot-api';
import { createNote, getNoteById } from '../db';
import { processNote } from '../ai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const UPLOADS_DIR = join(process.cwd(), 'uploads');

if (!existsSync(UPLOADS_DIR)) {
  mkdirSync(UPLOADS_DIR, { recursive: true });
}

let bot: TelegramBot | null = null;

export function initBot(): TelegramBot {
  if (!TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN not set');
  }
  
  if (!bot) {
    bot = new TelegramBot(TOKEN, { polling: true });
    setupHandlers();
  }
  
  return bot;
}

function setupHandlers() {
  if (!bot) return;
  
  // Handle text messages
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    
    // Only respond to specific chat (Jorge's chat)
    if (chatId.toString() !== process.env.TELEGRAM_CHAT_ID) {
      return;
    }
    
    try {
      // Handle text
      if (msg.text) {
        await handleTextMessage(msg);
      }
      
      // Handle voice
      else if (msg.voice) {
        await handleVoiceMessage(msg);
      }
      
      // Handle photo
      else if (msg.photo) {
        await handlePhotoMessage(msg);
      }
      
      // Handle video
      else if (msg.video) {
        await handleVideoMessage(msg);
      }
      
    } catch (error) {
      console.error('Error handling message:', error);
      bot?.sendMessage(chatId, '❌ Error processing your message. Please try again.');
    }
  });
  
  console.log('🤖 Telegram bot initialized');
}

async function handleTextMessage(msg: TelegramBot.Message) {
  const content = msg.text!;
  const noteId = crypto.randomUUID();
  
  // Create note
  const note = createNote({
    id: noteId,
    content,
    content_type: 'text',
    source: 'telegram',
    metadata: JSON.stringify({
      telegram_message_id: msg.message_id,
      chat_id: msg.chat.id,
      date: msg.date,
    }),
  });
  
  // Process with AI
  await processNote(noteId, content);
  
  // Send confirmation
  const processedNote = getNoteById(noteId);
  const tags = processedNote ? JSON.parse(processedNote.metadata || '{}').tags || [] : [];
  
  bot?.sendMessage(
    msg.chat.id,
    `✅ *Saved to Second Brain*\n\n📝 ${content.slice(0, 100)}${content.length > 100 ? '...' : ''}\n\n🏷️ Tags: ${tags.join(', ') || 'Processing...'}`,
    { parse_mode: 'Markdown' }
  );
}

async function handleVoiceMessage(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  
  bot?.sendMessage(chatId, '🎙️ Processing voice note...');
  
  try {
    const fileId = msg.voice!.file_id;
    const file = await bot!.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;
    
    // Download voice file
    const response = await fetch(fileUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const fileName = `voice_${Date.now()}.ogg`;
    const filePath = join(UPLOADS_DIR, fileName);
    
    writeFileSync(filePath, buffer);
    
    // TODO: Transcribe with Whisper
    const transcription = '[Voice transcription pending - Whisper integration]';
    
    const noteId = crypto.randomUUID();
    const note = createNote({
      id: noteId,
      content: transcription,
      content_type: 'audio',
      source: 'telegram',
      metadata: JSON.stringify({
        telegram_message_id: msg.message_id,
        file_path: filePath,
        duration: msg.voice!.duration,
      }),
    });
    
    await processNote(noteId, transcription);
    
    bot?.sendMessage(
      chatId,
      `✅ *Voice note saved*\n\n🎙️ Duration: ${msg.voice!.duration}s\n📝 Transcription: ${transcription.slice(0, 100)}...`,
      { parse_mode: 'Markdown' }
    );
    
  } catch (error) {
    console.error('Error processing voice:', error);
    bot?.sendMessage(chatId, '❌ Error processing voice note');
  }
}

async function handlePhotoMessage(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  
  bot?.sendMessage(chatId, '📸 Processing image...');
  
  try {
    // Get largest photo
    const photo = msg.photo!.sort((a, b) => b.file_size! - a.file_size!)[0];
    const file = await bot!.getFile(photo.file_id);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;
    
    // Download image
    const response = await fetch(fileUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const fileName = `photo_${Date.now()}.jpg`;
    const filePath = join(UPLOADS_DIR, fileName);
    
    writeFileSync(filePath, buffer);
    
    // TODO: OCR with OpenAI Vision
    const caption = msg.caption || '[Image analysis pending - Vision integration]';
    
    const noteId = crypto.randomUUID();
    const note = createNote({
      id: noteId,
      content: caption,
      content_type: 'image',
      source: 'telegram',
      metadata: JSON.stringify({
        telegram_message_id: msg.message_id,
        file_path: filePath,
        caption: msg.caption,
      }),
    });
    
    await processNote(noteId, caption);
    
    bot?.sendMessage(
      chatId,
      `✅ *Image saved*\n\n📸 ${caption.slice(0, 100)}${caption.length > 100 ? '...' : ''}`,
      { parse_mode: 'Markdown' }
    );
    
  } catch (error) {
    console.error('Error processing photo:', error);
    bot?.sendMessage(chatId, '❌ Error processing image');
  }
}

async function handleVideoMessage(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  
  bot?.sendMessage(chatId, '🎥 Video support coming soon! For now, please describe the video in text.');
}

export function sendNotification(chatId: string, message: string) {
  bot?.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}
