import { Server as SocketIOServer, Socket } from 'socket.io';
import { logger } from './logger';

export const setupSocketIO = (io: SocketIOServer): void => {
  // Authentication middleware for Socket.IO
  io.use((_socket, next) => {
    // TODO: Implement JWT authentication for Socket.IO
    // For now, allow all connections
    next();
  });

  io.on('connection', (socket: Socket) => {
    logger.info(`Client connected: ${socket.id}`, {
      ip: socket.handshake.address,
      userAgent: socket.handshake.headers['user-agent']
    });

    // Join loan-specific rooms
    socket.on('join-loan', (loanId: string) => {
      socket.join(`loan-${loanId}`);
      logger.info(`Socket ${socket.id} joined loan room: ${loanId}`);
    });

    // Leave loan rooms
    socket.on('leave-loan', (loanId: string) => {
      socket.leave(`loan-${loanId}`);
      logger.info(`Socket ${socket.id} left loan room: ${loanId}`);
    });

    // Handle investment notifications
    socket.on('subscribe-investments', () => {
      socket.join('investments');
      logger.info(`Socket ${socket.id} subscribed to investment notifications`);
    });

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      logger.info(`Client disconnected: ${socket.id}`, { reason });
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });


  logger.info('Socket.IO server initialized');
};

// Export broadcast functions for use in other modules
export const broadcastInvestmentUpdate = (io: SocketIOServer, loanId: string, data: any) => {
  io.to(`loan-${loanId}`).emit('investment-update', {
    loanId,
    data,
    timestamp: new Date().toISOString()
  });
};

export const broadcastLoanStatusUpdate = (io: SocketIOServer, loanId: string, status: string) => {
  io.to(`loan-${loanId}`).emit('loan-status-update', {
    loanId,
    status,
    timestamp: new Date().toISOString()
  });
};

export const broadcastNewLoan = (io: SocketIOServer, loanData: any) => {
  io.to('investments').emit('new-loan', {
    ...loanData,
    timestamp: new Date().toISOString()
  });
};
