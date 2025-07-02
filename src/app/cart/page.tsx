import { prisma } from "lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Product, CartItem } from "@prisma/client";

export default async function CartPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="text-center mt-10">Debes iniciar sesión.</div>;
  }

  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const total = cart?.items.reduce((sum: number, item: CartItem & { product: Product }) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <main className="max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
      {cart?.items.length ? (
        <div className="space-y-6">
          {cart.items.map((item: CartItem & { product: Product }) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-lg font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
              </div>
              <p className="text-lg font-semibold">
                ${item.product.price.toLocaleString()}
              </p>
            </div>
          ))}
          <div className="text-right mt-6 text-xl font-bold">
            Total: ${total?.toLocaleString()}
          </div>
        </div>
      ) : (
        <p>No tienes productos en el carrito.</p>
      )}
    </main>
  );
}
