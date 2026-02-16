import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoutineForm = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/rutinas/', {
                nombre,
                descripcion
            });

            navigate('/routines');
        } catch (error) {
            console.error('Error creating routine:', error);
            const errorMessage = error.response?.data
                ? JSON.stringify(error.response.data)
                : error.message;
            alert(`Error al crear la rutina: ${errorMessage}`);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/routines" className="flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Volver a Rutinas
            </Link>

            <div className="glass-card rounded-2xl p-8 shadow-xl animate-scale-in">
                <h1 className="text-3xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">Crear Nueva Rutina</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 group-focus-within:text-primary-500 transition-colors">Nombre de la Rutina</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400"
                            placeholder="ej. Fuerza Torso"
                            required
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 group-focus-within:text-primary-500 transition-colors">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all min-h-[120px] placeholder:text-zinc-400"
                            placeholder="Describe los objetivos de esta rutina..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-primary-600/20"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Creando...' : 'Crear Rutina'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default RoutineForm;
