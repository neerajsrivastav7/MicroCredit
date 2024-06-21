// import React, { useEffect, useState } from "react";
// import CardComponent from "./CardComponent";
// import { HandleGetDetail } from "../server/ServerGet";
// import { Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// const CardDataComponent = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await HandleGetDetail();
//         setCardsData(data);
//         console.log(cardsData)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleViewClick = (name) => {
//     navigate(`/microcredit/userDetail/${name}`);
//   };

//   const handleAddMoney = (Name) => {
//     console.log(Name);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data</div>;
//   if (cardsData.length === 0) {
//     return <div>No data available</div>;
//   }
//   return (
//     <div className="container mt-5">
//       <div className="row ">
//         {cardsData.map((data, index) => (
//           <CardComponent
//             key={index}
//             Name={data.name}
//             Amount={data.totalGivenAmount}
//             paidAmount={data.totalDailyPaidAmount}
//             EndDate={data.nextPaidDate}
//             onView={() => handleViewClick(data.name)}
//             onAddName={data.name} // Correct prop for name  justify-content-center
//             onAddDailyPAmount={data.totalDailyPaidAmount}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardDataComponent;






// import React, { useEffect, useState } from "react";
// import CardComponent from "./CardComponent";
// import { HandleGetDetail } from "../server/ServerGet";
// import { Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "./Card.css"
// const CardDataComponent = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await HandleGetDetail();
//         setCardsData(data);
//         console.log(cardsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleViewClick = (name) => {
//     navigate(`/microcredit/userDetail/${name}`);
//   };

//   const handleAddMoney = (Name) => {
//     console.log(Name);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data</div>;
//   if (cardsData.length === 0) {
//     return <div>No data available</div>;
//   }
//   return (
//     <div className="container mt-5">
//       <div className="row ">
//         <div class="col-12">
//           <input
//             type="text"
//             className="form-control search-box mb-3"
//             id="searchInput"
//             placeholder="Search by name..."
//           />
//           <div class="scroll-container" id="cardContainer">
//             {cardsData.map((data, index) => (
//               <CardComponent
//                 key={index}
//                 Name={data.name}
//                 Amount={data.totalGivenAmount}
//                 paidAmount={data.totalDailyPaidAmount}
//                 EndDate={data.nextPaidDate}
//                 onView={() => handleViewClick(data.name)}
//                 onAddName={data.name} // Correct prop for name  justify-content-center
//                 onAddDailyPAmount={data.totalDailyPaidAmount}
//               />
//             ))}
//           </div>
//           <h1>Hi</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardDataComponent;



import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { HandleGetDetail } from "../server/ServerGet";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { Card } from "react-bootstrap";

const CardDataComponent = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HandleGetDetail();
        setCardsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (name) => {
    navigate(`/microcredit/userDetail/${name}`);
  };

  const handleAddMoney = (Name) => {
    console.log(Name);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCardsData = cardsData.filter((data) =>
    data.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (cardsData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <input
            type="text"
            className="form-control search-box mb-3"
            id="searchInput"
            placeholder="Search by name..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <div className="scroll-container" id="cardContainer">
            {filteredCardsData.map((data, index) => (
              <CardComponent
                key={index}
                Name={data.name}
                Amount={data.totalGivenAmount}
                paidAmount={data.totalDailyPaidAmount}
                EndDate={data.nextPaidDate}
                onView={() => handleViewClick(data.name)}
                onAddName={data.name} // Correct prop for name
                onAddDailyPAmount={data.totalDailyPaidAmount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDataComponent;

