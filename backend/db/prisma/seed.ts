import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

// usa a mesma DATABASE_URL do backend incluindo o ssl exigido pelo tidb cloud
const url = new URL(process.env.DATABASE_URL!);
const usarSsl = ['strict', 'true'].includes(
  url.searchParams.get('sslaccept') ?? url.searchParams.get('ssl') ?? '',
);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: decodeURIComponent(url.pathname.slice(1)),
  ssl: usarSsl ? { rejectUnauthorized: true } : undefined,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminSecret = await prisma.usuario.upsert({
    where: { email: 'tutubas@secret.com' },
    update: {},
    create: {
      nome: 'admin',
      email: 'tutubas@secret.com',
      senha: 'W12345678',
      funcao: 'Administrador',
      unidade: 'SENAI Mariano Ferraz',
    },
  });
  console.log(adminSecret);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
