import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/me/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    if (loading) return <div className="p-8 text-center text-zinc-500">Cargando perfil...</div>;

    // Show logout even if profile fails to load
    if (!user) return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="glass-card rounded-2xl p-8 shadow-xl text-center">
                <p className="text-red-500 mb-6">No se pudo cargar la información del perfil.</p>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl font-bold transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto animate-slide-up">
            <div className="glass-card rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-6 mb-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">{user.username}</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Usuario de GymTracker</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-5 bg-white/50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-2xl hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Correo Electrónico</p>
                            <p className="font-medium text-lg">{user.email || 'No especificado'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-white/50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-2xl hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Miembro desde</p>
                            <p className="font-medium text-lg">
                                {new Date(user.date_joined).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-xl font-bold transition-all w-full justify-center md:w-auto"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Profile;
