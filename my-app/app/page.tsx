"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Search, 
  Plus, 
  Sparkles, 
  Zap, 
  Network,
  MessageSquare,
  Mic,
  Image as ImageIcon,
  MoreHorizontal,
  Clock,
  Tag,
  Link2,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Note {
  id: string;
  content: string;
  content_type: string;
  source: string;
  created_at: string;
  tags?: string[];
}

interface Stats {
  notes: number;
  tags: number;
  connections: number;
  byPara: {
    projects: number;
    areas: number;
    resources: number;
    archives: number;
  };
}

export default function SecondBrain() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [stats, setStats] = useState<Stats>({ 
    notes: 0, 
    tags: 0, 
    connections: 0,
    byPara: { projects: 0, areas: 0, resources: 0, archives: 0 }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "graph">("list");

  // 🧠 LOCALSTORAGE: Cargar notas al montar
  useEffect(() => {
    loadNotesFromStorage();
  }, []);

  const loadNotesFromStorage = () => {
    try {
      const stored = localStorage.getItem('papacito-notes');
      if (stored) {
        const parsedNotes = JSON.parse(stored);
        setNotes(parsedNotes);
        updateStats(parsedNotes);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const saveNotesToStorage = (newNotes: Note[]) => {
    try {
      localStorage.setItem('papacito-notes', JSON.stringify(newNotes));
      updateStats(newNotes);
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const updateStats = (currentNotes: Note[]) => {
    const allTags = currentNotes.flatMap(n => n.tags || []);
    const uniqueTags = [...new Set(allTags)];
    
    setStats({
      notes: currentNotes.length,
      tags: uniqueTags.length,
      connections: Math.floor(currentNotes.length * 0.3), // Estimado
      byPara: {
        projects: currentNotes.filter(n => n.tags?.includes('project')).length,
        areas: currentNotes.filter(n => n.tags?.includes('area')).length,
        resources: currentNotes.filter(n => n.tags?.includes('resource')).length,
        archives: currentNotes.filter(n => n.tags?.includes('archive')).length,
      }
    });
  };

  const createNote = async () => {
    if (!newNote.trim()) return;
    
    setIsLoading(true);
    try {
      // 🧠 Crear nota local
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        content_type: "text",
        source: "web",
        created_at: new Date().toISOString(),
        tags: extractTags(newNote),
      };
      
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
      setNewNote("");
      
      // 🔄 TODO: Sync con Supabase cuando esté listo
      // await syncToSupabase(note);
      
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractTags = (content: string): string[] => {
    const tags: string[] = [];
    if (content.toLowerCase().includes('proyecto') || content.toLowerCase().includes('project')) tags.push('project');
    if (content.toLowerCase().includes('área') || content.toLowerCase().includes('area')) tags.push('area');
    if (content.toLowerCase().includes('recurso') || content.toLowerCase().includes('resource')) tags.push('resource');
    if (content.toLowerCase().includes('idea')) tags.push('idea');
    if (content.toLowerCase().includes('tarea') || content.toLowerCase().includes('task')) tags.push('task');
    return tags;
  };

  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [surpriseConnections, setSurpriseConnections] = useState<any[]>([]);
  const [showSurprise, setShowSurprise] = useState(false);

  // 🧠 Búsqueda local (simulada - reemplazar con Supabase después)
  const performSemanticSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      // 🔄 TODO: Reemplazar con búsqueda vectorial en Supabase
      // Por ahora: búsqueda por palabras clave
      const lowerQuery = query.toLowerCase();
      const matched = notes.filter(note => 
        note.content.toLowerCase().includes(lowerQuery) ||
        note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
      setSearchResults(matched);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // 🪝 HOOKED: Generar conexiones sorpresa localmente
  const loadSurpriseConnections = async () => {
    try {
      // 🔄 TODO: Reemplazar con análisis de embeddings en Supabase
      // Por ahora: conectar notas con tags similares
      if (notes.length < 2) return;
      
      const connections = [];
      for (let i = 0; i < Math.min(3, notes.length); i++) {
        const noteA = notes[i];
        const noteB = notes[(i + 1) % notes.length];
        
        connections.push({
          reason: "Notas relacionadas",
          noteAContent: noteA.content.substring(0, 50) + "...",
          noteBContent: noteB.content.substring(0, 50) + "...",
        });
      }
      
      setSurpriseConnections(connections);
      setShowSurprise(true);
    } catch (error) {
      console.error("Surprise error:", error);
    }
  };

  // Debounce para búsqueda
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery) {
        performSemanticSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Cargar conexiones sorpresa al inicio (si hay notas)
  useEffect(() => {
    if (notes.length >= 2) {
      loadSurpriseConnections();
    }
  }, [notes.length]);

  const filteredNotes = searchQuery ? searchResults : notes;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { 
      day: "numeric", 
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0A0A0F]">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center glow-primary">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Papacito OS</h1>
                  <p className="text-xs text-muted-foreground">Second Brain</p>
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar en tu cerebro... (Ctrl+K)"
                    className="pl-10 bg-white/5 border-white/10 focus:border-indigo-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setActiveView(activeView === "list" ? "graph" : "list")}
                      className={activeView === "graph" ? "text-indigo-400" : ""}
                    >
                      <Network className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{activeView === "list" ? "Ver grafo" : "Ver lista"}</p>
                  </TooltipContent>
                </Tooltip>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Nueva nota</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-[#12121A] border-white/10">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        Braindump
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <Textarea 
                        placeholder="Escribe lo que piensas... la IA lo organizará automáticamente"
                        className="min-h-[200px] bg-white/5 border-white/10 resize-none"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="border-white/10">
                                <Mic className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Audio (pronto)</p></TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="border-white/10">
                                <ImageIcon className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Imagen (pronto)</p></TooltipContent>
                          </Tooltip>
                        </div>
                        <Button 
                          onClick={createNote} 
                          disabled={isLoading || !newNote.trim()}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          {isLoading ? (
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Zap className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Guardar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="bg-[#12121A]/50 border-white/5">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.notes}</p>
                  <p className="text-xs text-muted-foreground">Notas</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#12121A]/50 border-white/5">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.tags}</p>
                  <p className="text-xs text-muted-foreground">Tags</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#12121A]/50 border-white/5">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Network className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.connections}</p>
                  <p className="text-xs text-muted-foreground">Conexiones</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🪝 HOOKED: Conexiones Sorpresa */}
          {showSurprise && surpriseConnections.length > 0 && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold">✨ Conexiones Descubiertas</h3>
                <span className="text-xs text-muted-foreground">(HOOKED Variable Reward)</span>
              </div>
              <div className="grid gap-4">
                {surpriseConnections.map((conn, idx) => (
                  <Card 
                    key={idx} 
                    className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 cursor-pointer hover:border-indigo-500/50 transition-all"
                    onClick={() => {
                      // 🪝 HOOKED: Click en conexión = dopamina
                      // Abriría la nota en un modal (feature futura)
                      console.log("Conexión clickeada:", conn);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                          <Link2 className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-indigo-300 mb-1">
                            {conn.reason}
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span className="truncate">"{conn.noteAContent}"</span>
                            <span className="text-indigo-400">↔</span>
                            <span className="truncate">"{conn.noteBContent}"</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={loadSurpriseConnections}
                className="mt-2 text-indigo-400 hover:text-indigo-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Descubrir más conexiones
              </Button>
            </motion.div>
          )}

          {/* Notes Grid */}
          <AnimatePresence mode="popLayout">
            {filteredNotes.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tu cerebro está vacío</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Comienza a guardar notas, ideas, o cualquier cosa que se te ocurra. 
                  La IA las organizará automáticamente.
                </p>
                <Button 
                  onClick={() => document.querySelector<HTMLButtonElement>('[data-state="closed"] button')?.click()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear primera nota
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group bg-[#12121A]/50 border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:glow-primary cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatDate(note.created_at)}
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm leading-relaxed mb-4 line-clamp-4">
                          {note.content}
                        </p>
                        
                        {note.tags && note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {note.tags.map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs bg-white/5 hover:bg-white/10"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-muted-foreground">
                          {note.content_type === "text" && <MessageSquare className="w-3 h-3" />}
                          {note.content_type === "audio" && <Mic className="w-3 h-3" />}
                          {note.content_type === "image" && <ImageIcon className="w-3 h-3" />}
                          <span className="capitalize">{note.source}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
            <p>Powered by Spark Crew 🦖</p>
            <p>Para Jorge Suárez</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
