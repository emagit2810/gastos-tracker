const { useState } = React;

function GastosTracker() {
  const [gastos, setGastos] = useState([
    { nombre: 'Café', semanal: 20000, mensual: 0, categoria: 'A', frecuencia: 'semanal' },
    { nombre: 'Metro', semanal: 30000, mensual: 0, categoria: 'A', frecuencia: 'semanal' },
    { nombre: 'Cuaderno', semanal: 0, mensual: 5000, categoria: 'A', frecuencia: 'mensual' },
    { nombre: 'Acetaminofén', semanal: 0, mensual: 2000, categoria: 'A', frecuencia: 'mensual' },
    { nombre: 'Esferos', semanal: 0, mensual: 4000, categoria: 'A', frecuencia: 'mensual' },
    { nombre: 'Frutas', semanal: 15000, mensual: 0, categoria: 'B', frecuencia: 'semanal' },
    { nombre: 'Huevos', semanal: 5600, mensual: 0, categoria: 'B', frecuencia: 'semanal' },
    { nombre: 'Papel higiénico', semanal: 3000, mensual: 0, categoria: 'B', frecuencia: 'semanal' },
    { nombre: 'Jabón', semanal: 0, mensual: 7000, categoria: 'B', frecuencia: 'mensual' },
    { nombre: 'Medicina', semanal: 90000, mensual: 0, categoria: 'B', frecuencia: 'semanal' },
    { nombre: 'Cuchillas afeitar', semanal: 0, mensual: 8000, categoria: 'B', frecuencia: 'mensual' },
    { nombre: 'Galletas', semanal: 8000, mensual: 0, categoria: 'B', frecuencia: 'semanal' },
    { nombre: 'Nueces integrales', semanal: 7500, mensual: 0, categoria: 'B', frecuencia: 'semanal' }
  ]);

  const [nuevoGasto, setNuevoGasto] = useState({ 
    nombre: '', semanal: 0, mensual: 0, categoria: 'A', frecuencia: 'semanal' 
  });

  const calcularMensual = (gasto) => {
    return gasto.frecuencia === 'semanal' ? gasto.semanal * 4.33 : gasto.mensual;
  };

  const totales = {
    semanalA: gastos.filter(g => g.categoria === 'A' && g.frecuencia === 'semanal').reduce((sum, g) => sum + g.semanal, 0),
    mensualA: gastos.filter(g => g.categoria === 'A').reduce((sum, g) => sum + calcularMensual(g), 0),
    semanalB: gastos.filter(g => g.categoria === 'B' && g.frecuencia === 'semanal').reduce((sum, g) => sum + g.semanal, 0),
    mensualB: gastos.filter(g => g.categoria === 'B').reduce((sum, g) => sum + calcularMensual(g), 0)
  };

  const agregarGasto = () => {
    if (nuevoGasto.nombre) {
      setGastos([...gastos, { ...nuevoGasto }]);
      setNuevoGasto({ nombre: '', semanal: 0, mensual: 0, categoria: 'A', frecuencia: 'semanal' });
    }
  };

  const eliminarGasto = (index) => {
    setGastos(gastos.filter((_, i) => i !== index));
  };

  const actualizarGasto = (index, campo, valor) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index][campo] = campo === 'nombre' || campo === 'categoria' || campo === 'frecuencia' ? valor : parseFloat(valor) || 0;
    setGastos(nuevosGastos);
  };

  const formatear = (num) => `$${num.toLocaleString('es-CO')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Tracker de Gastos</h1>
          <p className="text-slate-600">Todos los valores en pesos colombianos (COP)</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Categoría A - Principal</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-700">Total Semanal:</span>
                <span className="font-bold text-blue-900">{formatear(totales.semanalA)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-blue-700">Total Mensual:</span>
                <span className="font-bold text-blue-900">{formatear(totales.mensualA)}</span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-green-900 mb-4">Categoría B - Otros</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-700">Total Semanal:</span>
                <span className="font-bold text-green-900">{formatear(totales.semanalB)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-green-700">Total Mensual:</span>
                <span className="font-bold text-green-900">{formatear(totales.mensualB)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Resumen Total</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-90">Total Semanal (A+B)</div>
              <div className="text-3xl font-bold">{formatear(totales.semanalA + totales.semanalB)}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-90">Total Mensual (A+B)</div>
              <div className="text-3xl font-bold">{formatear(totales.mensualA + totales.mensualB)}</div>
            </div>
          </div>
        </div>
        {['A', 'B'].map(cat => (
          <div key={cat} className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {cat === 'A' ? 'Gastos Categoría A' : 'Gastos Categoría B'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3 text-left">Gasto</th>
                    <th className="p-3 text-left">Frecuencia</th>
                    <th className="p-3 text-right">Semanal</th>
                    <th className="p-3 text-right">Mensual</th>
                    <th className="p-3 text-right">Total/Mes</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {gastos.filter(g => g.categoria === cat).map((gasto, idx) => {
                    const realIdx = gastos.findIndex(g => g === gasto);
                    return (
                      <tr key={realIdx} className="border-b hover:bg-slate-50">
                        <td className="p-3">
                          <input
                            value={gasto.nombre}
                            onChange={(e) => actualizarGasto(realIdx, 'nombre', e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="p-3">
                          <select
                            value={gasto.frecuencia}
                            onChange={(e) => actualizarGasto(realIdx, 'frecuencia', e.target.value)}
                            className="px-2 py-1 border rounded"
                          >
                            <option value="semanal">Semanal</option>
                            <option value="mensual">Mensual</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={gasto.semanal}
                            onChange={(e) => actualizarGasto(realIdx, 'semanal', e.target.value)}
                            disabled={gasto.frecuencia === 'mensual'}
                            className="w-24 px-2 py-1 border rounded text-right disabled:bg-gray-100"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={gasto.mensual}
                            onChange={(e) => actualizarGasto(realIdx, 'mensual', e.target.value)}
                            disabled={gasto.frecuencia === 'semanal'}
                            className="w-24 px-2 py-1 border rounded text-right disabled:bg-gray-100"
                          />
                        </td>
                        <td className="p-3 text-right font-semibold">{formatear(calcularMensual(gasto))}</td>
                        <td className="p-3">
                          <button
                            onClick={() => eliminarGasto(realIdx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="inline-block" aria-hidden="true">🗑️</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Agregar Nuevo Gasto</h2>
          <div className="grid md:grid-cols-6 gap-3">
            <input
              placeholder="Nombre del gasto"
              value={nuevoGasto.nombre}
              onChange={(e) => setNuevoGasto({...nuevoGasto, nombre: e.target.value})}
              className="px-3 py-2 border rounded md:col-span-2"
            />
            <select
              value={nuevoGasto.categoria}
              onChange={(e) => setNuevoGasto({...nuevoGasto, categoria: e.target.value})}
              className="px-3 py-2 border rounded"
            >
              <option value="A">Categoría A</option>
              <option value="B">Categoría B</option>
            </select>
            <select
              value={nuevoGasto.frecuencia}
              onChange={(e) => setNuevoGasto({...nuevoGasto, frecuencia: e.target.value})}
              className="px-3 py-2 border rounded"
            >
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
            <input
              type="number"
              placeholder="Valor"
              value={nuevoGasto.frecuencia === 'semanal' ? nuevoGasto.semanal : nuevoGasto.mensual}
              onChange={(e) => setNuevoGasto({
                ...nuevoGasto,
                [nuevoGasto.frecuencia === 'semanal' ? 'semanal' : 'mensual']: parseFloat(e.target.value) || 0
              })}
              className="px-3 py-2 border rounded"
            />
            <button
              onClick={agregarGasto}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
            >
              <span className="inline-block" aria-hidden="true">+</span> Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<GastosTracker />);
