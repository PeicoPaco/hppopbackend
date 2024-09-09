/* eslint-disable @typescript-eslint/no-var-requires */
const equipments = require('./seedData/equipment.json');
const healthcenters = require('./seedData/healthcenter.json');
const operationsrooms = require('./seedData/operationrooms.json');
const operations = require('./seedData/operations.json');
const requests = require('./seedData/requests.json');
const roles = require('./seedData/roles.json');
const staffs = require('./seedData/staff.json');
const status = require('./seedData/status.json');
const users = require('./seedData/users.json');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.request.deleteMany();
  await prisma.status.deleteMany();
  await prisma.operation.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.operationsroom.deleteMany();
  await prisma.healthcenter.deleteMany();

  for (const role of roles) {
    await prisma.roles.create({
      data: {
        id: role.id,
        name: role.name,
      },
    });
  }

  for (const item of status) {
    await prisma.status.create({
      data: {
        id: item.id,
        status_name: item.status_name,
      },
    });
  }

  for (const healthcenter of healthcenters) {
    await prisma.healthcenter.create({
      data: {
        id: healthcenter.id,
        healthcenter_name: healthcenter.healthcenter_name,
        admin_name: healthcenter.admin_name,
        contact_number: healthcenter.contact_number,
        contact_email: healthcenter.contact_email,
      },
    });
  }

  for (const operationroom of operationsrooms) {
    await prisma.operationsroom.create({
      data: {
        id: operationroom.id,
        room_number: operationroom.room_number,
        healthcenter_id: operationroom.healthcenter_id,
      },
    });
  }

  for (const staff of staffs) {
    await prisma.staff.create({
      data: {
        id: staff.id,
        name: staff.name,
        role_id: staff.role_id,
        healthcenter_id: staff.healthcenter_id,
      },
    });
  }

  for (const user of users) {
    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        staff_id: user.staff_id,
      },
    });
  }

  for (const equipment of equipments) {
    await prisma.equipment.create({
      data: {
        id: equipment.id,
        equipment_name: equipment.equipment_name,
        healthcenter_id: equipment.healthcenter_id,
      },
    });
  }

  for (const request of requests) {
    await prisma.request.create({
      data: {
        id: request.id,
        approvedBy: {
          connect: { id: request.approved_by },
        },
        doctor: {
          connect: { id: request.doctor_id },
        },
        status: {
          connect: { id: request.status_id },
        },
        description: request.description,
        initTime: request.initTime,
        endTime: request.endTime,
        operationsroom: {
          connect: { id: request.operations_room_id },
        },
        ...(request.equipment && {
          equipment: {
            connect: [{ id: request.equipment }],
          },
        }),
      },
    });
  }

  for (const operation of operations) {
    await prisma.operation.create({
      data: {
        id: operation.id,
        request_id: operation.request_id,
        anesthesiologist_id: operation.anesthesiologist_id,
        nurseInstrumentista_id: operation.nurseInstrumentista_id,
      },
    });
  }
}
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
