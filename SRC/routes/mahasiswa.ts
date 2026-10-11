import { Elysia, t } from "elysia";

type Mahasiswa = {
    id: number;
    nama: string;
    email: string;
    jurusan: string;
};

const mahasiswa: Mahasiswa[] = [
    {
        id: 1,
        nama: "Ahmad",
        email: "ahmad@example.com",
        jurusan: "Teknik Informatika"
    },
    {
        id: 2,
        nama: "Anisa",
        email: "anisa@example.com",
        jurusan: "Manajemen Informatika"
    },
    {
        id: 3,
        nama: "Andika",
        email: "andika@example.com",
        jurusan: "Teknik Komputer"
    }
];

const dataMahasiswa = t.Object({
    nama: t.String(),
    email: t.String(),
    jurusan: t.String()
});

const mahasiswaRoutes = new Elysia({ prefix: "/mahasiswa" })
    .get("/", () => mahasiswa)
    .get("/:id", ({ params, set }) => {
        const data = mahasiswa.find((item) => item.id === Number(params.id));

        if (!data) {
            set.status = 404;
            return { error: "Mahasiswa tidak ditemukan" };
        }

        return data;
    })
    .post(
        "/",
        ({ body }) => {
            const dataBaru: Mahasiswa = {
                id: mahasiswa.length > 0
                    ? Math.max(...mahasiswa.map((item) => item.id)) + 1
                    : 1,
                ...body
            };

            mahasiswa.push(dataBaru);
            return dataBaru;
        },
        { body: dataMahasiswa }
    )
    .put(
        "/:id",
        ({ params, body, set }) => {
            const index = mahasiswa.findIndex(
                (item) => item.id === Number(params.id)
            );

            if (index === -1) {
                set.status = 404;
                return { error: "Mahasiswa tidak ditemukan" };
            }

            mahasiswa[index] = { id: Number(params.id), ...body };
            return mahasiswa[index];
        },
        { body: dataMahasiswa }
    )
    .patch(
        "/:id",
        ({ params, body, set }) => {
            const index = mahasiswa.findIndex(
                (item) => item.id === Number(params.id)
            );

            if (index === -1) {
                set.status = 404;
                return { error: "Mahasiswa tidak ditemukan" };
            }

            mahasiswa[index] = { ...mahasiswa[index], ...body };
            return mahasiswa[index];
        },
        { body: t.Partial(dataMahasiswa) }
    )
    .delete("/:id", ({ params, set }) => {
        const index = mahasiswa.findIndex(
            (item) => item.id === Number(params.id)
        );

        if (index === -1) {
            set.status = 404;
            return { error: "Mahasiswa tidak ditemukan" };
        }

        const [dataDihapus] = mahasiswa.splice(index, 1);
        return {
            message: "Mahasiswa berhasil dihapus",
            data: dataDihapus
        };
    })
    .connect("/", () => ({
        message: "Metode CONNECT berhasil dipanggil"
    }));

export default mahasiswaRoutes;
