import {Elysia} from "elysia";
import mahasiswaRoutes from "./routes/mahasiswa";

const app = new Elysia().use(mahasiswaRoutes);
app.listen(3001);

console.log(`server berjalan pada http://localhost:3001`);
