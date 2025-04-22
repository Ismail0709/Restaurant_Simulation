// SimulationForm.js
export default function SimulationForm({ onSubmit }) {
    return (
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow w-full max-w-md mx-auto space-y-4">
        <div>
          <label className="block font-semibold mb-1">Arrival Time</label>
          <input type="number" name="arrivalTime" required className="w-full border px-4 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Service Time</label>
          <input type="number" name="servingTime" required className="w-full border px-4 py-2 rounded" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Simulate</button>
      </form>
    );
  }
  