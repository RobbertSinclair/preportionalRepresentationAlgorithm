'use client'

import { useEffect, useId, useState } from "react";
import PartyInput from "@/components/partyInput";
import { VoteInput } from "@/definitions/party";
import PartyInputForm from "@/components/partyInputForm";
import { convertVoteInputIntoDict, postAPI } from "@/definitions/utils";
import ParliamentResult from "@/components/parliamentResults";

export default function Home() {
  const [parties, setParties] = useState<Array<VoteInput>>([]);
  const [addParty, setAddParty] = useState<Boolean>(false);
  const [currentPartyId, setCurrentPartyId] = useState<Number>(0);
  const [totalSeats, setTotalSeats] = useState<Number>(650);
  const [resultsShowing, setResultsShowing] = useState<Boolean>(false);
  const [parliament, setParliament] = useState<Object>({});
  const [loading, setLoading] = useState<Boolean>(false);
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
    if (resultsShowing) {
      submitResults();
    }
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
    setResultsShowing(true);
    setLoading(true);
    const totalSeatsValue = document.getElementById(totalSeatsId);
    const partyInput = convertVoteInputIntoDict(parties); 
    const inputData = {"total_seats": Number(totalSeatsValue.value), "results": partyInput};
    console.log(inputData);
    const results = await postAPI("preportional", inputData);
    setParliament(results);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="p-10 text-6xl">Preportional Representation Calculator</h1>
      <div className="flex flex-row flex-wrap">
        <div className="flex-none justify-center md:w-1/3 sm:w-full">
            <h1 className="p-5 text-4xl text-center">Input</h1>
            <div>
              <label className="text-2xl font-bold pr-4">Total Seats</label>
              <input className="text-xl text-bold border-black border-2" type="number" min={1} defaultValue={650} id={totalSeatsId} />
            </div>
            <table className="table">
            <tbody>
              <tr>
                <th><h1 className="table-header">Party</h1></th>
                <th className={"px-4"}><h1 className="table-header">Votes</h1></th>
                <th><h1 className="table-header">Options</h1></th>
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
        <div className="flex-auto justify-center px-11 md:w-2/3 sm:w-full">
          <div className="text-center">
            <h1 className="p-5 text-4xl">Results</h1>
          </div>
          {resultsShowing ? <ParliamentResult loading={loading} parliament={parliament} /> : <h2 className="p-5 text-3xl">Submit Votes to see Results</h2>}
        </div>
      </div>
      
      
    </div>
    

    
    
  );
}
