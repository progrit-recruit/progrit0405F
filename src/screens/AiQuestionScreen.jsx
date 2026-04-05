import React, { useState, useEffect } from 'react';
import { Sparkles, Trash2, Plus, ArrowRight, Check, X } from 'lucide-react';
import { aiGeneratedQuestions } from '../data/mockData';

const typeLabels = { image: '画像2択', slider: 'スライダー', multi: '複数選択', text: '自由記述' };
const typeColors = { image: 'bg-coral text-white', slider: 'bg-gold text-navy', multi: 'bg-navy text-gold', text: 'bg-emerald-500 text-white' };

const AiQuestionScreen = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState('text');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setQuestions(aiGeneratedQuestions);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const deleteQuestion = (id) => setQuestions(questions.filter(q => q.id !== id));

  const startEdit = (q) => { setEditingId(q.id); setEditText(q.text); };
  const saveEdit = () => {
    setQuestions(questions.map(q => q.id === editingId ? {...q, text: editText} : q));
    setEditingId(null);
  };

  const addQuestion = () => {
    if (!newText.trim()) return;
    setQuestions([...questions, { id: Date.now(), type: newType, text: newText, editable: true }]);
    setNewText('');
    setShowAddForm(false);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 border-4 border-gold border-t-coral rounded-full animate-spin mx-auto"></div>
        <h3 className="font-black text-lg text-navy">AIがアンケートを生成中...</h3>
        <p className="text-xs text-navy/40 font-bold">固定条件を分析して、参加者に聞くべき質問を考えています</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Sparkles size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-black text-navy">アンケートが完成！</h3>
        <p className="text-xs text-navy/40 font-bold">内容を確認・編集してから共有しましょう</p>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-[2rem] p-4 shadow-sm border border-gold/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-navy/30">Q{idx + 1}</span>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${typeColors[q.type]}`}>{typeLabels[q.type]}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(q)} className="p-1.5 text-navy/20 hover:text-navy transition-colors text-xs font-black">編集</button>
                <button onClick={() => deleteQuestion(q.id)} className="p-1.5 text-navy/20 hover:text-coral transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            {editingId === q.id ? (
              <div className="flex items-center gap-2">
                <input value={editText} onChange={e => setEditText(e.target.value)} className="flex-1 font-bold text-navy bg-cream/50 rounded-xl px-3 py-2 border border-gold/30 focus:border-coral focus:outline-none text-sm" />
                <button onClick={saveEdit} className="p-2 bg-emerald-500 text-white rounded-xl"><Check size={14} /></button>
                <button onClick={() => setEditingId(null)} className="p-2 bg-navy/10 text-navy/40 rounded-xl"><X size={14} /></button>
              </div>
            ) : (
              <p className="text-sm font-bold text-navy leading-snug">{q.text}</p>
            )}
          </div>
        ))}
      </div>

      {showAddForm ? (
        <div className="bg-white rounded-[2rem] p-4 shadow-sm border-2 border-coral/30 space-y-3">
          <input value={newText} onChange={e => setNewText(e.target.value)} placeholder="質問内容を入力" className="w-full font-bold text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none text-sm placeholder:text-navy/20" />
          <div className="flex gap-2">
            {Object.entries(typeLabels).map(([key, label]) => (
              <button key={key} onClick={() => setNewType(key)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black ${newType === key ? typeColors[key] : 'bg-cream text-navy/40'}`}>{label}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={addQuestion} className="flex-1 py-2.5 bg-coral text-white rounded-xl font-black text-xs">追加する</button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2.5 bg-navy/10 text-navy/40 rounded-xl font-black text-xs">キャンセル</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAddForm(true)} className="w-full py-4 bg-white border-2 border-dashed border-gold rounded-2xl text-navy/40 text-sm font-black flex items-center justify-center gap-2 active:bg-gold/10">
          <Plus size={18} /> 質問を追加する
        </button>
      )}

      <button onClick={onComplete} className="w-full py-5 bg-coral text-white rounded-[2rem] font-black shadow-xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3">
        このアンケートを共有する <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default AiQuestionScreen;
