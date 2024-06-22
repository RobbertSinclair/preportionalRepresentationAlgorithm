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
      <h1 className="display-4 text-center">Preportional Representation Calculator</h1>
      <div className="row">
        <div className="col-5">
            <div className="text-center">
              <h1 className="display-5">Input</h1>
            </div>
            
            <div className="text-center justify-center p-3">
              <label className="text-2xl font-bold pr-4">Total Seats</label>
              <input className="text-xl text-bold border-black border-2" type="number" min={1} defaultValue={650} id={totalSeatsId} />
            </div>
            <table className="table p-3 text-center">
            <tbody>
              <tr>
                <th><h3 className="table-header">Party</h3></th>
                <th className={"px-4"}><h3 className="table-header">Votes</h3></th>
                <th><h3 className="table-header">Options</h3></th>
              </tr>
              {parties.map((party, index) => 
                <PartyInput key={party.id} partyName={party.partyName} votes={party.votes} index={party.id} delete={deleteParty} />)
              }
              {addParty && <PartyInputForm submit={submitParty} theInput={{partyName: "", votes: 1}}/>}
            </tbody>
            </table>
          <div className="mx-auto text-center">
            {addParty ?<button className="btn btn-danger" onClick={cancel}>Cancel</button>  
            : <div className="p-2"><button className="btn btn-secondary p-2" onClick={clickAddNewParty}>Add New Party</button></div>}
            {!addParty && <div className="p-2"><button onClick={submitResults} className="btn btn-success p-2">Submit Results</button></div>}
          </div>
          
        </div>
        <div className="col-7">
          <div className="text-center row">
            <h1 className="display-5">Results</h1>
            {!resultsShowing && <h2 className="display-6 p-5">Submit Votes to see Results</h2>}
          </div>
          <div className="row">
            {resultsShowing && <ParliamentResult loading={loading} parliament={parliament} />}
          </div>
        </div>
      </div>
      
      
    </div>
    

    
    
  );
}
