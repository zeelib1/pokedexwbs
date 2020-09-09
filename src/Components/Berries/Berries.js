import React, { useEffect } from "react";
import Effect from "../Berries/EffectBerries"; // Effect on the View Stats Button
import Loading from "../Berries/LoadingPage"; // Gif showing up on loading page (current 5sec waiting)
import "../Styles/Berries.css";

export default function Berries() {
  const [berries, setBerries] = React.useState();

  // UseEffect to fetch all berries on page loaded, the results will update the state variable
  useEffect(() => {
    setTimeout(() => {
      const pendingPromises = [];
      for (let i = 1; i <= 64; i++) {
        pendingPromises.push(
          fetch("https://pokeapi.co/api/v2/berry/" + i)
            .then((value) => value.json())
            .then((value) => value)
            .catch((e) => e)
        );
      }
      Promise.all(pendingPromises).then((value) => {
        const pendingPromises2 = value.map((element) => {
          return fetch(element.item.url)
            .then((value) => value.json())
            .then((value) => value)
            .catch((e) => e);
        });
        Promise.all(pendingPromises2).then((value) => setBerries(value));
      });
    }, 5000); // <--- Current Loading Time Wait 5s
  }, []);

  // Search function, it will filter the results and display the match (or the close match)
  function search() {
    let i, txtValue, items;
    let input = document.getElementById("inputSearch");
    let filter = input.value.toUpperCase();
    let div = document.getElementsByClassName("cardToSearch");
    let h5 = document.getElementsByTagName("h5");
    // Loop through all list items
    for (i = 0; i < berries.length; i++) {
      items = h5[i]; // Take as reference the h5 of each card
      txtValue = items.textContent || items.innerText; // Will take reference the input from the Input Onkeyup
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = ""; // Show matches
      } else {
        div[i].style.display = "none"; // Hide no-matches
      }
    }
  }

  return (
    <div className='container'>
      {/* We hide the search bar during loading to prevent crashes in case the user immediately use the search bar */}
      {berries && berries.length ? (
        <>
          <div className='container mt-3 d-flex justify-content-center'>
            <img id='pikaHead' alt='pikachu' src='https://www.freepngimg.com/thumb/pokemon/37475-6-pikachu-transparent-image.png' width='50' height='50' />
          </div>
          <div className='container mb-5 mt-0 d-flex justify-content-center'>
            {/* Search Input for filtering elements */}
            <div>
              <img alt='compass' src='https://cdn.icon-icons.com/icons2/851/PNG/512/Direction_icon-icons.com_67565.png' width='40' className='mr-2' />
            </div>
            <input type='text' onKeyUp={search} placeholder='Search here...' className='form-control w-25' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' id='inputSearch' />
            <img id='badge' alt='badge' src='https://image.flaticon.com/icons/svg/189/189011.svg' width='40' height='40' className='ml-2' />
          </div>
        </>
      ) : null}
      {/* END of conditional operator */}

      <div className='container'>
        <div className='row row-cols-4 m-auto mb-2'>
          {/* ---> Conditional operator that will check if there are any results from the fetch*/}
          {berries && berries.length ? (
            <h1>hello</h1> &&
            berries.map((berry, index) => (
              <div key={index} className='col mb-4 cardToSearch'>
                <div className='card'>
                  <div className='card-body'>
                    <img alt='cherry' src={berry.sprites.default} alt={berry} width='50' />
                    <h5 className='card-title'>{berry.name}</h5>
                    {/* Effect component, this provide the modal effect on clicking "View Stats", for the code => "./EffectBerries"  */}
                    <Effect titlePopUp={berry.name} category={berry.category.name} cost={berry.cost} effect={berry.effect_entries[0].short_effect} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loading /> // Loading component, follow "./LoadingPage" for the code
          )}
          {/* ---> End of conditional Operator */}
        </div>
      </div>
    </div>
  );
}
