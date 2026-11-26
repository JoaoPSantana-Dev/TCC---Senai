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

  const salas = [
    'B18',
    'B16',
    'COORDENAÇÃO',
    'B12',
    'B10',
    'B6',
    'B4',
    'B2',
    'BANHEIRO F',
    'B15',
    'B13',
    'B11',
    'B09',
    'B05',
    'B03',
    'B01',
  ];

  for (const nomeSala of salas) {
    await prisma.sala.upsert({
      where: {
        bloco_andar_nomeSala: { bloco: 'B', andar: '1', nomeSala },
      },
      update: {},
      create: { nomeSala, bloco: 'B', andar: '1', imagem: '' },
    });
  }
  const salasMap = new Map<string, number>();

  for (const nomeSala of salas) {
    const sala = await prisma.sala.upsert({
      where: {
        bloco_andar_nomeSala: { bloco: 'B', andar: '1', nomeSala },
      },
      update: {},
      create: { nomeSala, bloco: 'B', andar: '1', imagem: '' },
    });

    salasMap.set(nomeSala, sala.idSala);
  }
  function getSalaId(nomeSala: string): number {
    const id = salasMap.get(nomeSala);
    if (id === undefined) {
      throw new Error(`Sala "${nomeSala}" não encontrada no salasMap.`);
    }
    return id;
  }

  const horariosAula = [
    {
      nomeCurso: 'TDS-03',
      professor: 'lincon',
      materia: 'projeto',
      turno: 'tarde',
      dia: 'sexta',
      idSala: getSalaId('B18'),
    },
    {
      nomeCurso: 'TDS-03',
      professor: 'lincon',
      materia: 'iot',
      turno: 'tarde',
      dia: 'segunda',
      idSala: getSalaId('B18'),
    },
    {
      nomeCurso: 'seila-123',
      professor: 'ronaldo',
      materia: 'computaria rs',
      turno: 'manha',
      dia: 'quarta',
      idSala: getSalaId('B12'),
    },
  ];

  for (const horario of horariosAula) {
    const jaExiste = await prisma.horarioAula.findFirst({
      where: {
        nomeCurso: horario.nomeCurso,
        professor: horario.professor,
        materia: horario.materia,
        turno: horario.turno,
        dia: horario.dia,
        idSala: horario.idSala,
      },
    });

    if (!jaExiste) {
      await prisma.horarioAula.create({
        data: horario,
      });
    }
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
