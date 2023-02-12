import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import { send } from "process";

const prisma = new PrismaClient();

const app = fastify();

const corsOptions = async () => {
  await app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
}

corsOptions();

// Creating a interface for the pet object

interface PetProfile {
  name: string
  breed: string
  age: number
  owner: string
}

const allPets: PetProfile[] = [];

// Add a new pet
app.post("/pets", async (request, reply) => {
  const body = request.body as PetProfile;

  const pedtData = await prisma.petData.create({
    data: {
      name: body.name,
      breed: body.breed,
      age: body.age,
      owner: body.owner
    }
  });

  allPets.push({ ...body });

  return reply
    .code(201)
    .send({
      message: "Pet added successfully",
      data: pedtData,
    })
});

// Get all pets
app.get("/pets", async (request, reply) => {
  const allPets = await prisma.petData.findMany();

  return reply
    .code(200)
    .send({
      message: "All pets",
      data: allPets,
    })
});

// Welcome route
app.get("/", async (request, reply) => {
  return reply
    .code(200)
    .send({
      message: "Welcome to the Pet API",
    })
});

// Update a pet
app.put("/pets/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  const body = request.body as PetProfile;

  const { name, breed, age, owner } = body;

  if (!name || !breed || !age || !owner) {
    return reply
      .code(400)
      .send({
        message: "Please provide all the details",
      });
  }

  if (!id) {
    return reply
      .code(400)
      .send({
        message: "Please provide the pet id",
      });
  }

  const petData = await prisma.petData.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      breed,
      age,
      owner
    }
  });

  return reply
    .code(200)
    .send({
      message: "Pet updated successfully",
      data: petData,
    })
});

// Delete a pet
app.delete("/pets/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  if (!id) {
    return reply
      .code(400)
      .send({
        message: "Please provide the pet id",
      });
  }

  const petData = await prisma.petData.delete({
    where: {
      id: Number(id),
    }
  });

  return reply
    .code(200)
    .send({
      message: "Pet deleted successfully",
      data: petData,
    })
});


app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log(`"Server started on port 3000"`);
  })
