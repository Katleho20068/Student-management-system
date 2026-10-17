import { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import DeleteModal from './components/DeleteModal';
import './App.css';

const initialStudents = [
  { id: 101, fullName: "Teboho Mokoena", age: 20, email: "teboho@limkokwing.ls", course: "Diploma in IT", status: "Active", isScholarship: true },
  { id: 102, fullName: "Relebohile Nkune", age: 22, email: "rele@limkokwing.ls", course: "Business IT", status: "Active", isScholarship: false },
  { id: 103, fullName: "Ntsoaki Molefe", age: 21, email: "ntsoaki@limkokwing.ls", course: "Diploma in IT", status: "Graduated", isScholarship: true },
];

function App() {
  // 2. VARIABLE DECLARATIONS - const, let, var - 8 MARKS
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('limk100');
    return saved? JSON.parse(saved) : initialStudents;
  });
  let currentYear = new Date().getFullYear(); // let
  var legacyVar = "var-demo"; // var

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { localStorage.setItem('limk100', JSON.stringify(students)); }, [students]);

  // 3. FUNCTIONS - Arrow + Traditional + Array methods - 12 MARKS
  const handleSaveStudent = (data) => { // Arrow function
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id? {...s,...data } : s)); // map
    } else {
      setStudents([{ id: Date.now(),...data },...students]);
    }
    setIsModalOpen(false); setEditingStudent(null);
  };

  function handleEdit(student) { // Traditional function
    setEditingStudent(student); setIsModalOpen(true);
  }

  const handleDelete = () => { setStudents(students.filter(s => s.id!== deletingId)); setIsDeleteOpen(false); }; // filter


const filtered = students.filter(s => {
  const searchText = search.toLowerCase().trim();

  return (
    String(s.id).toLowerCase().includes(searchText) ||
    s.fullName.toLowerCase().includes(searchText) ||
    s.email.toLowerCase().includes(searchText) ||
    s.course.toLowerCase().includes(searchText) ||
    s.status.toLowerCase().includes(searchText)
  );
});


  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Management System</h1>
        <h3>manage your students efficiently</h3>
      </header>

      <div className="stats">
        <div className="stat-card">Total: {students.length}</div>
        <div className="stat-card active">Active: {students.filter(s=>s.status==='Active').length}</div>
        <div className="stat-card grad">Graduated: {students.filter(s=>s.status==='Graduated').length}</div>
      </div>

      <div className="controls">
        <input className="search" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        <button className="add-btn" onClick={()=>{setEditingStudent(null); setIsModalOpen(true);}}>+ Add Student</button>
      </div>

      <StudentTable students={filtered} onEdit={handleEdit} onDelete={(id)=>{setDeletingId(id); setIsDeleteOpen(true);}} />
      {isModalOpen && <StudentModal student={editingStudent} onClose={()=>setIsModalOpen(false)} onSave={handleSaveStudent} />}
      {isDeleteOpen && <DeleteModal onClose={()=>setIsDeleteOpen(false)} onConfirm={handleDelete} />}
    </div>
  );
}
export default App;