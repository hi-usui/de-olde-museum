import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

// const EXAMPLE_PAYLOAD = `eyJkZXRhaWxzIjp7ImZlbW1lIjpbeyJzcmMiOiIvc3RhdGljL21lZGlhL3N1bmhhdC4wMTE1MWE1MS5wbmcifSx7InNyYyI6Ii9zdGF0aWMvbWVkaWEvcmliYm9uLjE3MTM3OTFhLnBuZyIsInN0eWxlIjp7ImZpbHRlciI6Imh1ZS1yb3RhdGUoMTMyZGVnKSBzYXR1cmF0ZSgxNjAlKSBicmlnaHRuZXNzKDAuNzY5MjMwNzY5MjMwNzY5MykifX0seyJzcmMiOiIvc3RhdGljL21lZGlhL29saXZlZHJlc3MuNzRkMTllMzEucG5nIn0seyJzcmMiOiIvc3RhdGljL21lZGlhL3B1cnNlLmMwYTQ2ZDNlLnBuZyIsInN0eWxlIjp7ImZpbHRlciI6Imh1ZS1yb3RhdGUoMTA4ZGVnKSBzYXR1cmF0ZSgwJSkifX0seyJzcmMiOiIvc3RhdGljL21lZGlhL2NyZWFtc2hvZXMuZTc3ZDFlYjMucG5nIn1dLCJuZXV0cmFsIjpbeyJzcmMiOiIvc3RhdGljL21lZGlhL2Jhc2ViYWxsY2FwLjJkNWUzY2JkLnBuZyIsInN0eWxlIjp7ImZpbHRlciI6Imh1ZS1yb3RhdGUoMTI2ZGVnKSBzYXR1cmF0ZSg4MCUpIGJyaWdodG5lc3MoMS4yKSJ9fSx7InNyYyI6Ii9zdGF0aWMvbWVkaWEvZ3JheXNsaWRlcy43ODNhOTgxMC5wbmcifSx7InNyYyI6Ii9zdGF0aWMvbWVkaWEvdHNoaXJ0LmQ1YTkyM2UwLnBuZyIsInN0eWxlIjp7ImZpbHRlciI6Imh1ZS1yb3RhdGUoMTMyZGVnKSBzYXR1cmF0ZSgzMCUpIGJyaWdodG5lc3MoMC44MzMzMzMzMzMzMzMzMzM0KSJ9fSx7InNyYyI6Ii9zdGF0aWMvbWVkaWEvc3dlYXRzaGlydC4xOGMwNTAwOS5wbmciLCJzdHlsZSI6eyJmaWx0ZXIiOiJodWUtcm90YXRlKDEyNmRlZykgc2F0dXJhdGUoMjAlKSJ9fSx7InNyYyI6Ii9zdGF0aWMvbWVkaWEvaWNlbWludHBhbnRzLjk0NmVlZjFiLnBuZyJ9XX0sImFydCI6Ii9zdGF0aWMvbWVkaWEvbW9uZXQyLmMwOWJiODQ0LmpwZyJ9`;

export default () => {
  const outfit = JSON.parse(
    Buffer.from(useQuery().get("outfit"), "base64").toString()
  );
  // const outfit = JSON.parse(Buffer.from(EXAMPLE_PAYLOAD, "base64").toString());
  const { neutral, femme } = outfit.details;
  const renderFemmeClothes = () =>
    femme.map((cloth, index) => {
      if (index == 0) {
        return (
          <div key={cloth.src} className="cloth ssunhat">
            <img src={cloth.src} style={cloth.style} />
          </div>
        );
      } else if (index == 1) {
        return (
          <div key={cloth.src} className="cloth sribbon">
            <img src={cloth.src} style={cloth.style} />
            <div>Aisle {cloth.aisle}</div>
          </div>
        );
      } else {
        return (
          <div key={cloth.src} className="cloth">
            <img src={cloth.src} style={cloth.style} />
            <div>Aisle {cloth.aisle}</div>
          </div>
        );
      }
    });

  const renderNeutralClothes = () =>
    neutral.map((cloth) => (
      <div key={cloth.src} className="cloth">
        <img src={cloth.src} style={cloth.style} />
        <div>Aisle {cloth.aisle}</div>
      </div>
    ));

  return (
    <div className="Phone">
      <header>
        <div id="logo">
          <p>
            <strong>De Olde \</strong>
          </p>
          <p>
            <strong>\ Legion of Dishonor</strong>
          </p>
          <p>museum store</p>
        </div>
      </header>
      <div>
        <img src={outfit.art} height={100} />
      </div>
      <div>{renderNeutralClothes()}</div>
      <div>{renderFemmeClothes()}</div>
    </div>
  );
};
