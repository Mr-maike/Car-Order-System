export interface LogData {
  level: 'info' | 'warn' | 'error';
  message: string;
  component?: string;
  duration?: number;
  url?: string; // ✅ ADICIONAR ESTA PROPRIEDADE
  status?: number;
  operation?: string;
  metadata?: Record<string, any>;
}

export class Logger {
  static log(data: LogData) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...data,
    };

    if (data.level === 'error') {
      console.error(JSON.stringify(logEntry));
    } else if (data.level === 'warn') {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }

  static info(message: string, metadata?: Omit<LogData, 'level' | 'message'>) {
    this.log({ level: 'info', message, ...metadata });
  }

  static error(error: Error, metadata?: Omit<LogData, 'level' | 'message'>) {
    this.log({ 
      level: 'error', 
      message: error.message,
      ...metadata,
      metadata: { 
        ...metadata?.metadata, 
        stack: error.stack 
      } 
    });
  }
}