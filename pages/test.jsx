// you should import `lodash` as a whole module
// import lodash from "lodash";
import React, { useEffect, useRef, useState } from "react";

const ITEMS_API_URL = "https://example.com/api/items";
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function Autocomplete() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const debounceRef = useRef(null);
  const consol = useRef(null);

  //   useEffect(() => {
  //     if (userInput.length === 0) {
  //       setList([]);
  //       return;
  //     }

  //     if (debounceRef.current) {
  //       clearTimeout(debounceRef.current);
  //     }
  //     debounceRef.current = setTimeout(async () => {
  //       setIsLoading(true);
  //       try {
  //         const res = await axios.get(ITEMS_API_URL, {
  //           params: { q: userInput },
  //         });
  //         consol.current.value = JSON.stringify(res);
  //         setList(res.data);
  //         setIsLoading(false);
  //       } catch (err) {
  //         setIsLoading(false);
  //       }
  //     }, DEBOUNCE_DELAY);
  //   }, [userInput]);

  const handleChange = (value) => {
    setUserInput(value);
    if (userInput.length === 0) {
      setList([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(ITEMS_API_URL, {
          params: { q: userInput },
        });
        consol.current.value = JSON.stringify(res);
        setList(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY);
  };

  const [s, SS] = useState(1);

  function handleT(){
    SS(() => 3);
  }

  useEffect(() => {
    console.log(s);
  }, [s])

  return (
    <div className="wrapper">
      <button onClick={handleT}>TTTTTT</button>
      <div className={isLoading ? "wrapper is-loading" : "control"}>
        <input
          value={userInput}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="input"
        />
      </div>
      {list.length > 0 ? (
        <div className="list is-hoverable">
          {list.map((item) => (
            <a onClick={() => window.alert(item)} className="list-item">{item}</a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
