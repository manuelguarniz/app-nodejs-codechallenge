import { db } from '../src/configs/db.config';

async function main() {
  const status = await db.transactionStatus.findMany();
  console.log(status);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
