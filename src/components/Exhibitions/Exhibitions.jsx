import "./Exihibitions.css";
import { useMemo, useRef } from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";
import { useState } from "react";
import useExhibitions from "../../hooks/useExhibitions";

function Exhibitions() {
  const { exhibitions } = useExhibitions();
  const [query] = useState("");
  const filteredExhibitions = useMemo(
    () =>
      exhibitions?.filter((exhibition) =>
        exhibition.name.toLowerCase().includes(query.toLowerCase())
      ),
    [exhibitions, query]
  );
  const [observing, setObserving] = useState(true);
  const myRef = useRef();

  return (
    <>
      <div className="exhibitions-outer-container">
        <div className="exhibitions-container" id="exhibitions-container">
          {filteredExhibitions?.map((exhibition, index) => {
            return (
              <>
                <ExhibitionCard
                  exhibition={exhibition}
                  key={index}
                  observing={observing}
                  mref={myRef}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Exhibitions;
