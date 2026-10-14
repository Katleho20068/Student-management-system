export default function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Delete this student?</h3><p style={{margin:'10px 0', color:'#64748b', fontSize:'14px'}}>This cannot be undone.</p>
        <div className="modal-btns"><button onClick={onClose}>Cancel</button><button className="btn-delete" onClick={onConfirm}>Yes, Delete</button></div>
      </div>
    </div>
  );
}