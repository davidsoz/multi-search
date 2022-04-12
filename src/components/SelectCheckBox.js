import { useRef } from "react";

function SelectCheckBox({ data, onSelect }) {
  const selected = useRef([...data]);

  function selectHandler(value) {
    if(value === 'all') {
      if(data.length === selected.current.length) {
        selected.current = [];
      } else {
        selected.current = [...data];
      }
    } else {
      const index = selected.current.indexOf(value);
      if(index > -1) {
          selected.current.splice(index, 1);
      } else {
          selected.current.push(value);
      }
    }
    onSelect(selected.current);
}
  
  return (
    <div className="select-container absolute bg-white top-10 -left-1 border-2 border-gray-400">
        <div className="w-80 flex gap-2 items-center px-2">
          <input className="cursor-pointer" id="SelectAll" checked={data.length === selected.current.length} type="checkbox" onChange={() => selectHandler('all')} />
          <label className="cursor-pointer" htmlFor="SelectAll">Select All</label>
        </div>
      {data.map((uniq, i) => {
        return (
          <div key={i} className="w-80 flex gap-2 items-center px-2">
            <input className="cursor-pointer" id={uniq + i} checked={selected.current.includes(uniq)} type="checkbox" onChange={() => selectHandler(uniq)} />
            <label className="cursor-pointer" htmlFor={uniq + i}>{uniq}</label>
          </div>
        );
      })}
    </div>
  );
}

export default SelectCheckBox;
