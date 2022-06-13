const Task = ({ tdlist, onChange, onClick }) => {
  return (
    <li className="item" tdlist={tdlist} key={tdlist.id}>
      <input
        className="itemCheckbox"
        type="checkbox"
        checked={tdlist.done}
        onChange={(e) => onChange(e, tdlist.id)}
      />
      <label className="itemDisplay">{tdlist.title}</label>
      <span
        className="removeItemButton"
        onClick={(e) => onClick(e, tdlist.id)}
      >
                    x
                  </span>
    </li>
  )
}

export default Task
