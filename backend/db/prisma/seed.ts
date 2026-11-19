import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

// usa a mesma DATABASE_URL do backend incluindo o ssl exigido pelo tidb cloud
const url = new URL(process.env.DATABASE_URL!);
const usarSsl = ['strict', 'true'].includes(
  url.searchParams.get('sslaccept') ?? url.searchParams.get('ssl') ?? '',
);

const adapter = new PrismaMariaDb({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'totem_db',
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
  const salas=["B18", "B16", "COORDENAÇÃO", "B12", "B10", "B6", "B4", "B2", "BANHEIRO F",
    "B15", "B13", "B11", "B09", "B05", "B03", "B01",]
  for (const nomeSala of salas){
    await prisma.sala.upsert({
      where: { 
        bloco_andar_nomeSala: {bloco:"B",andar:"1",nomeSala}
       },
      update: {},
      create:{nomeSala,bloco:"B", andar:"1", imagem:""}
    })
  }  
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
