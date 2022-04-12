import { useEffect, useMemo, useState } from "react";
import SelectCheckBox from "./components/SelectCheckBox";

function App() {
  const [data, setData] = useState([]);

  const [allFilters, setAllFilters] = useState([[], [], []]);

  const [showFilter, setShowFilter] = useState(null);

  const [filters, setFilters] = useState([[], [], []]);

  function selectHandler(values) {
    let index = showFilter - 1;
    const nextFilters = [...filters];
    nextFilters.splice(index, 1, values);
    setFilters(nextFilters);
  }

  useEffect(() => {
    fetch("/api/data.json")
      .then((res) => res.json())
      .then((data) => {
        const reviseData = [];
        const departments = [];
        const groups = [];
        const managers = [];
        data.department.forEach((department) => {
          departments.push(department.name);
          department.groups.forEach((group) => {
            groups.push(group.name);
            group.manager.forEach((manager) => {
              managers.push(manager.name);
              reviseData.push({
                department: department.name,
                group: group.name,
                manager: manager.name,
              });
            });
          });
        });
        setAllFilters([departments, groups, managers]);
        setFilters([departments, groups, managers]);   
        setData(reviseData);
      });
  }, []);

  useEffect(() => {
    function clickHandler(e) {
      if(!e.target.classList.contains('headling') && !e.target.closest('.select-container')) {
        setShowFilter(null);
      }
    }
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler)
  }, [showFilter])

  const filteredData = useMemo(() => {
    return data.filter((d, i) => {
      return filters[0].includes(d.department) && 
      filters[1].includes(d.group) &&
      filters[2].includes(d.manager) 
    })
  }, [filters, data]);

  return (
    <div className="p-7">
      <div className="flex justify-center">
        {/* <SelectCheckBox data={groups} />
        <SelectCheckBox data={managers} /> */}
      </div>

      <div className="m-auto flex flex-col justify-center">
        <div className="flex justify-center font-bold">
          {
            ['დეპარტამენტი', 'ჯგუფი', 'მენეჯერი'].map((el, i) => (
              <div key={i} className="w-80 border-2 border-gray-400 rounded-sm p-2 relative">
                <span className="headling cursor-pointer" onClick={() => {showFilter !== i + 1 ? setShowFilter(i + 1) : setShowFilter(null)}}>{el}</span>
                {showFilter === i + 1 && <SelectCheckBox data={allFilters[i]} onSelect={selectHandler}/>}
              </div>    
            ))
          }
        </div>
        {filteredData.map((row, i) => (
          <div key={i} className="flex justify-center">
            <div className="w-80 border-2 border-gray-400 rounded-sm p-2">
              {row.department}
            </div>
            <div className="w-80 border-2 border-gray-400 rounded-sm p-2">
              {row.group}
            </div>
            <div className="w-80 border-2 border-gray-400 rounded-sm p-2">
              {row.manager}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
