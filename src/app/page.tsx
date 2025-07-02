import { prisma } from "lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full h-[80vh] overflow-hidden">
        <Image
          src="/hero-hat.jpg"
          alt="Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold">Bienvenido a Mi Tienda</h1>
          <p className="text-xl mt-4 max-w-xl">
            Gorras con estilo para cada ocasión.
          </p>
          <Link href="/cart">
            <button className="mt-6 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition">
              Ver Carrito
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Más Vendidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="text-center shadow rounded p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="mx-auto"
              />
              <h3 className="text-xl font-medium mt-4">{product.name}</h3>
              <p className="text-gray-500">${product.price.toLocaleString()}</p>
              <form action={`/add-to-cart?productId=${product.id}`} method="POST">
                <button
                  type="submit"
                  className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Agregar al carrito
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
