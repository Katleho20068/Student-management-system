import { useState } from 'react';
export default function StudentModal({ student, onClose, onSave }) {
  const [form, setForm] = useState({
    fullName: student?.fullName || '', age: student?.age || '', email: student?.email || '',
    course: student?.course || 'Diploma in IT', status: student?.status || 'Active',
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name required";
    if (!form.age || form.age < 16 || form.age > 60) e.age = "Age 16-60";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email needed";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const submit = (e) => { e.preventDefault(); if (!validate()) return; onSave({...form, age:Number(form.age)}); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h2>{student? 'Edit Student':'Add Student'}</h2>
        <form onSubmit={submit}>
          <label>Full Name</label><input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} />{errors.fullName && <span className="err">{errors.fullName}</span>}
          <label>Age</label><input type="number" value={form.age} onChange={e=>setForm({...form, age:e.target.value})} />{errors.age && <span className="err">{errors.age}</span>}
          <label>Email</label><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />{errors.email && <span className="err">{errors.email}</span>}
          <label>Course</label><select value={form.course} onChange={e=>setForm({...form, course:e.target.value})}><option>Diploma in IT</option><option>Business IT</option><option>Software Engineering</option></select>
          <label>Status</label><select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}><option>Active</option><option>Pending</option><option>Graduated</option></select>
          <div className="modal-btns"><button type="button" onClick={onClose}>Cancel</button><button type="submit" className="primary">{student?'Update':'Add'}</button></div>
        </form>
      </div>
    </div>
  );
}