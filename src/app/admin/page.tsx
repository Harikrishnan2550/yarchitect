'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projects';

// Define the Project Type
type Project = {
  _id: string;
  title: string;
  category: string;
  image: string;
  location?: string;
  year?: string;
  description?: string;
  extendedDescription?: string;
  specs?: {
    client?: string;
    area?: string;
    architect?: string;
    status?: string;
  };
  gallery?: string[];
};

export default function AdminPanel() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Gallery Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Residential');
  const [file, setFile] = useState<File | null>(null);
  
  // Dynamic Page Extra Fields
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [extendedDescription, setExtendedDescription] = useState('');
  const [client, setClient] = useState('');
  const [area, setArea] = useState('');
  const [architect, setArchitect] = useState('');
  const [status, setStatus] = useState('Completed');
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | '', msg: string }>({ type: '', msg: '' });
  const [isUploading, setIsUploading] = useState(false);

  // Password Change State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ type: 'success' | 'error' | '', msg: string }>({ type: '', msg: '' });

  // View Details Modal State
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);

  const categories = ['Residential', 'Commercial', 'Hospitality', 'Cultural'];

  // Initialize Auth & Fetch Projects
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  // ─── FETCH PROJECTS ───
  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/gallery');
      const data = await res.json();
      if (res.ok) {
        setProjects(data);
      } else {
        setProjects(projectsData as any);
      }
    } catch (err) {
      console.warn('Failed to fetch projects, falling back to local demo database');
      setProjects(projectsData as any);
    }
  };

  // ─── LOGIN HANDLER ───
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    // Bypass authentication for mockup/testing phase
    localStorage.setItem('adminToken', 'demo-token');
    setToken('demo-token');
    setIsAuthenticated(true);
    fetchProjects();
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus({ type: '', msg: '' });

    if (newPassword !== confirmPassword) {
      setPasswordChangeStatus({ type: 'error', msg: 'New passwords do not match.' });
      return;
    }

    // Mock success change
    setPasswordChangeStatus({ type: 'success', msg: 'Password updated successfully (Demo Mode)!' });
    setTimeout(() => {
      setIsChangePasswordOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordChangeStatus({ type: '', msg: '' });
    }, 1500);
  };

  // ─── CREATE & UPDATE HANDLER ───
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && (!file || !title)) {
      setUploadStatus({ type: 'error', msg: 'Please provide a title and an image.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: '', msg: '' });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    if (file) formData.append('image', file);
    formData.append('location', location);
    formData.append('year', year);
    formData.append('description', description);
    formData.append('extendedDescription', extendedDescription);
    formData.append('client', client);
    formData.append('area', area);
    formData.append('architect', architect);
    formData.append('status', status);
    if (galleryFiles) {
      for (let i = 0; i < galleryFiles.length; i++) {
        formData.append('gallery', galleryFiles[i]);
      }
    }

    try {
      const url = editingId 
        ? `http://localhost:5000/api/gallery/${editingId}` 
        : 'http://localhost:5000/api/gallery';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      // Security Check: If token is expired or invalid, log the user out
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        alert("Your session has expired. Please log in again.");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setUploadStatus({ type: 'success', msg: editingId ? 'Project updated successfully!' : 'Project published successfully!' });
        resetForm();
        fetchProjects(); 
      } else {
        setUploadStatus({ type: 'error', msg: data.message || 'Action failed' });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', msg: 'Could not connect to server.' });
    } finally {
      setIsUploading(false);
    }
  };

  // ─── DELETE HANDLER ───
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Security Check: If token is expired or invalid, log the user out
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        alert("Your session has expired. Please log in again.");
        return;
      }

      if (res.ok) {
        fetchProjects(); 
        if (editingId === id) resetForm(); 
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ─── EDIT HANDLER ───
  const startEditing = (project: Project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setCategory(project.category);
    setFile(null); 
    setLocation(project.location || '');
    setYear(project.year || '');
    setDescription(project.description || '');
    setExtendedDescription(project.extendedDescription || '');
    setClient(project.specs?.client || '');
    setArea(project.specs?.area || '');
    setArchitect(project.specs?.architect || '');
    setStatus(project.specs?.status || 'Completed');
    setGalleryFiles(null);
    const galleryInput = document.getElementById('gallery-upload') as HTMLInputElement;
    if (galleryInput) galleryInput.value = '';
    setUploadStatus({ type: '', msg: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Residential');
    setFile(null);
    setLocation('');
    setYear('');
    setDescription('');
    setExtendedDescription('');
    setClient('');
    setArea('');
    setArchitect('');
    setStatus('Completed');
    setGalleryFiles(null);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    const galleryInput = document.getElementById('gallery-upload') as HTMLInputElement;
    if (galleryInput) galleryInput.value = '';
  };


  // ==========================================
  // UI: LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F6F5] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F2517 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-6 sm:p-10 md:p-14 max-w-md w-full rounded-[2.5rem] shadow-[0_20px_60px_rgba(15,37,23,0.08)] border border-[#0F2517]/5 relative z-10"
        >
          <div className="flex flex-col items-center mb-10">
            <h1 className="font-serif text-4xl text-[#0F2517] tracking-tight mb-2">Studio Admin</h1>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#7A9C7E] font-bold">Authorized Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-2">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all" 
              />
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all" 
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-sans text-center mt-2 bg-red-50 py-2 rounded-lg">{loginError}</p>}
            <button 
              disabled={isLoggingIn} 
              className="mt-4 bg-[#0F2517] text-white rounded-2xl py-4 font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-[#7A9C7E] hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoggingIn ? 'Authenticating...' : 'Enter Console'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // UI: DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F4F6F5] pb-24">
      
      {/* Top Header */}
      <header className="bg-[#0F2517] text-white px-6 md:px-12 lg:px-20 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50 shadow-md gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#7A9C7E]/20 flex items-center justify-center border border-[#7A9C7E]/30 shrink-0">
            <span className="font-serif text-[#7A9C7E] text-lg leading-none">Y</span>
          </div>
          <div className="text-left">
            <h1 className="font-serif text-lg sm:text-xl tracking-wide leading-none sm:leading-normal">Y Architects</h1>
            <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#7A9C7E]/80 mt-1">Admin Console</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
          <button 
            onClick={() => setIsChangePasswordOpen(true)} 
            className="font-sans text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-white/5 hover:bg-[#7A9C7E] border border-white/10 hover:border-[#7A9C7E] rounded-full px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-300 flex-1 sm:flex-none text-center"
          >
            Change Password
          </button>
          <button 
            onClick={handleLogout} 
            className="font-sans text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-white/5 hover:bg-[#7A9C7E] border border-white/10 hover:border-[#7A9C7E] rounded-full px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-300 flex-1 sm:flex-none text-center"
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(15,37,23,0.04)] border border-[#0F2517]/5 relative">
            <h2 className="font-serif text-3xl text-[#0F2517] tracking-tight mb-2">
              {editingId ? 'Edit Project' : 'New Project'}
            </h2>
            <p className="font-sans text-xs text-[#0F2517]/50 mb-8 leading-relaxed">
              {editingId ? 'Update the details or replace the image for the selected project.' : 'Upload a new architectural project to the public portfolio.'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Project Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-serif text-lg text-[#0F2517] transition-all" 
                  required 
                />
              </div>

              <div className="flex flex-col">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Category</label>
                <div className="relative">
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="w-full bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all appearance-none cursor-pointer"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#0F2517]/40">▼</div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">
                  {editingId ? 'Replace Image (Optional)' : 'High-Res Image'}
                </label>
                <input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
                  className="block w-full text-sm text-[#0F2517]/60 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-sans file:font-semibold file:uppercase file:tracking-widest file:bg-[#0F2517]/5 file:text-[#0F2517] hover:file:bg-[#7A9C7E] hover:file:text-white file:transition-colors file:cursor-pointer bg-[#FAFAFA] border border-[#0F2517]/10 rounded-2xl p-2" 
                  required={!editingId} 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all" 
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Year</label>
                  <input 
                    type="text" 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)} 
                    className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3}
                  className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all resize-none" 
                />
              </div>

              <div className="flex flex-col">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Extended Description</label>
                <textarea 
                  value={extendedDescription} 
                  onChange={(e) => setExtendedDescription(e.target.value)} 
                  rows={4}
                  className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] focus:ring-1 focus:ring-[#7A9C7E] font-sans text-sm text-[#0F2517] transition-all resize-none" 
                />
              </div>

              <div className="border-t border-[#0F2517]/5 pt-4 my-2">
                <h4 className="font-serif text-base text-[#0F2517] mb-4">Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">Client</label>
                    <input 
                      type="text" 
                      value={client} 
                      onChange={(e) => setClient(e.target.value)} 
                      className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#7A9C7E] font-sans text-xs text-[#0F2517]" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">Area</label>
                    <input 
                      type="text" 
                      value={area} 
                      onChange={(e) => setArea(e.target.value)} 
                      className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#7A9C7E] font-sans text-xs text-[#0F2517]" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">Architect</label>
                    <input 
                      type="text" 
                      value={architect} 
                      onChange={(e) => setArchitect(e.target.value)} 
                      className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#7A9C7E] font-sans text-xs text-[#0F2517]" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">Status</label>
                    <input 
                      type="text" 
                      value={status} 
                      onChange={(e) => setStatus(e.target.value)} 
                      className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#7A9C7E] font-sans text-xs text-[#0F2517]" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/70 font-semibold mb-2 ml-1">Gallery Showcase Images</label>
                <input 
                  id="gallery-upload" 
                  type="file" 
                  multiple
                  accept="image/*" 
                  onChange={(e) => setGalleryFiles(e.target.files)} 
                  className="block w-full text-sm text-[#0F2517]/60 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-sans file:font-semibold file:uppercase file:tracking-widest file:bg-[#0F2517]/5 file:text-[#0F2517] hover:file:bg-[#7A9C7E] hover:file:text-white file:transition-colors file:cursor-pointer bg-[#FAFAFA] border border-[#0F2517]/10 rounded-2xl p-2" 
                />
              </div>

              {uploadStatus.msg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl font-sans text-xs ${uploadStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                  {uploadStatus.msg}
                </motion.div>
              )}

              <div className="flex gap-3 mt-4">
                <button 
                  type="submit" 
                  disabled={isUploading} 
                  className="flex-1 bg-[#0F2517] text-white rounded-full py-4 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-[#7A9C7E] transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Saving...' : editingId ? 'Update Project' : 'Publish Project'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={resetForm} 
                    className="px-6 rounded-full border border-[#0F2517]/20 text-[#0F2517] font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-[#0F2517]/5 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: PROJECT LIST */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(15,37,23,0.04)] border border-[#0F2517]/5 p-8 md:p-10">
            <div className="flex justify-between items-end mb-8 border-b border-[#0F2517]/5 pb-6">
              <div>
                <h2 className="font-serif text-3xl text-[#0F2517] tracking-tight">Portfolio Overview</h2>
                <p className="font-sans text-xs text-[#0F2517]/50 mt-1">Manage your active projects</p>
              </div>
              <div className="hidden md:block">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#7A9C7E] bg-[#7A9C7E]/10 px-4 py-2 rounded-full font-bold">
                  {projects.length} Projects
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {projects.length === 0 ? (
                <div className="text-center py-20 bg-[#FAFAFA] rounded-2xl border border-[#0F2517]/5 border-dashed">
                  <p className="font-sans text-sm text-[#0F2517]/40">No projects found. Add your first project to begin.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.div 
                      key={project._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl border border-[#0F2517]/5 hover:shadow-md hover:border-[#0F2517]/10 transition-all bg-white group"
                    >
                      <div className="w-full md:w-40 h-28 overflow-hidden rounded-xl shrink-0 bg-[#FAFAFA]">
                        <img 
                          src={project.image.startsWith('/') 
                            ? project.image 
                            : `http://localhost:5000${project.image}`
                          } 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      
                      <div className="flex-1 w-full text-left">
                        <span className="inline-block font-sans text-[9px] tracking-[0.2em] uppercase text-[#7A9C7E] font-bold mb-2 bg-[#7A9C7E]/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-2xl text-[#0F2517] leading-tight">{project.title}</h3>
                      </div>
                      
                      <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                        <button 
                          onClick={() => setSelectedProjectDetails(project)} 
                          className="flex-1 md:flex-none px-6 py-2.5 bg-[#7A9C7E]/10 text-[#7A9C7E] font-sans text-[10px] tracking-widest uppercase rounded-xl hover:bg-[#7A9C7E] hover:text-white transition-colors font-bold"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => startEditing(project)} 
                          className="flex-1 md:flex-none px-6 py-2.5 bg-[#FAFAFA] text-[#0F2517] font-sans text-[10px] tracking-widest uppercase rounded-xl hover:bg-[#0F2517] hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)} 
                          className="flex-1 md:flex-none px-6 py-2.5 bg-red-50 text-red-600 font-sans text-[10px] tracking-widest uppercase rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── CHANGE PASSWORD MODAL ── */}
      <AnimatePresence>
        {isChangePasswordOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 md:p-10 max-w-md w-full rounded-[2rem] shadow-[0_20px_50px_rgba(15,37,23,0.15)] border border-[#0F2517]/5 relative text-left"
            >
              <button 
                onClick={() => {
                  setIsChangePasswordOpen(false);
                  setOldPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setPasswordChangeStatus({ type: '', msg: '' });
                }} 
                className="absolute right-6 top-6 text-[#0F2517]/40 hover:text-[#0F2517] transition-colors font-sans text-sm focus:outline-none"
              >
                ✕
              </button>
              
              <h3 className="font-serif text-2xl text-[#0F2517] mb-2">Change Password</h3>
              <p className="font-sans text-xs text-[#0F2517]/50 mb-6 leading-relaxed">
                Update the security credentials for accessing the admin workspace console.
              </p>

              <form onSubmit={handlePasswordChange} className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">Current Password</label>
                  <input 
                    type="password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] font-sans text-sm text-[#0F2517]" 
                    required 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] font-sans text-sm text-[#0F2517]" 
                    required 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/60 font-semibold mb-2 ml-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="bg-[#FAFAFA] border border-[#0F2517]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A9C7E] font-sans text-sm text-[#0F2517]" 
                    required 
                  />
                </div>

                {passwordChangeStatus.msg && (
                  <div className={`p-4 rounded-xl font-sans text-xs ${passwordChangeStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {passwordChangeStatus.msg}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="bg-[#0F2517] text-white rounded-full py-4 mt-2 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-[#7A9C7E] transition-all duration-300"
                >
                  Save New Password
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── VIEW DETAILS MODAL ── */}
      <AnimatePresence>
        {selectedProjectDetails && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] max-w-3xl w-full rounded-[2rem] shadow-[0_25px_60px_rgba(15,37,23,0.2)] border border-[#0F2517]/5 relative overflow-hidden my-8"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProjectDetails(null)} 
                className="absolute right-6 top-6 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#0F2517] shadow-sm flex items-center justify-center transition-all font-sans text-sm focus:outline-none"
              >
                ✕
              </button>

              {/* Cover Image Parallax Header */}
              <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-[#F4F6F5]">
                <img 
                  src={selectedProjectDetails.image.startsWith('/') 
                    ? selectedProjectDetails.image 
                    : `http://localhost:5000${selectedProjectDetails.image}`
                  } 
                  alt={selectedProjectDetails.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8 text-white text-left">
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#7A9C7E] font-bold bg-[#7A9C7E]/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {selectedProjectDetails.category}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl mt-3 tracking-tight">{selectedProjectDetails.title}</h3>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-8 md:p-10 max-h-[50vh] overflow-y-auto text-left flex flex-col gap-8">
                {/* Location & Year */}
                <div className="flex gap-8 border-b border-[#0F2517]/5 pb-4">
                  <div>
                    <h5 className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/40 font-bold mb-1">Location</h5>
                    <p className="font-sans text-sm text-[#0F2517] font-medium">{selectedProjectDetails.location || 'Not Specified'}</p>
                  </div>
                  <div>
                    <h5 className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/40 font-bold mb-1">Year</h5>
                    <p className="font-sans text-sm text-[#0F2517] font-medium">{selectedProjectDetails.year || 'Not Specified'}</p>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h5 className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/40 font-bold mb-2">Short Description</h5>
                    <p className="font-serif text-base text-[#0F2517]/80 leading-relaxed italic border-l-2 border-[#7A9C7E]/40 pl-4">
                      {selectedProjectDetails.description || 'No primary description provided.'}
                    </p>
                  </div>
                  {selectedProjectDetails.extendedDescription && (
                    <div>
                      <h5 className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/40 font-bold mb-2">Extended Narrative</h5>
                      <p className="font-sans text-sm text-[#0F2517]/70 leading-relaxed">
                        {selectedProjectDetails.extendedDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Specifications Matrix */}
                <div className="bg-white p-6 rounded-2xl border border-[#0F2517]/5">
                  <h5 className="font-serif text-base text-[#0F2517] mb-4">Project Specifications</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <span className="font-sans text-[8px] tracking-wider uppercase text-[#0F2517]/40 block mb-1">Client</span>
                      <span className="font-sans text-xs text-[#0F2517] font-semibold">{selectedProjectDetails.specs?.client || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[8px] tracking-wider uppercase text-[#0F2517]/40 block mb-1">Area</span>
                      <span className="font-sans text-xs text-[#0F2517] font-semibold">{selectedProjectDetails.specs?.area || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[8px] tracking-wider uppercase text-[#0F2517]/40 block mb-1">Architect</span>
                      <span className="font-sans text-xs text-[#0F2517] font-semibold">{selectedProjectDetails.specs?.architect || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[8px] tracking-wider uppercase text-[#0F2517]/40 block mb-1">Status</span>
                      <span className="font-sans text-xs text-[#7A9C7E] font-bold">{selectedProjectDetails.specs?.status || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Gallery Showcase */}
                <div>
                  <h5 className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0F2517]/40 font-bold mb-4">Gallery Showcase</h5>
                  {selectedProjectDetails.gallery && selectedProjectDetails.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedProjectDetails.gallery.map((imgUrl, index) => (
                        <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F6F5] border border-[#0F2517]/5 group relative">
                          <img 
                            src={imgUrl.startsWith('/') ? imgUrl : `http://localhost:5000${imgUrl}`} 
                            alt={`${selectedProjectDetails.title} Showcase ${index + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 bg-white border border-[#0F2517]/5 border-dashed rounded-2xl text-center">
                      <p className="font-sans text-xs text-[#0F2517]/40">No additional gallery showcase images uploaded.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#F4F6F5] px-8 py-5 border-t border-[#0F2517]/5 flex justify-end">
                <button 
                  onClick={() => setSelectedProjectDetails(null)} 
                  className="px-6 py-2.5 bg-[#0F2517] text-white font-sans text-[10px] tracking-widest uppercase rounded-full hover:bg-[#7A9C7E] transition-colors"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}