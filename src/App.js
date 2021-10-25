import {
  doc,
  collection,
  query,
  onSnapshot,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./App.css";
import Cards from "./components/Cards";

function App() {
  const [newData, setNewData] = useState("");
  const [dataSets, setDataSets] = useState("");
  const [allDataSets, setAllDataSets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const newDataTemp = Number(newData);
    setNewData("");

    const docRef = doc(db, "datas", dataSets?.id);
    await setDoc(
      docRef,
      { data: [...dataSets?.data, newDataTemp] },
      { merge: true }
    );

    setLoading(false);
  };

  useEffect(() => {
    const q = query(collection(db, "datas"), orderBy("data"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setAllDataSets(arr);
      setDataSets(arr[0]);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDataSets({ ...allDataSets[currentIndex] });
  }, [currentIndex, allDataSets]);

  return (
    <div className="App">
      <header>
        <h1>Finsire Assignment</h1>
        <p>By Muzammil Thottathil</p>
      </header>

      <main>
        <div className="data-set-action">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1))
            }
          >
            <BsChevronLeft />
          </button>
          <p>{dataSets?.data?.join(", ")}</p>

          <button
            disabled={loading}
            onClick={() =>
              setCurrentIndex((prev) =>
                prev >= allDataSets?.length - 1 ? prev : prev + 1
              )
            }
          >
            <BsChevronRight />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            required
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
            placeholder="Enter any number here..."
          />
          <button type="submit">Add to Dataset</button>
        </form>

        {!!dataSets?.data?.length && <Cards dataSets={[...dataSets?.data]} />}
      </main>
    </div>
  );
}

export default App;
