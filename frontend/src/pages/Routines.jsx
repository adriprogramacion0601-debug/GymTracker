import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus, ChevronRight, Calendar, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';


const Routines = () => {
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRutinas();
    }, []);

    const fetchRutinas = async () => {
        try {
            const response = await api.get('/rutinas/');
            setRutinas(response.data);
        } catch (error) {
            console.error('Error fetching routines:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Cargando rutinas...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Mis Rutinas</h1>
                    <p className="text-zinc-500">Gestiona tus planes de entrenamiento.</p>
                </div>
                <Link
                    to="/routines/new"
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-primary-600/20"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Rutina
                </Link>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rutinas.map((rutina, index) => (
                    <div
                        key={rutina.id}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className="glass-card p-6 rounded-2xl hover-scale group animate-slide-up flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-xl text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                <Dumbbell className="w-6 h-6" />
                            </div>
                            {/* <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg text-zinc-500 text-xs font-bold uppercase tracking-wider">
                                Fuerza
                            </div> */}
                        </div>

                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 mb-2">{rutina.nombre}</h3>

                        <p className="text-zinc-500 text-sm mb-6 line-clamp-2 min-h-[2.5em] flex-grow">
                            {rutina.descripcion || "Sin descripción."}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {rutina.ejercicios ? rutina.ejercicios.length : 0} Ejercicios
                            </span>
                            <Link
                                to={`/routines/${rutina.id}`}
                                className="flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-500 transition-colors"
                            >
                                Ver <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}


                {rutinas.length === 0 && (
                    <div className="col-span-full text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                        <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No hay rutinas</h3>
                        <p className="text-zinc-500 mb-6">Crea tu primera rutina para empezar.</p>
                        <Link
                            to="/routines/new"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            Crear Rutina
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Routines;
