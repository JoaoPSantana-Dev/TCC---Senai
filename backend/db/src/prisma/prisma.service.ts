import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import mariadb from 'mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Configura o pool explicitamente com fallback para garantir que nenhum valor seja undefined
    const pool = mariadb.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'teste-db',
    });

    const adapter = new PrismaMariaDb(pool as any, {
      useTextProtocol: true,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}