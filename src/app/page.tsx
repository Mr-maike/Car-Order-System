import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sistema de Pedidos de Carros
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/catalog"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">📦 Catálogo FIPE</h2>
            <p className="text-gray-600">Explore marcas e modelos de veículos</p>
          </Link>

          <Link
            href="/orders"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">📋 Pedidos</h2>
            <p className="text-gray-600">Visualize e gerencie pedidos</p>
          </Link>
        </div>
      </div>
    </div>
  );
}