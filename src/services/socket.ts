import { io, Socket } from 'socket.io-client';
import { env } from '@/config/env';
import { storage, STORAGE_KEYS } from '@/utils/storage';

type SocketCallback = (...args: unknown[]) => void;

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<SocketCallback>> = new Map();

  connect(): void {
    if (this.socket?.connected) return;

    const token = storage.get<string>(STORAGE_KEYS.TOKEN);
    if (!token) return;

    this.socket = io(env.socketUrl, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Re-subscribe to all events
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach((callback) => {
        this.socket?.on(event, callback);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
  }

  on(event: string, callback: SocketCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }

    // Return unsubscribe function
    return () => {
      this.off(event, callback);
    };
  }

  off(event: string, callback: SocketCallback): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.listeners.delete(event);
      }
    }

    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event: string, data?: unknown): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Room management
  joinProject(projectId: string): void {
    this.emit('join:project', { projectId });
  }

  leaveProject(projectId: string): void {
    this.emit('leave:project', { projectId });
  }

  joinIssue(issueId: string): void {
    this.emit('join:issue', { issueId });
  }

  leaveIssue(issueId: string): void {
    this.emit('leave:issue', { issueId });
  }
}

export const socketService = new SocketService();

// Socket event types
export const SOCKET_EVENTS = {
  // Issue events
  ISSUE_CREATED: 'issue:created',
  ISSUE_UPDATED: 'issue:updated',
  ISSUE_DELETED: 'issue:deleted',
  ISSUE_MOVED: 'issue:moved',

  // Comment events
  COMMENT_CREATED: 'comment:created',
  COMMENT_UPDATED: 'comment:updated',
  COMMENT_DELETED: 'comment:deleted',

  // Member events
  MEMBER_ADDED: 'member:added',
  MEMBER_REMOVED: 'member:removed',
  MEMBER_ROLE_CHANGED: 'member:roleChanged',

  // Notification events
  NOTIFICATION_NEW: 'notification:new',

  // Presence events
  USER_JOINED: 'presence:userJoined',
  USER_LEFT: 'presence:userLeft',
  USERS_ONLINE: 'presence:usersOnline',
} as const;
