import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Plus, Dumbbell, Trash2, Play } from 'lucide-react';


const RoutineDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rutina, setRutina] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logging, setLogging] = useState(false);
    const [showAddExercise, setShowAddExercise] = useState(false);


    // New Exercise State
    const [newExercise, setNewExercise] = useState({
        nombre: '',
        series: '',
        repeticiones: '',
        peso: ''
    });

    useEffect(() => {
        fetchRutina();
    }, [id]);

    const fetchRutina = async () => {
        try {
            const response = await api.get(`/rutinas/${id}/`);
            setRutina(response.data);
        } catch (error) {
            console.error('Error fetching routine:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExercise = async (e) => {
        e.preventDefault();
        try {
            await api.post('/ejercicios/', {
                ...newExercise,
                rutina: id,
                series: parseInt(newExercise.series),
                repeticiones: parseInt(newExercise.repeticiones),
                peso: parseFloat(newExercise.peso)
            });
            setShowAddExercise(false);
            setNewExercise({ nombre: '', series: '', repeticiones: '', peso: '' });
            fetchRutina(); // Refresh list
        } catch (error) {
            console.error('Error adding exercise:', error);
            alert('Error al añadir ejercicio');
        }
    };

    const handleDeleteExercise = async (exerciseId) => {
        if (!window.confirm('¿Estás seguro?')) return;
        try {
            await api.delete(`/ejercicios/${exerciseId}/`);
            fetchRutina();
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const handleLogWorkout = async () => {
        if (!window.confirm('¿Registrar este entrenamiento como completado ahora?')) return;
        setLogging(true);
        try {
            await api.post('/entrenamientos/', {
                rutina: id
            });
            alert('¡Entrenamiento registrado!');
            navigate('/');
        } catch (error) {
            console.error('Error logging workout:', error);
            alert('Fallo al registrar entrenamiento');
        } finally {
            setLogging(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    if (!rutina) return <div>Rutina no encontrada</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/routines" className="flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Volver a Rutinas
            </Link>

            <header className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{rutina.nombre}</h1>
                    <p className="text-zinc-500">{rutina.descripcion}</p>
                </div>
                <button
                    onClick={handleLogWorkout}
                    disabled={logging}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
                >
                    <Play className="w-5 h-5 fill-current" />
                    {logging ? 'Registrando...' : 'Empezar'}
                </button>
            </header>


            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Ejercicios</h2>
                <button
                    onClick={() => setShowAddExercise(!showAddExercise)}
                    className="flex items-center gap-2 text-primary-600 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/10 px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Añadir Ejercicio
                </button>
            </div>

            {showAddExercise && (
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl mb-8 border border-zinc-200 dark:border-zinc-700 animate-fade-in">
                    <h3 className="font-semibold mb-4">Nuevo Ejercicio</h3>
                    <form onSubmit={handleAddExercise} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <input
                                placeholder="Nombre del Ejercicio"
                                value={newExercise.nombre}
                                onChange={e => setNewExercise({ ...newExercise, nombre: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary-500"
                                required
                            />
                        </div>
                        <input
                            type="number"
                            placeholder="Series"
                            value={newExercise.series}
                            onChange={e => setNewExercise({ ...newExercise, series: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Repeticiones"
                            value={newExercise.repeticiones}
                            onChange={e => setNewExercise({ ...newExercise, repeticiones: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <input
                            type="number"
                            step="0.5"
                            placeholder="Peso (kg)"
                            value={newExercise.peso}
                            onChange={e => setNewExercise({ ...newExercise, peso: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => setShowAddExercise(false)}
                                className="px-4 py-2 text-zinc-500 hover:text-zinc-700"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-primary-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-primary-700"
                            >
                                Añadir
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {rutina.ejercicios && rutina.ejercicios.map((ejercicio, index) => (
                    <div
                        key={ejercicio.id}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className="glass-card rounded-2xl p-6 flex items-center justify-between group hover:border-primary-500/30 transition-all animate-slide-up"
                    >
                        <div className="flex items-center gap-5">
                            <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-2xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                                <Dumbbell className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{ejercicio.nombre}</h3>
                                <div className="flex items-center gap-3 text-sm text-zinc-500 font-medium">
                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{ejercicio.series} Series</span>
                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{ejercicio.repeticiones} Reps</span>
                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-900 dark:text-zinc-100">{ejercicio.peso} kg</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDeleteExercise(ejercicio.id)}
                            className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}

                {(!rutina.ejercicios || rutina.ejercicios.length === 0) && (
                    <div className="text-center py-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/20">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Dumbbell className="w-8 h-8 text-zinc-300" />
                        </div>
                        <p className="text-zinc-500 font-medium">No hay ejercicios todavía. ¡Añade algunos para empezar!</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default RoutineDetail;
