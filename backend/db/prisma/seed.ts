import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port:3306,
  user: "root",
  password: "root",
  database: "totem_db",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminSecret = await prisma.usuario.upsert({
    where: { email: "adm@secret.com" },
    update: {},
    create: {
      nome: "admin",
      email: "tutubas@secret.com",
      senha: "W12345678",
      funcao: "Administrador",
      unidade: "SENAI Mariano Ferraz",
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