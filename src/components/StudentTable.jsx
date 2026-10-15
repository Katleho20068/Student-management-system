export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) return <div className="empty">No students found.</div>;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>FULL NAME</th><th>AGE</th><th>EMAIL</th><th>COURSE</th><th>STATUS</th><th>ACTION</th></tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{String(s.id).slice(-4)}</td>
              <td>{s.fullName}</td>
              <td>{s.age}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td><span className={`status ${s.status}`}>{s.status}</span></td>
              <td>
                <button className="btn-edit" onClick={()=>onEdit(s)}>Edit</button>
                <button className="btn-delete" onClick={()=>onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
