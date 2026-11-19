import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';

// o adaptador do mariadb não entende "?sslaccept=strict" da DATABASE_URL
// então a url é lida aqui e o ssl é ligado na conexão, como o tidb cloud exige
function configuracaoDoBanco() {
  const url = new URL(process.env.DATABASE_URL!);
  const usarSsl = ['strict', 'true'].includes(
    url.searchParams.get('sslaccept') ?? url.searchParams.get('ssl') ?? '',
  );

  return {
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    ssl: usarSsl ? { rejectUnauthorized: true } : undefined,
    connectionLimit: 5,
  };
}

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb(configuracaoDoBanco(), {
      useTextProtocol: true,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
