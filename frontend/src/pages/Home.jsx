import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [stats, setStats] = useState({
        count: 0,
        streak: 'Inactivo'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/entrenamientos/');
            const workouts = response.data;
            // Sort by date desc if backend doesn't
            workouts.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            setRecentWorkouts(workouts.slice(0, 5)); // Show last 5
            setStats({
                count: workouts.length,
                streak: calculateStreak(workouts)
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStreak = (workouts) => {
        if (!workouts.length) return 'Inactivo';
        // Simplified streak logic: check if last workout was within 7 days
        const lastWorkout = new Date(workouts[0].fecha);
        const diffTime = Math.abs(new Date() - lastWorkout);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7 ? 'Activo' : 'Inactivo';
    };

    if (loading) return <div className="p-8 text-center text-zinc-500">Cargando panel...</div>;

    return (
        <div className="space-y-6">
            <header className="mb-8 relative">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                <h1 className="text-4xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 relative z-10">Mi Panel</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg relative z-10">¡Bienvenido! Hoy es un buen día para superar tus límites.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary-500/30 transition-all duration-300 group">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1 group-hover:text-primary-500 transition-colors">Entrenamientos Totales</p>
                    <p className="text-4xl font-black text-zinc-800 dark:text-white">{stats.count}</p>
                </div>
                <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-green-500/30 transition-all duration-300 group">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1 group-hover:text-green-500 transition-colors">Racha Actual</p>
                    <p className={`text-4xl font-black ${stats.streak === 'Activo' ? 'text-green-500' : 'text-zinc-500'}`}>
                        {stats.streak}
                    </p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary-500 rounded-full" />
                        Actividad Reciente
                    </h2>
                    <Link to="/routines" className="text-sm text-primary-500 hover:text-primary-400 font-medium hover:underline transition-all">
                        Ver todo →
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentWorkouts.map((workout, index) => (
                        <div
                            key={workout.id}
                            style={{ animationDelay: `${index * 100}ms` }}
                            className="glass-card p-5 rounded-xl flex items-center justify-between hover:bg-white/50 dark:hover:bg-zinc-800/60 transition-all cursor-default animate-slide-up group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-primary-500 transition-colors">{workout.rutina_nombre || 'Sesión Libre'}</h3>
                                    <p className="text-zinc-500 text-sm">
                                        {new Date(workout.fecha).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>
                            <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                Completado
                            </span>
                        </div>
                    ))}

                    {recentWorkouts.length === 0 && (
                        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800">
                            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-zinc-400" />
                            </div>
                            <p className="text-zinc-500 mb-6 font-medium">Aún no has registrado actividad.</p>
                            <Link to="/routines" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-primary-600/20">
                                <Plus className="w-5 h-5" /> Empezar Ahora
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default Home;
