'use client'

import { useEffect, useId, useState } from "react";
import PartyInput from "@/components/partyInput";
import { VoteInput } from "@/definitions/party";
import PartyInputForm from "@/components/partyInputForm";
import { convertVoteInputIntoDict, postAPI } from "@/definitions/utils";

export default function Home() {
  const [parties, setParties] = useState<Array<VoteInput>>([]);
  const [addParty, setAddParty] = useState<Boolean>(false);
  const [currentPartyId, setCurrentPartyId] = useState<Number>(0);
  const [totalSeats, setTotalSeats] = useState<Number>(650);
  const totalSeatsId = useId();

  const cancel = () => {
    setAddParty(false);
  };

  const clickAddNewParty = () => {
    setAddParty(true);
  };

  const deleteParty = (key: Number) => {
    console.log(`Delete party called at ${key}`);
    let newParties: Array<VoteInput> = parties.filter(party => party.id !== key)
    console.log("Parties After:")
    console.log(newParties);
    setParties(newParties);
  };

  const submitParty = (party: String, voteShare: Number) => {
    const newParty: VoteInput = {id: currentPartyId, partyName: party, votes: voteShare};
    let newParties: Array<VoteInput> = parties;
    newParties.push(newParty);
    setParties(newParties);
    setAddParty(false);
    setCurrentPartyId(currentPartyId + 1);
  };

  const submitResults = async () => {
    const totalSeatsValue = document.getElementById(totalSeatsId);
    const partyInput = convertVoteInputIntoDict(parties); 
    const inputData = {"total_seats": Number(totalSeatsValue.value), "results": partyInput};
    console.log(inputData);
    const results = await postAPI("preportional", inputData);
    console.log(results);
  }

  return (
    <div>
      <h1 className="p-10 text-6xl">Preportional Representation Calculator</h1>
      <div className="flex flex-row flex-wrap">
        <div className="flex-none justify-center">
            <h1 className="p-5 text-4xl text-center">Input</h1>
            <div>
              <label className="text-2xl font-bold pr-4">Total Seats</label>
              <input className="text-xl text-bold border-black border-2" type="number" min={1} defaultValue={650} id={totalSeatsId} />
            </div>
            <table className="py-4 px-10 table-auto border-collapse border-spacing-7">
            <tbody>
              <tr>
                <th><h1 className="text-3xl">Party</h1></th>
                <th className={"px-4"}><h1 className="text-3xl">Votes</h1></th>
                <th><h1 className="text-3xl">Options</h1></th>
              </tr>
              {parties.map((party, index) => 
                <PartyInput key={party.id} partyName={party.partyName} votes={party.votes} index={party.id} delete={deleteParty} />)
              }
              {addParty && <PartyInputForm submit={submitParty} theInput={{partyName: "", votes: 1}}/>}
            </tbody>
          </table>
          <div className="justify-center text-center">
            {addParty ?<button className="btn btn-red" onClick={cancel}>Cancel</button>  
            : <button className="btn btn-blue" onClick={clickAddNewParty}>Add New Party</button>}
            {!addParty && <button onClick={submitResults} className="btn btn-blue">Submit Results</button>}
          </div>
          
        </div>
        <div className="flex-auto justify-center text-center">
          <h1 className="p-5 text-4xl">Results</h1>
        </div>
      </div>
      
      
    </div>
    

    
    
  );
}
